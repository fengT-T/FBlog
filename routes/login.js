/**
 * Created by feng on 17-5-9.
 */
const router = require('koa-router')()

router.prefix('/login')
/**
 * 一看就知道是登录
 */
router.post('/', async function (ctx, next) {
  // a 用户查询  处理错误:防止黑客通过非法手段可以提交空密码,名字长度由mongoose验证
  ctx.assert(ctx.request.body.password, 422, 'Suprise!MotherFucker!')
  let _user = await ctx.model.User.findOne({
    'name': ctx.request.body.name, // 名字长度由mongoose验证
    'password': ctx.model.User.passwordCrypto(ctx.request.body.password)
  })
    .select('name headImgUrl')
    .exec()
  // _user === null 返回错误
  ctx.assert(_user,422, "Suprise!MotherFucker!", {
    responseData: [
      'password', '用户名或者密码错误', 'auth'
    ]
  })
  // b 小手一抖 session
  ctx.session.user = _user
  // 返回用户信息给前端
  ctx.body = _user
})

module.exports = router
