"use strict";
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const path = require("path");
const multer = require("multer");
const ServiceController = require("../controllers/ServiceController.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const multerFactory = multer({
  storage: storage,
});

const serviceController = new ServiceController();

router.get("/", (req, res) => {
  res.render("ajax");
});

router.get("/multiplica/:num", (req, res) => {
  let numero = Number(req.params.num);
  res.json({ resultado: parseInt(numero * 2) });
//   if (isNaN(numero) && numero >= 0) {
//   } else {
//     res.status(400);
//     res.json({ resultado: parseInt(numero * 2) });
//     res.end();
//   }
});

const servicios = [];

router.post(
  "/nuevo_servicio",
  multerFactory.single("foto"),
  check("nombre").notEmpty().withMessage("Nombre del servicio vacío"),
  check("nombre")
    .isLength({ min: 3 })
    .withMessage("El nombre del servicio debe tener al menos 3 caracteres"),
  check("precio")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser mayor que 0€"),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { nombre, descripcion, precio } = req.body;
    let nombreFichero = null;
    if (req.file) {
      console.log(`Nombre del fichero: ${req.file.originalname}`);
      console.log(`Fichero guardado en: ${req.file.path}`);
      console.log(`Tamaño: ${req.file.size}`);
      console.log(`Tipo de fichero: ${req.file.mimetype}`);
      nombreFichero = req.file.buffer;
    }
    servicios.push({
      foto: nombreFichero,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
    });
    res.render("nuevo_servicio", {
      foto: nombreFichero,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
    });
  }
);

router.get("/servicios", (req, res, next) => {
  res.render("servicios", { servicios: servicios });
});

router.get("/imagen/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", req.params.id));
});

module.exports = router;
