import axios from 'axios'
const API_key = import.meta.env.VITE_SOME_KEY

const getWeather = (country) => {
    // parameters
    const units= "metric"
    const latitude = country[0].capitalInfo.latlng[0]
    const longitude= country[0].capitalInfo.latlng[1]
    const weatherUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${API_key}`
    
    // request
    const request= axios.get(weatherUrl)
    return request.then(response => response.data)
}

export default { getWeather }