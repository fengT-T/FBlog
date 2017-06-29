const router = require('koa-router')()
const USERFIELD = 'name headImgUrl desc'


router.prefix('/userOpen')

router.get("/info", async function (ctx, next) {
  let _user = await ctx.model.User.findById(ctx.request.query.id)
    .select(USERFIELD)
    .exec()
  ctx.body = _user
})

module.exports = router
