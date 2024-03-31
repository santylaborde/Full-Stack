const weather = weather => {

    if(Object.keys(weather.weather).length){

        const temp= weather.weather.list[0].main.temp
        const wind= weather.weather.list[0].wind.speed
        const icon= weather.weather.list[0].weather[0]
        const iconUrl= `https://openweathermap.org/img/wn/${icon.icon}@2x.png`

        return(
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td><u>Temperature:</u></td>
                            <td>{temp} Celsius</td>
                        </tr>
                        <tr>
                            <td><u>Wind:</u></td>
                            <td>{wind} m/s</td>
                        </tr>
                    </tbody>
                </table>

                <img src={iconUrl} alt={icon.description} />

            </div>
        )
    }
    else {
        return(
            <div>
                <p> Waiting forecast weather information... </p>
            </div>
        )
    }

}

export default { weather }