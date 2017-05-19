/**
 * Created by feng on 17-5-15.
 */
let config = {
    appKey: "4ede969db795252f0b5f1bb00b0594b4210f1223",//可以用require("crypto").randomBytes(20).toString('hex');生成
    session: {
        key: 'ohMyKoa', /** (string) cookie key (default is koa:sess) */
        maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: false, /** (boolean) signed or not (default true) *///加密个锤子session存redis
        store: require("../bin/sessionStore")
    }
}
module.exports = config