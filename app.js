"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require('http-errors');
const morgan = require('morgan');
const path = require("path");
const indexRouter = require("./routers/index.js");

const port = 3000;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.use(express.static(path.join(__dirname, "public")));

// Control error 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Control error 500
app.use(function(req, res, next) {
  next(createError(500));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {error: err, message: err.message});
});


app.listen(port, (err) => {
  if (err) console.log(`Erro al iniciar el servidor: ${err}`);
  else console.log(`Servidor escuchando en http://localhost:${port}`);
});
