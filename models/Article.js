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
  }]
})
articleSchema.statics.getFirstId = async function () {
  let id = (await this.findOne().sort({_id: -1}).exec())._id
  return id
}
let Article = mongoose.model('articles', articleSchema)
module.exports = Article
