const request = require ('request');
require('dotenv').config()

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com//forecast?access_key=' + process.env.WEATHER_API + '&query=' + lat + ',' + lng + '&units=f';
  
    request ({ url, json: true }, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather service!");
        } else if (undefined, body.error) {
            callback(`Error detected: ${body.error.info}`);
        } else {

            callback(undefined, {
                weatherDescription: body.current.weather_descriptions[0],
                currentTemp: body.current.temperature,
                windSpeed: body.current.wind_speed,
                windDir: body.current.wind_dir,
                precip: body.current.precip
            })
        }
    });
}

module.exports = forecast;