// TODO: Si express-generator está como dependencia, sacar de la plantilla app.js.ejs
"use strict"; // ! PLANTILLA app.js
const express = require("express");
const path = require("path");
const createError = require("http-errors");
const morgan = require("morgan");

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use((req, res, next) => {
  next(createError(404));
});
app.use((req, res, next) => {
  next(createError(500));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    status: err.status,
    stack: err.stack,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error al iniciar el servidor: ${err}`);
  } else {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  }
});

module.exports = app;




