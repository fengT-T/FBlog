const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.status = 200
  ctx.body = '<!DOCTYPE html><html><head><meta charset=utf-8><title>spa</title><link href=http://blogstatic-1252075019.cosgz.myqcloud.com/static/css/app.cbaccca7f46c1cc9610fd6f292689e19.css rel=stylesheet></head><body><div id=app></div><script type=text/javascript src=http://blogstatic-1252075019.cosgz.myqcloud.com/static/js/manifest.a5b769b61ab5b3974b5a.js></script><script type=text/javascript src=http://blogstatic-1252075019.cosgz.myqcloud.com/static/js/vendor.69e2bfac3795306aae34.js></script><script type=text/javascript src=http://blogstatic-1252075019.cosgz.myqcloud.com/static/js/app.e830802456f6d052d291.js></script></body></html>'
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
