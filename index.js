const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const loadWeatherRoute = require('./weather');
const loadMovieRoute = require('./discover-movies');

const app = express();
app.use(bodyParser.json());

loadMovieRoute(app);
loadWeatherRoute(app);

const port = config.PORT;
app.listen(port, function() {
  console.log(`App is listening on port ${port}`);
});
