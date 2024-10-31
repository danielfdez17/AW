"use strict";
const express = require("express");

const port = 3000;
const app = express();



app.listen(port, (err) => {
  if (err) console.log(`Erro al iniciar el servidor: ${err}`);
  else console.log(`Servidor escuchando en http://localhost:${port}`);
});
