const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

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
    title: "Trang chu",
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

app.listen(3000, () => {
  console.log("Server dang chay");
});
