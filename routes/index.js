const Router = require('koa-router')
let router = new Router()

router.get('/', async (ctx, next) => {
  ctx.append('X-Powered-By', 'koa')
  ctx.body = '<!DOCTYPE html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1,user-scalable=no"><title>spa</title><link href=http://blogstatic-1252075019.file.myqcloud.com/static/css/app.3626b73eb49d2daa6244c64433fd6206.css rel=stylesheet></head><body><div id=app></div><script type=text/javascript src=http://blogstatic-1252075019.file.myqcloud.com/static/js/manifest.6a8f15ae7d0747525b1e.js></script><script type=text/javascript src=http://blogstatic-1252075019.file.myqcloud.com/static/js/vendor.a6c943fb5a0ece0e16c8.js></script><script type=text/javascript src=http://blogstatic-1252075019.file.myqcloud.com/static/js/app.80fb5f1b6f1c27715ba5.js></script></body></html>'
})

module.exports = router
