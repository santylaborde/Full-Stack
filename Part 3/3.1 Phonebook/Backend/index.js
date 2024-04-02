const express = require('express')
const app = express()

let persons= [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

/*** FUNCTIONS ***/
// json-parser
app.use(express.json())

// id generator
const generateId = () => {
  const max= 10000
  const randId = Math.floor(Math.random() * max);
  return randId
}

/*** API ***/
// get all
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// get singular
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// get info
app.get('/api/info', (request, response) => {
  const date = new Date(Date.now())
  response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
})

// delete
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// create
app.post('/api/persons', (request, response) => {
  const body = request.body

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})

/*** MAIN ***/
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})