const router = require('koa-router')()

router.prefix('/user')
router.use('/', async (ctx, next) => {
    // 过滤未登录用户
  if (!ctx.session.user) {
    ctx.response.status = 422
    return
  }
  await next()
})
router.get('/info', function (ctx, next) {
  console.log(ctx.session.user)
  ctx.body = ctx.session.user
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
