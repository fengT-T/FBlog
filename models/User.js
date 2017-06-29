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
    required: true,
    index: true,
    unique: true// name是唯一的
  },
  password: {
    type: String, // 妈的fuck时刻注意密码长度 密码的长度进过hamc加密之后长度固定为40
    required: true
  },
  desc: {
    type: String,
    default: '不可描述',
    maxlength: 100,
    required: true
  },
  headImgUrl: {
    type: String,
    default: 'http://oahmwbdom.bkt.clouddn.com/feng201609031802477489.jpg'
  },
  registerDate: {type: Date, default: Date.now}
})
/**
 * 获取用户信息（也可以用来检测用户是否注册）
 * @param name
 * @param selectField
 * @returns {Promise.<*>}
 */
userSchema.statics.findUsersByName = async function (name, selectField = 'name headImgUrl desc') {
  let users = await this.find({
    'name': name
  }).select(selectField)
    .exec()
  return users
}
userSchema.statics.passwordCrypto = (password) => {
  return cryptoTools.passwordCrypto(password)
}
userSchema.statics.passwordCheck = (password) => {
  return typeof password === 'string' && password.length >= 6
}
let User = mongoose.model('users', userSchema)

module.exports = User
