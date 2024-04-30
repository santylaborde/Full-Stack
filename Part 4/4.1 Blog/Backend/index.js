const config = require('./utils/config')
const logger = require('./utils/logger')

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const blogsRouter = require('./controllers/blogs')

app.use('/api/blogs', blogsRouter)

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})