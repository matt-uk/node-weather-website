const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXJhdGxpZmZ1ayIsImEiOiJjazl0cW55ZHYxZ3RuM2xydG0yNXZwanlmIn0.N51-pHLXFH_ZgsVgZ0V2MQ'
    request( {url, json: true}, (error,{body}) =>{
        if (error) {
            callback('Unable to connect to Geocode Service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {latitude: body.features[0].center[1],
                                 longitude: body.features[0].center[0],
                                 location: body.features[0].place_name})
        }
    })
}

module.exports = geocode