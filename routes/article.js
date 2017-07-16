/**
 * Created by feng on 17-5-22.
 */

const router = require('koa-router')()
const ARTICELSUMMARYFIELD = 'title summary author tag'
const USERFIELD = 'name headImgUrl desc'

router.prefix('/article')

router.get('/info', async (ctx, next) => {
  try {
    ctx.body = await ctx.model.Article.findById(ctx.request.query.articleId)
      .populate([
        { path: 'author', select: USERFIELD }
      ])
      .exec()
  } catch (e) {                                       // let it crash
    ctx.throw(...global.ERROR.DEFAULTINPUTERROR)
  }
})

router.get('/list', async (ctx, next) => {
  let operation = {}
  if (ctx.request.query.operate === 'next' && ctx.request.query.startId) {
    operation._id = {                                  // 处理下一页 下一页必须要有 statID
      $lt: ctx.request.query.startId
    }
  } else if (ctx.request.query.operate === 'first') {  // 处理初始页面 初始页面的话 statId从数据库给一个初始值
    operation._id = {
      $lte: await ctx.model.Article.getStartId()       // 第一次获取list，需要初始的id
    }
  } else {
    ctx.throw(...global.ERROR.DEFAULTINPUTERROR)
  }
  if (ctx.request.query.tag) {                         // 顺便查个tag也是极好的
    operation.tag = ctx.request.query.tag
  }
  try {
    ctx.body = await ctx.model.Article.find(operation)
      .limit(10)
      .sort({ '_id': -1 })
      .populate([
        { path: 'author', select: USERFIELD }
      ])
      .select(ARTICELSUMMARYFIELD)
      .exec()
  } catch (e) {
    ctx.throw(...global.ERROR.DEFAULTINPUTERROR)
  }
})

router.get('/userArticleList', async function (ctx, next) {
  let list = await ctx.model.Article.find({
    author: ctx.request.query.userId
  }).limit(5)
    .skip(+ctx.request.query.offset || 0)               // 无奈啊，好像get方法传过来的参数只能是字符串，+转成number
    .exec()
  ctx.body = list
})

module.exports = router
