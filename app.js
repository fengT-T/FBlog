const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const errorHandle = require('./bin/errorHandle')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const session = require('koa-session')
const mongoose = require('mongoose')
const glob = require('glob')
const path = require('path')
const conf = require('./config/app')
const favicon = require('koa-favicon')
const http = require('http')
const server = http.createServer(app.callback())

app.use(favicon(path.join(__dirname, 'favicon.ico')))
// my error handle
app.use(errorHandle)
// middlewares
app.use(koaBody())
app.use(session(conf.session, app))
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
/**
 * 机智的采用了glob引入模型文件
 * @type {{}}
 */
let models = {}
glob.sync('./models/*.js').forEach(function (file) {
  models[path.basename(file, '.js')] = require(file)
})
app.use(async (ctx, next) => {
  ctx.model = models
  await next()
})
// mongoose promise替换
mongoose.Promise = global.Promise
// 打开连接
mongoose.connect(conf.mongodb.connUrl, {
  useMongoClient: true
})
/***
 * 最后永远是routes
 * 机智的采用了glob引入路由文件
 */
glob.sync('./routes/*.js').forEach(function (file) {
  let route = require(file)
  app.use(route.routes(), route.allowedMethods())
})
global.ERROR = {}
global.ERROR.INPUTERROR = 'Suprise!MotherFucker!'
global.ERROR.DEFAULTINPUTERROR = [422, global.ERROR.INPUTERROR]
module.exports = app

process.env.NODE_ENV === 'production' ? server.listen(80) : server.listen(3000)
