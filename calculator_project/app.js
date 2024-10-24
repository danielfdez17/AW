"use strict";

// Módulos importados y constantes globales
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const calculadora = require("./calculos");
const app = express();
const port = 3000;

// Middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Envía el archivo estático para mostrar la calculadora
app.get("/", (req, res) => {
  res.redirect("/calculate");
});

// Envía el archivo estático para mostrar la calculadora
app.get("/calculate", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Recibe la petición del formulario para realizar la operación ingresada por el usuario
app.post("/calculate", (req, res) => {
  let resultado = 0;

  let primer_valor = parseFloat(req.body.firstValue);
  let segundo_valor = parseFloat(req.body.secondValue);

  if (req.body.operator === "+")
    resultado = calculadora.sum(primer_valor, segundo_valor);
  else if (req.body.operator === "-")
    resultado = calculadora.subtract(primer_valor, segundo_valor);
  else if (req.body.operator === "*")
    resultado = calculadora.multiply(primer_valor, segundo_valor);
  else if (req.body.operator === "/")
    resultado = calculadora.divide(primer_valor, segundo_valor);

  res.json({ resultado: resultado });
});

// Manejo de errores 404
app.use(function (req, res, next) {
  next(createError(404));
});

// El servidor se queda escuchando en el puerto 'port'
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});

module.exports = app;
