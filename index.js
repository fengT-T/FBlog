const Koa = require('koa')
const app = new Koa()
const logger = require('koa-logger')
const favicon = require('koa-favicon')
const compress = require('koa-compress')
const glob = require('glob')
const path = require('path')
const mongoose = require('mongoose')
const conf = require('./conf')

app.use(logger())
app.use(compress({
  threshold: 1024,
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(favicon(path.join(__dirname, '/favicon.ico')))

/**
 * mongoose
**/
let models = {}
glob.sync('./models/*.js').forEach(function (file) {
  models[path.basename(file, '.js')] = require(file)
})
app.use(async (ctx, next) => {
  ctx.model = models
  await next()
})
mongoose.Promise = global.Promise
mongoose.connect(conf.mongodb.connUrl, {
  useMongoClient: true
})
/**
 * routes
**/

glob.sync('./routes/*.js').forEach(function (file) {
  let route = require(file)
  app.use(route.routes(), route.allowedMethods())
})

/**
 * Koa GOGOGO
**/
/* global isProduction:true */
isProduction = process.env.NODE_ENV === 'production'

app.listen(!isProduction ? 3000 : 80)
