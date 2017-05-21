/**
 * Created by feng on 17-5-15.
 */
let User = require('../models/user')
let Code = require('../models/code')

const router = require('koa-router')()

router.prefix('/register')
/**
 * 这个函数一看就知道是注册逻辑
 * 本函数错误基本上是由非法输入造成的故返回值为200 OK 或者 422 Unprocessable Entity
 */
router.post('/', async function (ctx, next) {
  ctx.response.status = 200
    // a.查找注册码
    // 注册码没有使用used就是false 使用了used就是true
  let _code = await Code.findOne({
    'code': ctx.request.body.code,
    'used': false
  }).select('code').exec()
    // 处理错误:没找到肯定是null对吧
  if (!_code) {
    ctx.response.status = 422
    ctx.body = ['code', '注册码错误', 'auth']
    return
  }
    // b.注册
    // 处理错误:防止黑客通过非法手段可以提交短密码或者空密码
  if (!ctx.request.body.password || ctx.request.body.password.length < 6) {
    ctx.body = ['password', '小伙子你不老实哦，小动作', 'auth']
    ctx.response.status = 422
    return
  }
  try {
    await new User({
      name: ctx.request.body.name, // 名字长度由mongoose验证了
      password: User.passwordCrypto(ctx.request.body.password)// 密码的长度进过hamc加密之后长度固定为40
    }).save()
  } catch (e) {
        // 处理错误:前端已经进行了数据验证,这里出错肯定是测试环境或者黑客攻击
        // ,也就不需要返回完美的报错信息
    ctx.body = ['name', `小伙子你不老实哦，小动作${e.message}`, 'auth']
    ctx.response.status = 422
    return
  }
    // c.设置已使用的标记
  _code.used = true
  await _code.save()
})

module.exports = router
