"use strict";
const pool = require("../db/pool.js");
const DAOInscripciones = require("../db/daoInscripciones.js");
const DAOEventos = require("../db/daoEventos.js");

const daoInscripciones = new DAOInscripciones(pool);
const daoEventos = new DAOEventos(pool);

class InscripcionesController {
  inscribirse(req, res, next) {
    const evento = req.body.evento;
    daoInscripciones.readTotalAsistentesAEvento(evento.id, (inscripciones) => {
      inscripciones.forEach((inscripcion) => {
        if (inscripcion.id_usuario === req.session.usuario.id) {
          res.status(500).json({
            error: "No te puedes inscribir al evento porque ya está inscrito",
          });
        } else {
          res.redirect("/");
        }
      });
    });
  }
}

module.exports = InscripcionesController;
