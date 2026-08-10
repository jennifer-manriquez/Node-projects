require("dotenv").config({ quiet: true });
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

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(
        "Unable to find weather data for the specified location.",
        undefined,
      );
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current;
      callback(
        undefined,
        weather_descriptions[0] +
          " It is currently " +
          temperature +
          " degrees out. It feels like " +
          feelslike +
          " degrees.",
      );
    }
  });
};

module.exports = forecast;
