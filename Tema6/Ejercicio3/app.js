"use strict";
const express = require("express");
const path = require("path");
const router = require("./routers/router.js");
const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
