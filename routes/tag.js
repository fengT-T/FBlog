const Router = require('koa-router')
let router = new Router()

router.prefix('/tag')
router.get('/', async (ctx, next) => {
  let {Tag} = ctx.model
  ctx.body = await Tag.findOne()
})

module.exports = router
