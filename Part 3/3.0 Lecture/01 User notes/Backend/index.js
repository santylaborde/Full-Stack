const express = require('express')
const app = express()

let notes = []

/*** MONGO DB ***/
const mongoose = require('mongoose')

const password = process.argv[2]
const appDB = "noteApp"
const url =
  `mongodb+srv://slaborde:${password}@fullstackopen.1mv6ak9.mongodb.net/${appDB}?retryWrites=true&w=majority&appName=FullStackOpen`

mongoose.set('strictQuery',false)
mongoose.connect(url)

// Schema define
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// Schema transform
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)


/*** MIDDLEWARES ***/
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))

const cors = require('cors')
app.use(cors())

// json-parser
app.use(express.json())
// request info
app.use(requestLogger)

/*** FUNCTIONS ***/
// id generator
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

/*** API ***/
// get all
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// get singular
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
})

// delete
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})

// create
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

/*** MAIN ***/
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})