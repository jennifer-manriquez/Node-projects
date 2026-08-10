const path = require("path");
const express = require("express");
// express is a function
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); // Set the views path
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Jenny Manriquez" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About ", name: "Jenny Manriquez" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is the help text.",
    name: "Jennifer Manríquez",
  });
});

app.get("/weather", (req, res) => {
  res.render("404Page", {
    forecast: "It is snowing",
    location: "Philadelphia",
  });
});

// Specific to help
app.get("/help/{*splat}", (req, res) => {
  res.render("404Page", {
    notFoundMessage: "Help article not found",
  });
});

// Error handling
app.get("/{*splat}", (req, res) => {
  res.send({
    notFoundMessage: "Page not foung",
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
