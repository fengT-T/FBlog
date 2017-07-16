const router = require('koa-router')()
const conf = require('../config/app')
const qiniu = require('qiniu')

router.prefix('/user')

/**
 * 过滤未登录用户
 */
router.use('/', async (ctx, next) => {
  ctx.assert(ctx.session.user, ...global.ERROR.DEFAULTINPUTERROR)
  await next()
})
/**
 * 信息更新，值得一提的是所有数据验证基本在前端做好了，后台并不需要返回错误信息
 */
router.post('/modify', async function (ctx, next) {
  if (ctx.request.body.password !== undefined) { // 值得一提的是，输入数据如果为空默认为空字符串“”,手动数据验证永远是一件痛苦的事情
    ctx.assert(ctx.model.User.passwordCheck(ctx.request.body.password), ...global.ERROR.DEFAULTINPUTERROR)
    ctx.request.body.password = ctx.model.User.passwordCrypto(ctx.request.body.password)// 创建新密码
  }
  if (ctx.request.body.name) {
    ctx.assert((await ctx.model.User.findUsersByName(ctx.request.body.name)).length === 0
      , ...global.ERROR.DEFAULTINPUTERROR, { responseData: ['name', '名字已经被注册了', 'auth'] })// 查找名字是否被注册
  }
  try {
    let _user = await ctx.model.User.findOneAndUpdate({
      _id: ctx.session.user._id
    }, { $set: ctx.request.body }
      , {
        new: true, // 很坑的一个东西，返回新的，不然默认返回旧的
        context: 'name headImgUrl desc password', // 限制死能更新的field
        select: 'name headImgUrl desc', // 限制死返回的field
        runValidators: true// 一定要验证不然完全gg
      }).exec()
    ctx.body = _user
    ctx.session.user = _user
  } catch (e) {
    console.log(e) // 正规的输入是不会报错的
    ctx.throw(...global.ERROR.DEFAULTINPUTERROR)
  }
})

router.get('/logout', function (ctx, next) {
  ctx.session = null
  ctx.status = 200
})
/**
 * 7niu token
 */
router.get('/uploadToken', function (ctx, next) {
  qiniu.conf.ACCESS_KEY = conf.qiniu.ACCESS_KEY
  qiniu.conf.SECRET_KEY = conf.qiniu.SECRET_KEY
  ctx.body = {
    bucketUrl: conf.qiniu.bucketUrl,
    token: new qiniu.rs.PutPolicy('blogpic').token(),
    uploadUrl: conf.qiniu.uploadUrl
  }
})

router.post('/createArticle', async function (ctx, next) {
  ctx.request.body.author = { _id: ctx.session.user._id }
  let article
  try {
    article = await new ctx.model.Article(ctx.request.body).save()
  } catch (e) {
    ctx.throw(...global.ERROR.DEFAULTINPUTERROR)
  }
  ctx.body = article
})

router.post('/modifyArticle', async function (ctx, next) {
  let { Article } = ctx.model
  let body = ctx.request.body
  ctx.assert(body.author === ctx.session.user._id, ...global.ERROR.DEFAULTINPUTERROR)
  try {
    await Article.findOneAndUpdate(body._id, body).exec()
  } catch (e) {
    ctx.throw(...global.ERROR.DEFAULTINPUTERROR)
  }
  ctx.status = 200
})

router.get('/deleteArticle', async function (ctx, next) {
  let { Article } = ctx.model
  let { id } = ctx.request.query
  let { user } = ctx.session
  let article = await Article.findById(id).exec()
  ctx.assert(user._id === article.author.toString(), ...global.ERROR.DEFAULTINPUTERROR)
  await Article.deleteOne({ _id: article.id }).exec()
  ctx.status = 200
})

router.get('/info', async function (ctx, next) {
  ctx.body = ctx.session.user
})
module.exports = router
