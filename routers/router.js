"use strict";
const express = require("express");
const router = express.Router();
const operaciones = require("../db/operaciones.js");

router.get("/", (req, res) => {
  res.redirect("/productos");
});

// Envía el archivo estático para mostrar la calculadora
router.get("/productos", (req, res) => {
  res.render("index", {
    productos: [
      {
        nombre: "Producto 1",
        precio: 15.3,
        fecha_registro: "31/10/2024",
        disponible: 1,
        activo: 1,
      },
    ],
  });
  //   operaciones.leerProductos(pool, (err, productos) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.render("index", { productos: productos });
  //     }
  //   });
});

// Recibe la petición del formulario para realizar la operación ingresada por el usuario
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

router.post("/productos/eliminar", (req, res) => {
  const id_producto = req.body.productoId;
  operaciones.eliminarProducto(pool, id_producto, (err, nombre) => {
    if (err) console.log(err);
    else res.redirect("/productos");
  });
});

module.exports = router;
