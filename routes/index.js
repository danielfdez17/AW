"use strict";
const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const BAD_REQ = 400;

const servicios = [];

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const multerFactory = multer({
  storage: storage,
  limits: {
    // 50 KB
    fileSize: 1024 * 50,
  },
});

router.get("/", (req, res) => {
  res.render("index");
});

router.post(
  "/nuevo_servicio",
  multerFactory.single("foto"),
  check("nombre")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),
  check("precio")
    .isFloat({ min: 0.1 })
    .withMessage("El precio debe ser un numero mayor a 0 (> 0.1)"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(BAD_REQ).json({ errors: errors.mapped() });
    }
    const { nombre, desc, precio } = req.body;

    var nombreFichero = null,
      destination = null;
    if (req.file) {
      nombreFichero = req.file.filename;
      destination = req.file.destination;
    }
    console.log(nombreFichero);
    console.log(destination);

    servicios.push({
      foto: nombreFichero,
      nombre: nombre,
      desc: desc,
      precio: precio,
    });

    res.render("nuevo_servicio", {
      foto: nombreFichero,
      destination: destination,
      nombre: nombre,
      desc: desc,
      precio: precio,
    });
  }
);

router.get("/servicios", (req, res) => {
  res.render("servicios", { servicios: servicios });
});

module.exports = router;
