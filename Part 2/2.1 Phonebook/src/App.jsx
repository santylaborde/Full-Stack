import { useState, useEffect } from 'react'
// Components
import personComponent from './components/Persons'
// Communication
import personService from './services/Persons'

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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  // Handler add person
  const addPerson = (event) => {

    event.preventDefault() // avoids default action of submitting HTML forms

    // Check new person
    const newPerson = persons.find(p => p.name === newName)
    
    if (!newPerson)
    {
      // Not yet on the phonebook
      const personObject = { name: newName, number: newNumber } // New person object
      
      // Put new contact
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)) // add new person to list of persons
          setNewName('') // Reset the string array for new names
          setNewNumber('') // Reset the string array for new names
        })
    }
    else
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        // Copy of the people list with updated phones
        const changedPerson = { ...newPerson, number: newNumber }

        personService
          .update(changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name === newName ? returnedPerson : person))
          })
          .catch(error => {
            alert(
              `'${newName}' was already deleted from server`
            )
            setPersons(persons.filter(n => n.name !== newName))
          })
      }
    }
  }

  // Handler delete person
  const deletePerson = id => {
    
    // Identifying person by id
    const arrayHasID= persons.map(person => person.id === id)
    const indexOfID= arrayHasID.indexOf(true)

    if (window.confirm("Delete " + persons[indexOfID].name +"?")) {
      // Remove new contact
      personService
      .remove(id)
      .then(returnedPerson => {
        const updatedPersons= persons.filter(person => person.id !== id) // Copy array but without the deleted person
        setPersons(updatedPersons) // set the new list of persons
        console.log("Successfully delete " + returnedPerson.name);
      })
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
      <personComponent.Filter filter={filteredPerson} onChange={handleFilterChange}/>      

      {/* New contact */}
      <h2>New Contact</h2>

      {/* Person form */}
      <personComponent.PersonForm onSubmit={addPerson} 
                  name={newName} handlerName={handleNameChange} 
                  number={newNumber} handlerNumber={handleNumberChange} />
              
      {/* Numbers */}
      <h2>Numbers</h2>
      <personComponent.Persons persons={personToShow} handler={deletePerson}/>
      
    </div>
  )
}

export default App