/**
 * Created by feng on 17-5-15.
 */
const mongoose = require('mongoose')
let Schema = mongoose.Schema

let codeSchema = new Schema({
  code: {
    type: String,
    index: true,
    unique: true
  },
  desc: String,
  used: false    // 注册码没有使用used就是false 使用了used就是true
})
let Code = mongoose.model('codes', codeSchema)
module.exports = Code
