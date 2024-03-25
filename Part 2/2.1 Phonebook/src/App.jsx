import { useState, useEffect } from 'react'
import axios from 'axios'

import PersonForm from './components/Persons'
import {Filter} from "./components/Persons"
import {Persons} from "./components/Persons"

const App = () => {
  // Persons
  const [persons, setPersons] = useState([])
  // New person
  const [newName, setNewName] = useState('')
  // New number
  const [newNumber, setNewNumber] = useState('')
  // Filter person
  const [filteredPerson, setFilteredPerson] = useState('')

  // Get persons
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  // Handler add person
  const addPerson = (event) => {

    event.preventDefault() // avoids default action of submitting HTML forms

    // Check new person
    const storedNames= persons.map(person => person.name)
    
    if (!storedNames.includes(newName))
    {
      // Not yet on the phonebook
      const personObject = { name: newName, number: newNumber, id: persons.length+1 } // New person object
      setPersons(persons.concat(personObject)) // add new person to list of persons
      setNewName('') // Reset the string array for new names
      setNewNumber('') // Reset the string array for new names
    }
    else
    {
      alert(`${newName} is already added to phonebook`)
    }
  }

  // Handler input name
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Handler input number
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Handler input filter
  const handleFilterChange = (event) => {
    setFilteredPerson(event.target.value)
  }
  
  // Filter people by input text
  const personToShow = filteredPerson==="" ? persons : persons.filter(person => (person.name.toLowerCase()).startsWith(filteredPerson.toLowerCase()))

  return (
    <div>
      {/* Title */}
      <h1>Phonebook</h1>

      {/* Search contact */}
      <Filter filter={filteredPerson} onChange={handleFilterChange}/>      

      {/* New contact */}
      <h2>New Contact</h2>

      {/* Person form */}
      <PersonForm onSubmit={addPerson} 
                  name={newName} handlerName={handleNameChange} 
                  number={newNumber} handlerNumber={handleNumberChange} />
              
      {/* Numbers */}
      <h2>Numbers</h2>
      <Persons persons={personToShow}/>
      
    </div>
  )
}

export default App