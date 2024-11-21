"use strict";
const pool = require("../db/pool.js");
const DAOEventos = require("../db/daoEventos.js");
const daoEventos = new DAOEventos(pool);

const { validationResult } = require("express-validator");

const MIN_DURACION = "01:00";
const MAX_DURACION = "08:00";
const HORA_INICIO = "08:00";
const HORA_FIN = "22:00";

function checkHoraDuracion(hora, duracion) {
  return (
    HORA_INICIO <= hora &&
    hora < HORA_FIN &&
    MIN_DURACION <= duracion &&
    duracion <= MAX_DURACION
  );
}

class EventosController {
  crearEvento(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const {
      titulo,
      descripcion,
      fecha,
      hora,
      duracion,
      ubicacion,
      capacidad_maxima_string,
      tipo_evento,
    } = req.body;
    const id_organizador = req.session.usuario.id;
    const capacidad_maxima = parseInt(capacidad_maxima_string);
    daoEventos.readEventoPorFecha(fecha, (eventos) => {
      let sePuedeInsertar = true;
      eventos.forEach((evento) => {
        if (evento.hora + evento.duracion >= hora) sePuedeInsertar = false;
      });
      if (sePuedeInsertar) {
        daoEventos.createEvento(
          {
            titulo,
            descripcion,
            fecha,
            hora,
            duracion,
            ubicacion,
            capacidad_maxima,
            tipo_evento,
            id_organizador,
          },
          (err) => {
            if (err) next(err);
            else res.redirect("/organizadores");
          }
        );
      } else {
        res.redirect("/organizadores");
      }
    });
  }

  eliminarEvento(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const { id } = req.body;
    daoEventos.deleteEvento(id, (err) => {
      if (err) next(err);
      else res.redirect("/organizadores");
    });
  }

  editarEvento(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const {
      titulo,
      descripcion,
      fecha,
      hora,
      duracion,
      ubicacion,
      capacidad_maxima_string,
      tipo_evento,
      id,
    } = req.body;
    const capacidad_maxima = parseInt(capacidad_maxima_string);
    if (checkHoraDuracion(hora, duracion)) {
      daoEventos.readEventoPorFecha(fecha, (eventos) => {
        let sePuedeActualizar = true;
        eventos.forEach((evento) => {
          if (evento.hora + evento.duracion >= hora) sePuedeActualizar = false;
        });
        if (sePuedeActualizar) {
          daoEventos.updateEvento(
            {
              titulo,
              descripcion,
              fecha,
              hora,
              duracion,
              ubicacion,
              capacidad_maxima,
              tipo_evento,
              id,
            },
            (err) => {
              if (err) next(err);
              res.redirect("/organizadores");
            }
          );
        } else {
          res.redirect("/organizadores");
        }
      });
    }
  }
}

module.exports = EventosController;
