const express = require('express')
const app = express()

const persons= [
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

/*** API ***/
// get all
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// get info
app.get('/api/info', (request, response) => {
  const date = new Date(Date.now())
  response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
})

/*** MAIN ***/
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})