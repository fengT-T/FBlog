const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.status = 200
  ctx.body = '<!DOCTYPE html><html><head><meta charset=utf-8><title>spa</title><link href=http://blogstatic-1252075019.cosgz.myqcloud.com/static/css/app.ef357ac208697154592e1103681b8014.css rel=stylesheet></head><body><div id=app></div><script type=text/javascript src=http://blogstatic-1252075019.cosgz.myqcloud.com/static/js/manifest.f94b3c40fb68184f629f.js></script><script type=text/javascript src=http://blogstatic-1252075019.cosgz.myqcloud.com/static/js/vendor.c0c7ae9fbd8bc2f687c2.js></script><script type=text/javascript src=http://blogstatic-1252075019.cosgz.myqcloud.com/static/js/app.8a784e92e0c0cd0d47f5.js></script></body></html>'
})

module.exports = router
