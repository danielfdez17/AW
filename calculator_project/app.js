const createError = require('http-errors');
const express = require('express');
const path = require('path')
const calculadora = require('./calculos');
const exp = require('constants');
const app = express();

// Middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/calculate', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Envía el archivo estático
});

app.post('/calculate', (req, res) => {
  let resultado = 0;

  let primer_valor = parseFloat(req.body.firstValue);
  let segundo_valor = parseFloat(req.body.secondValue);

  if(req.body.operator === "+")
    resultado = calculadora.sum(primer_valor, segundo_valor);
  else if(req.body.operator === "-")
    resultado = calculadora.subtract(primer_valor, segundo_valor);
  else if(req.body.operator === "*")
    resultado = calculadora.multiply(primer_valor, segundo_valor);
  else if(req.body.operator === "/")
    resultado = calculadora.divide(primer_valor, segundo_valor);

  res.json({ resultado: resultado });
});



// Manejo de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(3000, () => 
{
    console.log('Servidor en marcha'); 
})


module.exports = app;
