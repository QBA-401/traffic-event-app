'use strict';
const getWeather = require('./weather')
const Chance = require('chance');
let cityData = "Noginsk"

class Alert {
    constructor(channelURL) {
        this.io = require('socket.io-client');
        this.channelURL = channelURL;
        this.chance = new Chance();
        this.hubConnection = this.io.connect(channelURL);
        this.startAlerts();
        this.generateTrafficAlert();
        this.generateWeatherReport();
    }

    generateTrafficAlert() {
        // Randomly select type of traffic alert
        const alertTypes = ['Accident', 'Road construction', 'Heavy traffic', 'Vehicle breakdown', 'Lane closure', 'Traffic jam'];
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];

        // Random location for the traffic alert
        const locations = ['on the highway', 'in the downtown area', 'near the intersection', 'on the main road', 'on the freeway'];
        const location = locations[Math.floor(Math.random() * locations.length)];

        // Random severity level
        const severityLevels = ['Low', 'Medium', 'High'];
        const randomValue = Math.random();
        const index = Math.floor(randomValue * severityLevels.length);
        const severity = severityLevels[index];
        
        const alertMessageColor = function Colorize(severity) {
            let res = "";
            const [orangeColor, greenColor,redColor,blueColor] = ["\x1b[33m","\x1b[32m","\x1b[31m","\e[34m"];
            if (severity === "High")
                res = `${alertType} alert: ${location}. Severity: "${redColor}${severity}\x1b[0m".`;
            else if (severity === "Medium")
                res = `${alertType} alert: ${location}. Severity: "${orangeColor}${severity}\x1b[0m".`;
            else
                res = `${alertType} alert: ${location}. Severity: "${greenColor}${severity}\x1b[0m".`;
            return res;
        };

        let alertMessage = alertMessageColor(severity);

        return alertMessage;
    }

    generateWeatherReport() {
        // Randomly select weather conditions
        const conditions = ['sunny', 'cloudy', 'rainy', 'stormy', 'foggy', 'snowy'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];

        // Random temperature between -10 and 40 degrees Celsius
        const temperature = (Math.random() * (40 - (-10)) + (-10)).toFixed(1);

        // Random wind speed between 0 and 50 km/h
        const windSpeed = (Math.random() * 50).toFixed(1);

        // Random humidity percentage between 20% and 100%
        const humidity = Math.floor(Math.random() * (100 - 20 + 1) + 20);

        // Random chance of precipitation between 0% and 100%
        const precipitationChance = Math.floor(Math.random() * 101);

        // Generate the report
        const report = `Weather report: ${condition.charAt(0).toUpperCase() + condition.slice(1)}. Temperature: ${temperature}°C. Wind speed: ${windSpeed} km/h. Humidity: ${humidity}%. Chance of precipitation: ${precipitationChance}%.`;
        return report;
    }


    generateRealWeatherReport(cityData) {
        getWeather(cityData);
    }

    startAlerts() {
        setInterval(() => {
            const alertSystem = this.alertSystem;
            const randomTrafficAlert = this.generateTrafficAlert();

            this.hubConnection.emit('get-alert-info', alertSystem);
            const alertInfo = {
                alert: 'Traffic',
                alertMessage: randomTrafficAlert
            }

            console.log(randomTrafficAlert);

            this.hubConnection.emit('alert-available', alertInfo);
        }, 2000);


        setInterval(() => {
            const alertSystem = this.alertSystem;

            //REAL WEATHER:
            const randomWeatherAlert = this.generateWeatherReport();

            this.hubConnection.emit('get-alert-info', alertSystem);

            const alertInfo = {
                alert: 'Weather',
                alertMessage: randomWeatherAlert
            }

            console.log(randomWeatherAlert);

            this.hubConnection.emit('alert-available', alertInfo);
        }, 2000);
    }
}

module.exports = Alert;