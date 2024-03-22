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
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  // New person
  const [newName, setNewName] = useState('')
  // New number
  const [newNumber, setNewNumber] = useState('')
  // Filter person
  const [filteredPerson, setFilteredPerson] = useState('')

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
      <div>          
        Filter shown with <input value={filteredPerson} onChange={handleFilterChange}/>
      </div>

      {/* New contact */}
      <h2>New Contact</h2>

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
        {/* Show filtered people */}
        {personToShow.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>

    </div>
  )
}

export default App