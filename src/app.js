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
    indexText: "Day la trang chinh",
    name: "Nam Cao",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    aboutText: "Day la trang about",
    image: "/assets/images.jpg",
    name: "Nam Cao",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Day la trang help",
    name: "Nam Cao",
  });
});

app.listen(3000, () => {
  console.log("Server dang chay");
});
