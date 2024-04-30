const mongoose = require('mongoose')
require('dotenv').config() // environment variables

const dbUrl = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(dbUrl)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
const title= process.argv[2]
const author= process.argv[3]
const url= process.argv[4]
const likes= process.argv[5]

if(process.argv[3]) // CREATE
{
  logger.info('Creating blog entry')

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
  })

  // Create new person
  blog.save().then(() => {
    logger.info(`added ${title} to bloglist`)
    mongoose.connection.close()
  })
}
else // GET
{
  logger.info('Bloglist:')
  // get blogs
  Blog.find({}).then(result => {
    result.forEach(blog => {
      logger.info(`${blog.title} - ${blog.author}`)
    })
    mongoose.connection.close()
  })
}