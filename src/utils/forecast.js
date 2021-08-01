const request = require ('request');

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com//forecast?access_key=cb05e5d75adfb6ed6bcfa0e0dcd42196&query=' + lat + ',' + lng + '&units=f';
  
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