require("dotenv").config();
const request = require("request");

const mapboxToken = process.env.MAPBOX_TOKEN;

if (!mapboxToken) {
  console.log(
    "Missing MAPBOX_TOKEN. Add it to your local environment before running this app.",
  );
  process.exit(1);
}

const geocodeURL = `https://api.mapbox.com/search/geocode/v6/forward?q=Los%20Angeles&access_token=${mapboxToken}&limit=1`;

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log("Error:", error.message);
    return;
  }

  const { coordinates } = response.body.features[0].properties;
  console.log("coordinates", coordinates);
  const { latitude, longitude } = coordinates;
  console.log(latitude, longitude);
});
