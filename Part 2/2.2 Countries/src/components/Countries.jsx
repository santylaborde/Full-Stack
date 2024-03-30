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
const Country = ({country, onClick}) => {  
  
  return (
    <li>{country.name.common} <button onClick={onClick}>show</button> </li>
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
              <td> <ul> { languages.map(language => <li key={language}>{language} </li>) } </ul> </td>              
            </tr>              
        </tbody>
      </table>

      <img src={country[0].flags.png} alt={country[0].flags.alt} />

    </div>
  )
}

// Countries component
const Countries = ({countries, handler}) => {
  
  if(countries.length > 1 && countries.length < 10)
  {
    return(
      <div>
        {/* Show filtered countries */}
        <ul>
          {countries.map(country =>
            <Country key={country.name.official} country={country} onClick={() => handler(country.name.common)} />
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
    let message= "Loading countries, please wait..."
    
    if(countries.length)
    {
      message= "Too many matches, specify another filter"
    }

    return(
    <div>
      <p>{message}</p>
    </div>
    )
  }
}

export default { Filter, Countries, CountryInformation}