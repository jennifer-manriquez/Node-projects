require("dotenv").config();
const request = require("request");

const mapboxToken = process.env.MAPBOX_TOKEN;
const weatherstackKey = process.env.WEATHERSTACK_KEY;
if (!mapboxToken || !weatherstackKey) {
  console.log(
    "Missing required API keys. Add them to your local environment before running this app.",
  );
  process.exit(1);
}
const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=42.3605,-71.0596`;
// const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=KDJSHSFKJSH`;

request({ url: url }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service!");
    return;
  }

  const data = JSON.parse(response.body);
  if (data.error) {
    console.log("Unable to find location");
  } else {
    console.log(
      data.current.weather_descriptions[0] +
        ". It is currently " +
        data.current.temperature +
        " degrees out. It feels like " +
        data.current.feelslike +
        " degrees out.",
    );
  }
});

const geocodeURL = `https://api.mapbox.com/search/geocode/v6/forward?q=Los%20Angeles&access_token=${mapboxToken}&limit=1`;

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to location services!");
    return;
  }

  if (response.body.features.length === 0) {
    console.log("Unable to find location. Try another search.");
    return;
  }

  const { coordinates } = response.body.features[0].properties;
  const { latitude, longitude } = coordinates;
  console.log(latitude, longitude);
});
