/**
 * Created by feng on 17-5-22.
 */

const router = require('koa-router')()

router.prefix('/article')

router.get('/info', async (ctx, next) => {
  try {
    ctx.body = await ctx.model.Article.findById(ctx.request.query.articleId)
      .populate([
        {path: 'author', select: 'name headImgUrl desc'}
      ])
      .exec()
  } catch (e) {
    //let it crash
    ctx.throw(422, 'Suprise!MotherFucker!')
  }
})

router.get('/list', async (ctx, next) => {
  let operation = {}
  if (ctx.request.query.operate === "next" && ctx.request.query.startId) {
    //处理下一页 下一页必须要有 statID
    operation._id = {
      $lt: ctx.request.query.startId
    }
  } else if (ctx.request.query.operate === "first") {
    //处理初始页面 初始页面的话 statId从数据库给一个初始值
    operation._id = {
      $lte: await ctx.model.Article.getStartId()//第一次获取list，需要初始的id
    }
  } else {
    ctx.throw(422, 'Suprise!MotherFucker!')
  }
  if (ctx.request.query.tag) {//顺便查个tag也是极好的
    operation.tag = ctx.request.query.tag
  }
  try {
    ctx.body = await ctx.model.Article.find(operation)
      .limit(10)
      .sort({'_id': -1})
      .populate([
        {path: 'author', select: 'name headImgUrl desc'}
      ])
      .select('title summary author tag')
      .exec()
  } catch (e) {
    //let it crash
    ctx.throw(422, 'Suprise!MotherFucker!')
  }
})
module.exports = router
