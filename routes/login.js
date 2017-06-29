/**
 * Created by feng on 17-5-9.
 */
const router = require('koa-router')()

router.prefix('/login')
/**
 * 一看就知道是登录
 */
router.post('/', async function (ctx, next) {
  // a 用户查询  处理错误:防止黑客通过非法手段可以提交空密码,非字符串密码,名字长度由mongoose验证
  ctx.assert(ctx.model.User.passwordCheck(ctx.request.body.password), ...global.ERROR.DEFAULTINPUTERROR)
  let _user = await ctx.model.User.findUsersByName(ctx.request.body.name, 'name headImgUrl desc password')
  ctx.assert(_user.length === 1, ...global.ERROR.DEFAULTINPUTERROR, {responseData: ['name', '用户名错误', 'auth']})
  ctx.assert(_user[0].password === ctx.model.User.passwordCrypto(ctx.request.body.password)
    , ...global.ERROR.DEFAULTINPUTERROR, {responseData: ['password', '密码错误', 'auth']})
  // b 小手一抖 session
  _user = _user[0]
  _user.password = undefined// 删掉密码，session保存密码干嘛呢
  ctx.session.user = _user
  // 返回用户信息给前端
  ctx.body = _user
})

module.exports = router
