import { Component } from "react"

// PersonForm component
const PersonForm = ({onSubmit, name, handlerName, number, handlerNumber}) => {
  return(
  <form onSubmit={onSubmit}>        
    
    {/* input */}
    <div>
      <table>
        <tbody>
          <tr> 
            <td>Name: </td>
            <td><input value={name} onChange={handlerName}/></td>
          </tr>
          <tr> 
            <td>Number: </td>
            <td><input value={number} onChange={handlerNumber}/></td>
          </tr>
        </tbody>
      </table>
    </div>
    
    {/* add button */}
    <div>
      <button type="submit">add</button>
    </div>
        
  </form>
  )
}

// Filter component
const Filter = ({filter, onChange}) => {
  return(
  <div>    
    Filter shown with <input value={filter} onChange={onChange}/>
  </div>  
  )
}

// Person component
const Person = ({person, onClick}) => {  
  
  const { name, number } = person

  return (
    <tr> 
        <td>{name}</td>
        <td>{number}</td>
        <td><button onClick={onClick}>delete</button></td>
    </tr> 
  )
}

// Persons component
const Persons = ({persons, handler}) => {
  return(
    <div>
      <table>
        <tbody>
            {/* Show filtered people */}
            {persons.map(person =>
              <Person key={person.id} person={person} onClick={() => handler(person.id)}/>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default { PersonForm , Filter, Persons}