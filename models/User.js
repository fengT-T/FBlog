/**
 * Created by feng on 17-5-13.
 */
const mongoose = require('mongoose')
const cryptoTools = require('../bin/crypto')
let Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true
  },
  password: {
    type: String,
        // 密码的长度进过hamc加密之后长度固定为40
    required: true
  },
  desc: {
    type: String,
    default:"装逼如风常伴吾身",
    required: true
  },
  headImgUrl: {
    type: String,
    default: 'http://oahmwbdom.bkt.clouddn.com/feng201609031802477489.jpg'
  },
  registerDate: {type: Date, default: Date.now}
})
userSchema.statics.passwordCrypto = (password) => {
  return cryptoTools.passwordCrypto(password)
}
let User = mongoose.model('users', userSchema)
module.exports = User
