const config = require('../utils/config')
const logger = require('../utils/logger')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

// connect to db
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
.then(result => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connecting to MongoDB:', error.message)
})

// schema define
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// schema transform
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)