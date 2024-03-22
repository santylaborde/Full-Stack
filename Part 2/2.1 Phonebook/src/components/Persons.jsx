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
  export const Filter = ({filter, onChange}) => {
    return(
    <div>    
      Filter shown with <input value={filter} onChange={onChange}/>
    </div>  
    )
  }
  
// Person component
  const Person = ({person}) => {  
    
    const { name, number } = person
  
    return (
      <li>{name} {number}</li>
    )
  }
  
// Persons component
  export const Persons = ({persons}) => {
    return(
    <ul>
      {/* Show filtered people */}
      {persons.map(person =>
        <Person key={person.id} person={person} />
      )}
    </ul>
    )
  }

  export default PersonForm