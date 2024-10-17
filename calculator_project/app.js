const createError = require('http-errors');
const express = require('express');
const path = require('path')
const calculadora = require('./calculos')
const app = express();


// Middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Configuración del motor de vistas (EJS)
app.post('/calculate', (req, res) => {
    res.render('index');
});


// Manejo de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => 
{
   console.log('Servidor en marcha'); 
})

module.exports = app;
