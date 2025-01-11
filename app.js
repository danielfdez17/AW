"use strict";
const express = require("express");
const path = require("path");
const createError = require("http-errors");
const morgan = require("morgan");

const app = express();
const PORT = 3500;
const indexRouter = require("./routes/index.js");
const expressValidator = require("express-validator");
const { ExpressValidator } = require("express-validator");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(ExpressValidator);
app.use((req, res, next) => {
  next(createError(404));
});
app.use((req, res, next) => {
  next(createError(500));
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    error: err,
    message: err.message,
    status: err.status,
    stack: err.stack,
  });
});

app.listen(PORT, (err) => {
  if (err) console.log(`Error al iniciar el servidor: ${err}`);
  else console.log(`Servidor escruchando en http://localhost:${PORT}`);
});
module.exports = app;
