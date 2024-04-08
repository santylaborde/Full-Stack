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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(express.static('dist'))

const cors = require('cors')
app.use(cors())

// json-parser
app.use(express.json())
// request info
app.use(requestLogger)

/*** API ***/
// Hello world
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// get all
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// get singular
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) { response.json(note) } 
      else {  response.status(404).end() }
    })
    .catch(error => next(error))
})

// delete
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

// create
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
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

// update
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  // a regular JavaScript object
  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
// handler of requests with result to errors
app.use(errorHandler)

/*** MAIN ***/
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})