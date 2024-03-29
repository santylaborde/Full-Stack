import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'
const apiUrl = '/api/all'

const getAll = () => {
  const request= axios.get(baseUrl+apiUrl)
  return request.then(response => response.data)
}

export default { getAll }