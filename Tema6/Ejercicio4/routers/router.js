"use strict";
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("sumando1");
});

router.post("/primer_sumando", (req, res) => {
  // * Guardar el valor en las cookies
  console.log(req.body.primer_sumando);
  res.cookie("sumando1", req.body.primer_sumando, { maxAge: 86400000 });
  res.render("sumando2");
});

router.get("/sumando2", (req, res) => {
  res.render("sumando2");
});

router.post("/segundo_sumando", (req, res) => {
  // * Recuperar el valor del primer sumando y sumarlo con el segundo
  console.log(req.body.segundo_sumando);
  res.cookie("sumando2", req.body.segundo_sumando, { maxAge: 86400000 });
  res.redirect("/resultado");
  //   const sum1 = 54;
  //   const sum2 = 56;
  //   res.render("resultado", {
  //     sumando1: sum1,
  //     sumando2: sum2,
  //     resultado: sum1 + sum2,
  //   });
});

router.get("/resultado", (req, res) => {
  const sum1 = Number(req.cookies.sumando1);
  const sum2 = Number(req.cookies.sumando2);
  console.log(req.get("Cookie"));
  res.clearCookie("sumando1");
  res.clearCookie("sumando2");
  console.log(req.get("Cookie"));
  res.render("resultado", {
    sumando1: sum1,
    sumando2: sum2,
    resultado: sum1 + sum2,
  });
});

module.exports = router;
