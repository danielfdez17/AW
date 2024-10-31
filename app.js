"use strict";
const express = require("express");
const path = require("path");
const port = 3000;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, (err) => {
  if (err) console.log(`Erro al iniciar el servidor: ${err}`);
  else console.log(`Servidor escuchando en http://localhost:${port}`);
});
