"use strict";
const path = require("path");
const { validationResult } = require("express-validator");

const servicios = [];

class ServiceController {
  crearServicio(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { nombre, descripcion, precio } = req.body;
    servicios.push({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
    });
    let nombreFichero = null;
    if (req.file.filename) {
      nombreFichero = req.file.originalname;
    }
    res.render("nuevo_servicio", {
      foto: nombreFichero,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
    });
  }
}

module.exports = ServiceController;
