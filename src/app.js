const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for web server
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars config and paths
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Matt Ratliff'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Matt Ratliff'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Pages',
        name: 'Matt Ratliff',
        helptext: 'Call on Dredd for all your support needs!'
    })
})
app.get('/Weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address to get the weather!'
        })
    }
    const address = req.query.address
    geocode(address, (error,{latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            return res.send({
                address: address,
                location: location,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'Help page not found',
        errorMsg: 'Help article could not be found.',
        name: 'Matt Ratliff'
    })
})
app.get('*', (req,res) => {
    res.render('404', {
        title: 'Page not found',
        errorMsg: 'Page not found.',
        name: 'Whoopsie'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})