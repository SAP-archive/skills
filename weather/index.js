const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('./config');

const app = express();

app.use(bodyParser.json());

const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5';

app.post('/weather', function(req, res) {
  console.log('[GET] /weather');
  const location = req.body.conversation.memory['location'];

  return axios
    .get(`${WEATHER_API_URL}/weather`, {
      params: {
        lat: Math.round(location.lat),
        lon: Math.round(location.lng),
        appid: config.OPENWEATHER_TOKEN,
      },
    })
    .then(function(response) {
      const body = response.data;
      if (!body || !body.weather || body.weather.length === 0) {
        return res.json({
          replies: [
            {
              type: 'text',
              content:
                "I couldn't find any results for this location, could you try again?",
            },
          ],
        });
      }
      const mainWeather = body.weather[0].main;
      return res.json({
        replies: [
          {
            type: 'text',
            content: `We're exepecting ${mainWeather} in ${location.formatted} today!`,
          },
        ],
      });
    })
    .catch(function(err) {
      console.error('weatherBot::weather error: ', err);
    });
});

const port = config.PORT;
app.listen(port, function() {
  console.log(`App is listening on port ${port}`);
});
