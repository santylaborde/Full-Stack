const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length<3) {
  console.log('give environment as argument')
  process.exit(1)
}

const environment = process.argv[2]

// custom query depending on environment
const MONGODB_URI = environment === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

console.log(`Environment: ${environment}`)
console.log(`Uri: ${MONGODB_URI}`)

mongoose.set('strictQuery',false)
mongoose.connect(MONGODB_URI)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is really Easy',
  important: true,
})

// Create new note
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

// get notes
// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })