/**
 * Created by feng on 17-5-15.
 */
const router = require('koa-router')()

router.prefix('/register')

/**
 * 这个函数一看就知道是注册逻辑
 */

router.post('/', async function (ctx, next) {
  ctx.response.status = 200
  // a.查找注册码    注册码没有使用used就是false 使用了used就是true
  let _code = await ctx.model.Code.findOne({
    'code': ctx.request.body.code,
    'used': false
  }).select('code').exec()
  // 处理错误:没找到肯定是null对吧
  ctx.assert(_code, 422, "Suprise!MotherFucker!", {
    responseData: ['code', '注册码错误', 'auth']
  })
  // b.注册 处理错误:防止黑客通过非法手段可以提交短密码<6或者空密码
  if (!ctx.request.body.password || ctx.request.body.password.length < 6) {
    ctx.throw(422, 'Suprise!MotherFucker!')
  }
  try {
    await new ctx.model.User({
      name: ctx.request.body.name, // 名字长度由mongoose验证了
      password: ctx.model.User.passwordCrypto(ctx.request.body.password)// 密码的长度进过hamc加密之后长度固定为40
    }).save()
  } catch (e) {
    ctx.throw(422, 'Suprise!MotherFucker!')
  }
  _code.used = true // c.设置注册码已使用的标记used
  await _code.save()
})

module.exports = router
