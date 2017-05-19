/**
 * Created by feng on 17-5-9.
 */
const User = require("../models/user")
const router = require('koa-router')()

router.prefix('/login')
/**
 * 一看就知道是登录
 */
router.post('/', async function (ctx, next) {
    ctx.response.status = 200
    //a 用户查询
    //处理错误:防止黑客通过非法手段可以提交空密码,
    // 本来就是是空的也不能登录成功，但是考虑到undefined会报错啊，这怎么能忍,故不考虑返回任何值
    if (!ctx.request.body.password) {
        ctx.response.status = 422
        return
    }
    //查用户水表
    let _user = await User.findOne({
        'name': ctx.request.body.name,//名字长度由mongoose验证了
        'password': User.passwordCrypto(ctx.request.body.password),
    })
        .select('name headImgUrl')
        .exec()
    //_user === null 返回错误
    if (!_user) {
        ctx.response.status = 422
        ctx.body = [
            "password", "用户名或者密码错误", "auth"
        ]
        return
    }
    //b 小手一抖 session
    ctx.session.user = _user
    //返回用户信息给前端
    ctx.body = _user
})

module.exports = router