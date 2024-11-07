"use strict";
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const path = require("path");
const router = require("./routers/router.js");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use(router);

app.listen(port, (err) => {
  if (err) {
    console.log(`Error al iniciar el servidor: ${err}`);
  } else {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  }
});
