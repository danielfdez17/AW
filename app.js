"use strict";
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const createError = require("http-errors");

const indexRouter = require("./routes/index.js");

const PORT = 3500;
const ISERR = 500;
const NFERR = 404;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.use(indexRouter);

app.use((req, res, next) => {
  next(createError(NFERR));
});
app.use((req, res, next) => {
  next(createError(ISERR));
});

app.use((err, req, res, next) => {
  res.status(err.status || ISERR);
  res.render("error", {
    message: err.message,
    status: err.status,
    stack: err.stack,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error al iniciar el servirdor: ${err}`);
  } else {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  }
});

module.exports = app;
