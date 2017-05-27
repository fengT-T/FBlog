/**
 * Created by feng on 17-5-23.
 */
const mongoose = require('mongoose')
let Schema = mongoose.Schema

let articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tag: [{
    type: String,
    required: true
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
})
articleSchema.statics.getStartId = async function () {
  let id = (await this.findOne().sort({_id: -1}).exec())._id
  return id
}
let Article = mongoose.model('articles', articleSchema)
module.exports = Article
