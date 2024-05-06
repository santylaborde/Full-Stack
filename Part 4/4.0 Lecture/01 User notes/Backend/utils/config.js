require('dotenv').config()

const PORT = process.env.PORT

// custom query depending on environment
const MONGODB_URI = process.env.NODE_ENV === 'test'  // 'development'?
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = { MONGODB_URI, PORT }