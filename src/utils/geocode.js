const request = require('request');

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZG9va2Vicm95bGUiLCJhIjoiY2txZmU2cGhrMGF4dDJvam93bTZrMHBxcCJ9.vvsFroGNJQHaeR7opvgLCA&limit=1';
    request({ url, json: true }, (error, { body } ={}) => {
        if(error) {
            callback("Unable to connect to location service!");
        } else if (body.features.length === 0) {
            callback(`Unable to find location. Try another search`);
        } else {
                lat = body.features[0].center[1],
                lng = body.features[0].center[0],
                loc = body.features[0].place_name
            callback(undefined, {lat, lng, loc});
        }
    });
}

module.exports = geocode;