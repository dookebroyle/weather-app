const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const dotenv = require('dotenv')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Brooke Doyle'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Brooke Doyle'
    })
})

app.get('/contact', (req, res) =>{
    res.render('contact', {
        title: 'Contact',
        contactTxt: 'Contact me at doyle_brooke@hotmail.com',
        name: 'Brooke Doyle'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send( {
            error: 'No location entered. Please provide a city name.'
        })
    }
    geocode(req.query.address, (error, {lat,lng,loc} = {}) => {
        if (error){
            return res.send({ error });
        }
        forecast(lat, lng, (error, forecastData) => {
            if (error){
                return res.send({error});
            }
            res.send({
                currentTemp: forecastData.currentTemp,
                windSpeed: forecastData.windSpeed,
                weatherDescription: forecastData.weatherDescription,
                windDir: forecastData.windDir,
                location: loc,
                address: req.query.address
            });
          })
    })   
})

app.get ('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        error: 'Help Page Not Found',
        name: 'Brooke Doyle'
    })
})

app.get ('/about/*', (req, res) =>{
    res.render('404', {
        title: '404',
        error: 'About Page Not Found',
        name: 'Brooke Doyle'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page Not Found',
        name: 'Brooke Doyle'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})







