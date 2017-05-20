/**
 * Created by feng on 17-5-15.
 */
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let connection = mongoose.createConnection('mongodb://localhost:27017/blog')

module.exports = connection
