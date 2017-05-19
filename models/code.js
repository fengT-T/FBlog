/**
 * Created by feng on 17-5-15.
 */
const mongoose = require('mongoose')
const connection = require("../config/mongodb")
let Schema = mongoose.Schema

let codeSchema = new Schema({
    code: {
        type:String,
        index: true,
        unique: true
    },
    desc:String,
    used:false,    //注册码没有使用used就是false 使用了used就是true
})
let Code = connection.model('codes', codeSchema)
module.exports = Code