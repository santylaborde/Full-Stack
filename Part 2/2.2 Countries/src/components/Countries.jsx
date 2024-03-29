import { Component } from "react"

// Filter component
const Filter = ({filter, onChange}) => {
  return(
  <div>    
    Filter shown with <input value={filter} onChange={onChange}/>
  </div>  
  )
}

// Country component
const Country = ({country}) => {  
  
  return (
    <li>{country.name.common}</li>
  )
}

// Country Information component
const CountryInformation = ({country}) => {  
  
  const languages= (Object.keys(country[0].languages)).map(key => country[0].languages[key])

  return (
    <div>
      <h2>{country[0].name.common}</h2>
      <table>
        <tbody>
            <tr>
              <td> <u> Capital: </u> </td>
              <td>{country[0].capital}</td>
            </tr>
            <tr>
              <td> <u> Area: </u> </td>
              <td>{country[0].area}</td>
            </tr>
            <tr>
              <td> <u> Languages: </u> </td>
              <td> <ul> { languages.map(language => <li>{language} </li>) } </ul> </td>              
            </tr>              
        </tbody>
      </table>

      <img src={country[0].flags.png} alt={country[0].flags.alt} />

    </div>
  )
}

// Countries component
const Countries = ({countries}) => {
  
  if(countries.length > 1 && countries.length < 10)
  {
    return(
      <div>
        {/* Show filtered countries */}
        <ul>
          {countries.map(country =>
            <Country key={country.name.official} country={country}/>
          )}
        </ul>
      </div>
    )
  }
  else if(countries.length === 1)
  {
    // Information about the country
    return(<CountryInformation country={countries}/>)
  }
  else
  {
    return(
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
    )
  }
}

export default { Filter, Countries}