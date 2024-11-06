"use strict";
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("sumando1");
});

router.post("/primer_sumando", (req, res) => {
  // * Guardar el valor en las cookies
  res.render("sumando2");
});

router.get("/sumando2", (req, res) => {
  res.render("sumando2");
});

router.post("/segundo_sumando", (req, res) => {
  // * Recuperar el valor del primer sumando y sumarlo con el segundo
  
  const sum1 = 54;
  const sum2 = 56;
  res.render("resultado", {
    sumando1: sum1,
    sumando2: sum2,
    resultado: sum1 + sum2,
  });
});

// router.get("/resultado", (req, res) => {
//   const sum1 = 54;
//   const sum2 = 56;
//   res.render("resultado", {
//     sumando1: sum1,
//     sumando2: sum2,
//     resultado: sum1 + sum2,
//   });
// });

module.exports = router;
