const axios = require('axios');
require('dotenv').config();

async function getWeather(city) {
    const [orangeColor, greenColor,redColor,blueColor] = ["\x1b[33m","\x1b[32m","\x1b[31m","\e[34m"];
    const apiKey = process.env.API_KEY; // Accessing API key from environment variables
    const baseUrl = "https://api.weatherbit.io/v2.0/current";
    const params = {
        key: apiKey,
        city: city,
        units: "M" // You can change the units as per your preference, "M" for metric
    };

    try {
        const response = await axios.get(baseUrl, {params});
        const data = response.data;
        if(data){
            console.log(`{blueColor} Weather in ${city}`);
            console.log("Description:", data.data[0].weather.description);
            console.log("Temperature:", data.data[0].temp, "°C");
            console.log("Humidity:", data.data[0].rh, "%");
        }
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}


module.exports = getWeather;