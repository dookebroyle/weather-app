const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const dotenv = require('dotenv');
const e = require('express');
const reverse = require('reverse-geocode')


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
        title: 'About This Site',
        name: 'Brooke Doyle'
    })
})

app.get('/contact', (req, res) =>{
    res.render('contact', {
        title: 'Contact',
        name: 'Brooke Doyle'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query){
        return res.send( {
            error: 'No location entered. Please provide a city name.'
        })
    }
    if(req.query.address){
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
    }
    if(req.query.location){
        
        const loc = req.query.location.split(',');
        forecast(loc[0], loc[1], (error, forecastData) => {
            const address = reverse.lookup(loc[0], loc[1], 'us')
            const cityState = `${address.city}, ${address.state}`
            if (error){
                return res.send({error});
            }
            res.send({
                currentTemp: forecastData.currentTemp,
                windSpeed: forecastData.windSpeed,
                weatherDescription: forecastData.weatherDescription,
                windDir: forecastData.windDir,
                location: cityState,
                address: req.query.address
            });
        })
    }
    
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







