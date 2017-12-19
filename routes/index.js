const Router = require('koa-router')
let router = new Router()

router.get('/', async (ctx, next) => {
  ctx.append('X-Powered-By', 'koa')
  ctx.body = '<!DOCTYPE html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1,user-scalable=no"><title>spa</title><link href=http://blogstatic-1252075019.file.myqcloud.com/static/css/app.4aee29263ef39e2832af44db403acbbc.css rel=stylesheet></head><body><div id=app></div><script type=text/javascript src=http://blogstatic-1252075019.file.myqcloud.com/static/js/manifest.9801caf4d0fab421b62f.js></script><script type=text/javascript src=http://blogstatic-1252075019.file.myqcloud.com/static/js/vendor.a6c943fb5a0ece0e16c8.js></script><script type=text/javascript src=http://blogstatic-1252075019.file.myqcloud.com/static/js/app.2114cbc0900879f74cd0.js></script></body></html>'
})

module.exports = router
