"use strict";

// Módulos importados y constantes globales
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const mysql = require("mysql");
const operaciones = require("./db/operaciones.js");
const paginasDinamicas = require("./public/script.js");

// Database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

// Middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Envía el archivo estático para mostrar la calculadora
app.get("/", (req, res) => {
  res.redirect("/productos");
});

// Envía el archivo estático para mostrar la calculadora
app.get("/productos", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Recibe la petición del formulario para realizar la operación ingresada por el usuario
app.post("/productos", (req, res) => {
  const producto = req.params.producto;
  operaciones.insertarProducto(producto, (err, nombre) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      paginasDinamicas.productoInsertado(res, nombre);
    }
  });
});

app.patch("/productos", (req, res) => {});

// Manejo de errores 404
app.use(function (req, res, next) {
  next(createError(404));
});

// El servidor se queda escuchando en el puerto 'port'
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});

module.exports = { app, pool };
