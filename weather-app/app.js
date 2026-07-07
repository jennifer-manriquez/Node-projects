const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("Los Angeles", (error, data) => {
  if (error) {
    console.log("Error:", error);
  } else if (data) {
    console.log("Data:", data);
  }
});

forecast(42.3605, -71.0596, (error, data) => {
  if (error) {
    console.log("Error:", error);
  } else if (data) {
    console.log("Data:", data);
  }
});
