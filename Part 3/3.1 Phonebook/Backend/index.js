require('dotenv').config() // environment variables
const express = require('express')
const app = express()

const Person = require('./models/person') // mongo db

let persons= []

/*** MIDDLEWARE ***/
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }


  next(error)
}

// json-parser
app.use(express.json())
// morgan
var morgan = require('morgan')
// app.use(morgan('tiny')) // tiny morgan
morgan.token('body', (req, res) => JSON.stringify(req.body)); // custom morgan
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body'))
// same origin policy 
const cors = require('cors')
app.use(cors())
// prod frontend
app.use(express.static('dist'))

/*** API ***/
// get all
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// get singular
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(note => {
    if (note) { response.json(note) } 
    else {  response.status(404).end() }
  })
  .catch(error => next(error))
})

// get info
app.get('/api/info', (request, response) => {
  const date = new Date(Date.now())
  Person.find({}).then(persons => {    
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
  })  
})

// delete
app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    console.log(`-> Removing ${result.name}`);
    response.json(result)
    response.status(204).end()
  })
  .catch(error => next(error))

})

// create
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // // Check empty information
  // if (!body.name || !body.number) {
    
  //   console.log("name or number missing");

  //   return response.status(400).json({ 
  //     error: 'name or number missing' 
  //   })
  // }

  // Check duplicated person    
  if (!persons.find(p => p.name === body.name)) {
    // Not yet on the phonebook
    const newPerson = new Person({
      name: body.name,
      number: body.number,
    })
    
    console.log(`-> Adding ${newPerson.name}`);
    newPerson.save()
      .then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))
  }
  else {
    console.log("name is duplicated");
    return response.status(400).json({ 
      error: 'name is duplicated' 
    })
  }
})

// update
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id, 
    { name, number }, 
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
// handler of requests with result to errors
app.use(errorHandler)

/*** MAIN ***/
const PORT= process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})