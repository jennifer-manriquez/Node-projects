require("dotenv").config();
const request = require("request");

const mapboxToken = process.env.MAPBOX_TOKEN;
if (!mapboxToken) {
  console.log(
    "Missing required API keys. Add them to your local environment before running this app.",
  );
  process.exit(1);
}

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    address,
  )}&access_token=${mapboxToken}&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
      return;
    } else {
      const { coordinates, full_address } =
        response.body.features[0].properties;
      const { latitude, longitude } = coordinates;
      callback(undefined, {
        latitude,
        longitude,
        location: full_address,
      });
    }
  });
};

module.exports = geocode;
