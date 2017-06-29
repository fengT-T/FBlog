/**
 * Created by feng on 17-5-15.
 */
const router = require('koa-router')()

router.prefix('/register')

/**
 * 这个函数一看就知道是注册逻辑
 */

router.post('/', async function (ctx, next) {
  // a.查找注册码    注册码没有使用used就是false 使用了used就是true
  let _code = await ctx.model.Code.findOne({
    'code': ctx.request.body.code,
    'used': false
  }).select('code').exec()
  ctx.assert(_code, ...global.ERROR.DEFAULTINPUTERROR, { responseData: ['code', '注册码错误', 'auth'] }) // 处理错误:没找到肯定是null对吧
  // b.注册 处理错误:防止黑客通过非法手段可以提交短密码<6或者空密码
  ctx.assert(ctx.model.User.passwordCheck(ctx.request.body.password), ...global.ERROR.DEFAULTINPUTERROR)
  ctx.assert((await ctx.model.User.findUsersByName(ctx.request.body.name)).length === 0
    , ...global.ERROR.DEFAULTINPUTERROR, { responseData: ['name', '名字已经被注册了', 'auth'] })// 查找名字是否被注册
  try {
    await new ctx.model.User({
      name: ctx.request.body.name, // 名字长度由mongoose验证了
      password: ctx.model.User.passwordCrypto(ctx.request.body.password)// 密码的长度进过hamc加密之后长度固定为40
    }).save()
  } catch (e) {
    ctx.throw(...global.ERROR.DEFAULTINPUTERROR)
  }
  _code.used = true // c.设置注册码已使用的标记used
  await _code.save()
  ctx.status = 200
})

module.exports = router
