"use strict";
const express = require("express");
const router = express.Router();
let opciones = [
  {
    color: "Rojo",
    votos: 0,
  },
  {
    color: "Azul",
    votos: 0,
  },
  {
    color: "Verde",
    votos: 0,
  },
  {
    color: "Otro",
    votos: 0,
  },
];

router.get("/", (req, res) => {
  res.render("formulario");
});

router.get("/resultados", (req, res) => {
  updateColor(req.query.color);
    res.render("resultados", { resultados: opciones });
});

function updateColor(color) {
  switch (color) {
    case "rojo":
      opciones[0].votos++;
      break;
    case "azul":
      opciones[1].votos++;
      break;
    case "verde":
      opciones[2].votos++;
      break;
    case "otro":
      opciones[3].votos++;
      break;
  }
}

module.exports = router;
