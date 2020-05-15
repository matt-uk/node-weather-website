const request = require('request')

const forecast= (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=247c654b0d375e86d48ff8ab2b898331&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request( {url, json: true}, (error,{body}) =>{
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Location Error:' + body.error.info, undefined)
        } else {
            callback(undefined, 'Forecast is ' + body.current.weather_descriptions +
                '. Current temp is ' + body.current.temperature + 'C and feels like ' + body.current.feelslike + 'C.' +
                ' Humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast