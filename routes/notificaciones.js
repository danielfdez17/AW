"use strict";
const express = require("express");
const router = express.Router();

const DAONotificaciones = require("../db/daoNotificaciones.js");
const pool = require("../db/pool.js");

const daoNotificaciones = new DAONotificaciones(pool);

router.post("/eliminar", function (req, res) {

    const {id} = req.body;
  
    daoNotificaciones.EliminarNotificaciones(id, (err, result) => {
      if (err) {
        if (err === "No existe") {
          return res.status(404).send("No encontrado");
        }
        return res.status(500).send("Error en el servidor");
      }
      else
      {
        res.redirect("/")
      }
    });
});

module.exports = router;