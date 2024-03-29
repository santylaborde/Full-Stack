import { useState, useEffect } from 'react'
// Components
import countryComponent from './components/Countries'
// Communication
import countryService from './services/Countries'

const App = () => {
  /*** STATE VARIABLES ***/
  // Countries
  const [countries, setCountries] = useState([])
  // Filter country
  const [filteredCountry, setfilteredCountry] = useState('')

  /*** SERVICES ***/
  // Get countries
  const hook = () => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }

  useEffect(hook, [])

  // Input filter
  const handleFilterChange = (event) => {
    setfilteredCountry(event.target.value)
  }
  
  // Filter people by input text
  const countryToShow = filteredCountry==="" ? countries : countries.filter(country => (country.name.common.toLowerCase()).includes(filteredCountry.toLowerCase()))

  /*** MAIN ***/
  return (
    <div>
      {/* Title */}
      <h1>Countries</h1>

      {/* Search country */}
      <countryComponent.Filter filter={filteredCountry} onChange={handleFilterChange}/>
      <countryComponent.Countries countries={countryToShow}/>
      
    </div>
  )
}

export default App