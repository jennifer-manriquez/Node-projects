require("dotenv").config();
const request = require("request");

const weatherstackKey = process.env.WEATHERSTACK_KEY;
if (!weatherstackKey) {
  console.log(
    "Missing required API keys. Add them to your local environment before running this app.",
  );
  process.exit(1);
}

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback(
        "Unable to find weather data for the specified location.",
        undefined,
      );
    } else {
      const { weather_descriptions, temperature, feelslike } =
        response.body.current;
      callback(undefined, {
        description: weather_descriptions[0],
        temperature,
        feelslike,
      });
    }
  });
};

module.exports = forecast;
