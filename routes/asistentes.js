"use strict";
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const DAOFacultades = require("../db/daoFacultades.js");
const DAOEventos = require("../db/daoEventos.js");
const DAOInscripciones = require("../db/daoInscripciones.js");
const DAONotificaciones = require("../db/daoNotificaciones.js");
const pool = require("../db/pool.js");

const daoFacultades = new DAOFacultades(pool);
const daoEventos = new DAOEventos(pool);
const daoInscripciones = new DAOInscripciones(pool);
const daoNotificaciones = new DAONotificaciones(pool);

const InscripcionesController = require("../controllers/inscripciones.js");
const inscripcionesController = new InscripcionesController();

router.get("/", (req, res) => {
  daoFacultades.readAllFacultades((facultades) => {
    daoEventos.readAllEventos((eventos) => {
      daoInscripciones.readEventosInscritosPorAsistenteActivos(
        req.session.usuario.id,
        (eventosInscritos) => {

          daoNotificaciones.readNotificacionesPorUsuario(req.session.usuario.id, (notificaciones) =>
          {
            res.render("index", {
              eventos: eventos,
              usuario: req.session.usuario,
              facultades: facultades,
              eventosInscritos: eventosInscritos,
              notificaciones: notificaciones
            });
          });

        }
      );
    });
  });
});

const comprobacion = [
  body("*")
    .matches(/^[a-zA-Z0-9_@.:/áéíóúÁÉÍÓÚ\-]*$/)
    .withMessage("Caracteres no permitidos")
    .custom((value) => {
      const sqlKeywords = [
        "SELECT",
        "INSERT",
        "CREATE",
        "DELETE",
        "UPDATE",
        "DROP",
        "UNION",
        "ALTER",
        "TRUNCATE",
        "--",
        "AND",
        "OR",
        "LIKE",
        "BETWEEN"
      ];
      if (
        sqlKeywords.some((keyword) => value.toUpperCase().includes(keyword))
      ) {
        throw new Error("Uso de palabras reservadas no permitido");
      }
      return true;
    }),

  // Maneja los resultados de la validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { ip } = req;

      // Construir mensajes personalizados
      const errorDetails = errors.array().map((error) => ({
        campo: error.param,
        valorErroneo: error.value,
        mensaje: error.msg,
      }));

      daoListaNegra.createListaNegra(ip, (err) => {
        if (err) next(err);
        else {
          res.status(401).json({ errores: errorDetails });
        }
      });
    } else next();
  },
];

router.post(
  "/inscribir_evento",
  comprobacion,
  inscripcionesController.inscribirEvento
);

router.post(
  "/anular_evento",
  comprobacion,
  inscripcionesController.anularEvento
);

module.exports = router;
