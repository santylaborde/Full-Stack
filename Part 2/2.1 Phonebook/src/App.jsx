import { useState } from 'react'

const Person = ({ name }) => {  
  return (
    <li>{name}</li>
  )
}

const App = () => {
  // Persons
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  // New person
  const [newName, setNewName] = useState('')

  // Handler add person
  const addPerson = (event) => {

    event.preventDefault() // avoids default action of submitting HTML forms

    // New person object
    const personObject = { name: newName }
    setPersons(persons.concat(personObject)) // add new person to list of persons
    setNewName('') // Reset the string array for new names
  }

  // Handler input text
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      {/* Title */}
      <h2>Phonebook</h2>

      {/* Add name */}
      <form onSubmit={addPerson}>
        
        {/* input */}
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>

        {/* add button */}
        <div>
          <button type="submit">add</button>
        </div>
        
      </form>

      {/* Numbers */}
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} name={person.name} />
        )}
      </ul>

    </div>
  )
}

export default App