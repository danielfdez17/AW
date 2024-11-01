"use strict";
const express = require("express");
const router = express.Router();
const operaciones = require("../db/operaciones.js");
const pool = require("../db/pool.js");

// Redirige directamente a productos para evitar que el usuario tenga que escribir la URL completa
router.get("/", (req, res) => {
  res.redirect("/productos");
});

// Renderiza la plantilla de productos con los productos leídos de la BD
router.get("/productos", (req, res) => {
  operaciones.leerProductos(pool, (err, productos) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { productos: productos });
    }
  });
});

// Recibe la petición POST para añadir un nuevo producto a la BD
router.post("/productos/nuevo", (req, res) => {
  const nuevo_producto = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    disponibilidad: req.body.disponibilidad,
  };

  operaciones.insertarProducto(pool, nuevo_producto, (err, nombre) => {
    if (err) console.log(err);
    else res.redirect("/productos");
  });
});

// Recibe la petición POST para desactivar un producto de la BD
router.post("/productos/eliminar", (req, res) => {
  const id_producto = req.body.productoId;
  operaciones.eliminarProducto(pool, id_producto, (err, nombre) => {
    if (err) console.log(err);
    else res.redirect("/productos");
  });
});

module.exports = router;
