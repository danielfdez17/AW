"use strict";
const express = require("express");
const router = express.Router();

let usuarios = [
  { id: 1, nombre: "Javier Montoro", activo: true },
  { id: 2, nombre: "Dolores Vega", activo: true },
  { id: 3, nombre: "Beatriz Nito", activo: true },
];

router.get("/", (req, res) => {
  res.render("usuarios", { usuarios: usuarios });
});

router.get("/borrar/:id", (req, res) => {
  // res.render("borrar", { id: req.params.id });
  const id = req.params.id;
  //   console.log(`Borrando en usuario con id: ${id}`);
  usuarios[id - 1].activo = false;
  res.redirect("/");
});

router.post("/borrar", (req, res) => {
  // console.log(`Borrar usuario con id: ${req.body.id}`)
  //   res.render("borrar", { id: req.body.id });
  const id = req.body.id;
  usuarios[id - 1].activo = false;
  res.redirect("/");
});

module.exports = router;
