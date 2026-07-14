const path = require("path");
const express = require("express");
// express is a function

const app = express();

app.set("view engine", "hbs");

const publicDirectoryPath = path.join(__dirname, "../public");

// You can now access the help and about pages by going to localhost:3000/help.html and localhost:3000/about.html

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Jenny Manriquez" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About ", name: "Jenny Manriquez" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", helpText: "This is the help text." });
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
