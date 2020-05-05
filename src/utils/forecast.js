const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=33e8f90c10fb89fe41bd8643c4b75b57&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f';

    request({url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback("Unable to find location.", undefined);
        } else {


            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.");
        }
    });
};


module.exports = forecast;
