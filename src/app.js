const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./untils/geocode");
const forecast = require("./untils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Set path
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//app set part and static template

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Set static tempalte
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Nam Cao",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    image: "/assets/images.jpg",
    name: "Nam Cao",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Chung toi se giup ban suong",
    name: "Nam Cao",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a searh term",
    });
  }

  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
    name: "Nam Cao",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "404 not found",
    name: "Nam cao",
  });
});

app.listen(port, () => {
  console.log("Server dang chay" + port);
});
