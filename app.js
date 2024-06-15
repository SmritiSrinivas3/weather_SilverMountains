const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = process.env.API_KEY;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=metric';

    https.get(url, (response) => {
        response.on('data', (data) => {
            const myData = JSON.parse(data);
            const temp = myData.main.temp;
            const desc = myData.weather[0].description;
            res.write("<h1>The temperature in " + query + " is " + temp + " degree Celsius</h1>");
            res.write("<h2>" + desc + "</h2>");
            res.send();
        });
    }).on('error', (e) => {
        console.error(e);
        res.send("Error fetching weather data.");
    });
});

app.listen(3000, () => {
    console.log('Our server is running at port 3000');
});

