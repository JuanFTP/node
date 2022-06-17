const express = require("express");
const hbs = require("hbs");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

//Handlebars
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

// Servir contenido estático
app.use(express.static("./public"));

const data = {
  default: "Bienvenido",
  nombre: "Juan Temich",
  titulo: "Curso de Node",
};

app.get("/", (req, res) => {
  res.render("home", data);
});

app.get("/elements", (req, res) => {
  res.render("elements", data);
});

app.get("/generic", (req, res) => {
  res.render("generic", data);
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => console.log(`Running at the port: ${port}`));
