const createError = require("http-errors");
const express = require("express");
const path = require("path");
const calculadora = require("./calculos");
const exp = require("constants");
const app = express();
const port = 3000;

// Middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/calculate", (req, res) => {
  // Envía el archivo estático
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

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

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});

module.exports = app;
