const Router = require('koa-router')
let router = new Router()

router.prefix('/article')

router.get('/', async (ctx, next) => {
  let {offset = '', limit = 10, tag = ''} = ctx.query
  let {Article} = ctx.model
  let operation = {}
  operation._id = offset ? {
    '$lt': ctx.request.query.offset
  } : {
    '$lte': await Article.getFirstId()
  }
  if (tag) {
    operation.tag = tag
  }
  ctx.body = await Article.find(operation)
  .limit(+limit) // just fuck javascript
  .sort({ '_id': -1 })
  .select('tag title summary')
  .exec()
})

router.get('/:id', async (ctx, next) => {
  let {id} = ctx.params
  let {Article} = ctx.model
  ctx.body = await Article.findById(id).exec()
})

module.exports = router
