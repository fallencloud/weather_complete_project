//imports
const https = require('https');
const weather = require('./weather');

//declarations
let location = process.argv.slice(2);

location = location.join(' ');

if(parseInt(location)) {
    weather.getZip(location);
} else {
    weather.getCity(location);
}