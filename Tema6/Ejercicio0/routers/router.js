"use strict";
const express = require("express");
const router = express.Router();
const usuarios = [
  {
    nombre: "Carmen San Juan",
    numero: 8976,
  },
  {
    nombre: "Adrián Lucas",
    numero: 8977,
  },
  {
    nombre: "Natalia Rodríguez",
    numero: 8978,
  },
];

router.get("/", (req, res) => {
  res.render("usuarios", { usuarios: usuarios });
});

router.get("/")

module.exports = router;
