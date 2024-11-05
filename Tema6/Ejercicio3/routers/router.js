"use strict";
const express = require("express");
const router = express.Router();

let nombre = "usuario";
let password = "1234";
let usuario_identificado = false;

function identificacionRequerida(req, res, next) {
  if (usuario_identificado) {
    next();
  } else {
    res.redirect("/");
  }
}

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/inicio", (req, res) => {
  res.render("inicio");
});

router.get("/secreto", identificacionRequerida, (req, res) => {
  res.render("plantilla", {titulo: "Secreto", cabecera: "SECRETO"});
});

router.get("/otro_secreto", identificacionRequerida, (req, res) => {
    res.render("plantilla", {titulo: "Otro secreto", cabecera: "OTRO SECRETO"});
});

router.get("/publico", (req, res) => {
    res.render("plantilla", {titulo: "Público", cabecera: "PÚBLICO"});
});

router.post("/login", (req, res) => {
  if (req.body.nombre === nombre && req.body.password === password) {
    usuario_identificado = true;
    res.redirect("/inicio");
  } else {
    usuario_identificado = false;
    res.redirect("/");
  }
});

module.exports = router;
