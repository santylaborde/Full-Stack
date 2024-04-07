require('dotenv').config() // environment variables
const express = require('express')
const app = express()

const Note = require('./models/note') // mongo db

let notes = []

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

  // not empty
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  // new note
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

/*** MAIN ***/
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})