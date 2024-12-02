"use strict";
const express = require("express");
const router = express.Router();

const DAONotificaciones = require("../db/daoNotificaciones.js");
const DAOUsuarios = require("../db/daoUsuarios.js");
const pool = require("../db/pool.js");

const daoNotificaciones = new DAONotificaciones(pool);
const daoUsuarios= new DAOUsuarios(pool);

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
        res.setFlash({ message: "Notificación eliminada correctamente", type: "exito" });
        res.json({id: id})
      }
    });
});

router.post("/recordar", function (req, res) {

  const {tiempo} = req.body;
  const id = req.session.usuario.id;

  daoUsuarios.UpdateRecordatorio({tiempo: tiempo, id: id}, (err, result) => {
    if (err) {
      if (err === "No existe") {
        return res.status(404).send("No encontrado");
      }
      return res.status(500).send("Error en el servidor");
    }
    else
    {
      req.session.usuario.recordatorio = tiempo;
      res.setFlash({ message: "Se ha actualizado el tiempo de recordatorio con exito", type: "exito" });
      res.json({})
    }
  });
});

module.exports = router;