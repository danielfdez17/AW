"use strict";
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const DAOFacultades = require("../db/daoFacultades.js");
const DAOEventos = require("../db/daoEventos.js");
const DAOInscripciones = require("../db/daoInscripciones.js");
const DAONotificaciones = require("../db/daoNotificaciones.js");
const DAOAccesibilidad = require("../db/daoAccesibilidad.js");
const pool = require("../db/pool.js");

const daoFacultades = new DAOFacultades(pool);
const daoEventos = new DAOEventos(pool);
const daoInscripciones = new DAOInscripciones(pool);
const daoNotificaciones = new DAONotificaciones(pool);
const daoAccesibilidad = new DAOAccesibilidad(pool);

const InscripcionesController = require("../controllers/inscripciones.js");
const inscripcionesController = new InscripcionesController();

router.get("/", (req, res) => {

  if (!req.session.auth || req.session.usuario.rol !== 'asistente')
    res.redirect("/");
  else
  {
    daoFacultades.readAllFacultades((err, facultades) => {
      if (err) next(err);
      daoEventos.readAllEventos((err, eventos) => {
        if (err) next(err);

        daoInscripciones.readEventosInscritosPorAsistenteActivos(
          req.session.usuario.id,
          (err, eventosInscritos) => {
            if (err) next(err);

            daoNotificaciones.readNotificacionesPorUsuario(req.session.usuario.id, (err, notificaciones) =>
            {
              if (err) next(err);

              daoAccesibilidad.readPreferencias(req.session.usuario.id, (err, accesibilidad) =>
              {
                if (err) next(err);
                
                res.render("index", {
                  eventos: eventos,
                  usuario: req.session.usuario,
                  facultades: facultades,
                  eventosInscritos: eventosInscritos,
                  notificaciones: notificaciones = notificaciones && notificaciones.length ? notificaciones : null,
                  accesibilidad: accesibilidad,
                });
              });


            });
  
          }
        );
      });
    });
  }


});

const comprobacion = [
  body("*")
    .customSanitizer((value) => value.normalize("NFC"))
    .matches(/^[a-zA-Z0-9_@ñ.:/áéíóúÁÉÍÓÚ\-\s]*$/)
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
