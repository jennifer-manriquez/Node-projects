const path = require("path");
const express = require("express");
// express is a function

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");

// You can now access the help and about pages by going to localhost:3000/help.html and localhost:3000/about.html

app.use(express.static(publicDirectoryPath));

// This will not run as we declared above the static directory. It will only show the first match, so this will be ignored.
app.get("", (req, res) => {
  res.send("<h1>Weather</h1>!");
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
