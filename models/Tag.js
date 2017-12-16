const mongoose = require('mongoose')
let Schema = mongoose.Schema

let tagSchema = new Schema({
  tag: [{
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }]
})

let Article = mongoose.model('tags', tagSchema)
module.exports = Article
