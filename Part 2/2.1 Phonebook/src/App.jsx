import { useState } from 'react'

const Person = ({person}) => {  
  
  const { name, number } = person

  return (
    <li>{name} {number}</li>
  )
}

const App = () => {
  // Persons
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567" }
  ]) 
  // New person
  const [newName, setNewName] = useState('')
  // New number
  const [newNumber, setNewNumber] = useState('')

  // Handler add person
  const addPerson = (event) => {

    event.preventDefault() // avoids default action of submitting HTML forms

    // Check new person
    const storedNames= persons.map(person => person.name)
    
    if (!storedNames.includes(newName))
    {
      // Not yet on the phonebook
      const personObject = { name: newName, number: newNumber } // New person object
      setPersons(persons.concat(personObject)) // add new person to list of persons
      setNewName('') // Reset the string array for new names
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

  // Handler input name
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      {/* Title */}
      <h2>Phonebook</h2>

      {/* Add name */}
      <form onSubmit={addPerson}>
        
        {/* input */}
        <div>
          <table>
            <tbody>
              <tr> 
                <td>Name: </td>
                <td><input value={newName} onChange={handleNameChange}/></td>
              </tr>
              <tr> 
                <td>Number: </td>
                <td><input value={newNumber} onChange={handleNumberChange}/></td>
              </tr>
            </tbody>
          </table>
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
          <Person key={person.name} person={person} />
        )}
      </ul>

    </div>
  )
}

export default App