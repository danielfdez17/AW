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
      capacidad_maxima_string,
      tipo_evento,
    } = req.body;
    const id_organizador = req.session.usuario.id;
    const capacidad_maxima = parseInt(capacidad_maxima_string);
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
        else res.redirect("/organizadores")
        
      }
    );
  }

  eliminarEvento(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const {id} = req.body;
    daoEventos.deleteEvento(id,
      (err) => {
        if (err) next(err);
        else res.redirect("/organizadores")
      }
    );
  }

  editarEvento(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const {
      titulo,
      descripcion,
      fecha,
      hora,
      ubicacion,
      capacidad_maxima_string,
      tipo_evento,
      id,
    } = req.body;
    const capacidad_maxima = parseInt(capacidad_maxima_string);
    daoEventos.updateEvento(
      {
        titulo,
        descripcion,
        fecha,
        hora,
        ubicacion,
        capacidad_maxima,
        tipo_evento,
        id,
      },
      (err) => {
        if (err) next(err);
        res.redirect("/organizadores")
      }
    );
  }
}

module.exports = EventosController;
