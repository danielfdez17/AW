"use strict";
const pool = require("../db/pool.js");
const DAOEventos = require("../db/daoEventos.js");
const daoEventos = new DAOEventos(pool);

const { validationResult } = require("express-validator");

class EventosController {
  crearEvento(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const {
      titulo,
      descripcion,
      fecha,
      hora,
      ubicacion,
      capacidad_maxima,
      tipo_evento,
    } = req.body;
    const id_organizador = req.session.usuario.id;
    daoEventos.createEvento(
      {
        titulo,
        descripcion,
        fecha,
        hora,
        ubicacion,
        capacidad_maxima,
        tipo_evento,
        id_organizador,
      },
      (err) => {
        if (err) next(err);
        res.render("index");
      }
    );
  }
}

module.exports = EventosController;
