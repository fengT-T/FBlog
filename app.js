const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const session = require('koa-session')
const glob = require('glob');
const path = require('path');
const conf = require("./config/app");
// app.keys = [require("./config/app").appKey];

// error handler
onerror(app);

// middlewares
app.use(koaBody());
app.use(session(conf.session, app));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
//机智的采用了glob引入路由文件
glob.sync('./routes/*.js').forEach(function (file) {
    let route = require(path.resolve(file))
    app.use(route.routes(), route.allowedMethods());
});

module.exports = app;
