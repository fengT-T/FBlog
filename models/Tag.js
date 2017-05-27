/**
 * Created by feng on 17-5-23.
 */
const mongoose = require('mongoose')
let Schema = mongoose.Schema

let tagSchema = new Schema({
  name: {
    type: String,
    index: true,
    unique: true
  }
})
let Tag = mongoose.model('tags', tagSchema)
module.exports = Tag
