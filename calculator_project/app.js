const createError = require('http-errors');
const express = require('express');
const path = require('path')
const calculadora = require('./calculos')
const app = express();

// Middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/calculate', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Envía el archivo estático
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
