"use strict";
const express = require("express");
const path = require("path");
const multer = require("multer");
const { body, validationResult, check } = require("express-validator");
const router = express.Router();
const multerFactory = multer({ dest: path.join(__dirname, "uploads") });

let servicios = [];
let listaNegra = [];

router.get("/", (req, res) => {
  res.render("index");
});

function validarFormulario() {
  check("nombre", "El nombre del servicio no puede ser vacío")
    .notEmpty()
    .isLength({ min: 3 });
  check("precio", "El precio del servicio debe ser mayor a 0").isNumeric({
    min: 0,
  });
}

const comprobacion = [
  body("*")
    .matches(/^[a-zA-Z0-9_@.:/áéíóúÁÉÍÓÚ\-]*$/)
    .withMessage("Caracteres no permitidos")
    .custom((value) => {
      const sqlKeywords = [
        "SELECT",
        "INSERT",
        "DROP",
        "DELETE",
        "UPDATE",
        "UNION",
        "ALTER",
        "TRUNCATE",
        "CREATE",
        "--",
      ];
      if (
        sqlKeywords.some((keyword) => value.toUpperCase().includes(keyword))
      ) {
        throw new Error("Uso de palabras reservadas no permitido");
      }
      return true;
    }),

  // Maneja los resultados de la validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { ip } = req;

      // Construir mensajes personalizados
      const errorDetails = errors.array().map((error) => ({
        campo: error.param,
        valorErroneo: error.value,
        mensaje: error.msg,
      }));

      listaNegra.pust(ip);
    } else next();
  },
];

router.post(
  "/nuevo_servicio",
  comprobacion,
  multerFactory.single("foto"),
  (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    let nombreImagen = null;
    if (req.file.filename) {
      nombreImagen = req.file.originalname;
    }
    servicios.push({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      foto: nombreImagen,
    });
    res.render("nuevo_servicio", {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      foto: nombreImagen,
    });
  }
);

router.get("/servicios", (req, res) => {
  res.render("servicios", { servicios: servicios });
});

module.exports = router;
