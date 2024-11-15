"use strict";
const express = require("express");
const router = express.Router();

const DAOFacultades = require("../db/daoFacultades.js");
const DAOEventos = require("../db/daoEventos.js");
const DAOInscripciones = require("../db/daoInscripciones.js");
const DAOListaNegra = require("../db/daolListaNegra.js");
const pool = require("../db/pool.js");

const daoFacultades = new DAOFacultades(pool);
const daoEventos = new DAOEventos(pool);
const daoInscripciones = new DAOInscripciones(pool);

router.get("/", (req, res) => {
  daoFacultades.readAllFacultades((facultades) => {
    daoEventos.readAllEventos((eventos) => {
      daoInscripciones.readEventosInscritosPorAsistente(
        req.session.usuario.id,
        (eventosInscritos) => {
          res.render("asistentes", {
            eventos: eventos,
            usuario: req.session.usuario,
            facultades: facultades,
            eventosInscritos: eventosInscritos,
          });
        }
      );
    });
  });
});

module.exports = router;
