//Problem: get a zipcode or city name from the user
//Solution: show their current weather information

//import the https module
const api = require('./api.json');
const https = require('https');
const http = require('http');

//connect to the api api.openweathermap.org/data/2.5/weather?q={city name}
  //api.openweathermap.org/data/2.5/weather?q=London

//print the data
function printMessage(info) {
    let message = `Current temperature in ${info.name} is ${info.main.temp}F`;
    console.log(message);
}

//Print Error messages
function printError(error) {
    console.error(error.message);
 }
 

function getZip(zipCode) {
    let zip = https.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&APPID=${api.key}`, response => {
        if (response.statusCode === 200) {
            let body = '';

            //read the data
            response.on('data', data => {
                body += data.toString();
            });


            response.on('end', () => {
                //parse the data
                try {
                const weather = JSON.parse(body);
                printMessage(weather);
                } catch(error) {
                console.error(error.message);
                }
            });

            response.on('error', error => {
                console.error(error.message);
            });
        } else {
            const message = `There was an error getting weather info for ${zipCode} (${http.STATUS_CODES[response.statusCode]})`;
            const statusCodeError = new Error(message);
            printError(statusCodeError);
        }  
    });
}//end function getZip

function getCity(city) {
    let location = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${api.key}`, response => {
        if (response.statusCode === 200) {
            let body = '';

            //read the data
            response.on('data', data => {
                body += data.toString();
            });


            response.on('end', () => {
                //parse the data
                try {
                const weather = JSON.parse(body);
                printMessage(weather);
                } catch(error) {
                    printError(error);
                }
            });

            response.on('error', error => {
                printError(error);
            });

        } else {
            const message = `There was an error getting weather info for ${city} (${http.STATUS_CODES[response.statusCode]})`;
            const statusCodeError = new Error(message);
            printError(statusCodeError);
        } 
 
    });
}

//make the functions accessible
module.exports.getCity = getCity;
module.exports.getZip = getZip;