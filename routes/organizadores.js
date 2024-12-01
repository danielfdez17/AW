"use strict";
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const path = require("path");

const DAOFacultades = require("../db/daoFacultades.js");
const DAOListaNegra = require("../db/daolListaNegra.js");
const DAOInscripciones = require("../db/daoInscripciones.js");
const DAOEventos = require("../db/daoEventos.js");
const DAOAccesibilidad = require("../db/daoAccesibilidad.js");
const pool = require("../db/pool.js");

const EventosController = require("../controllers/eventos.js");
const eventosController = new EventosController();

const daoFacultades = new DAOFacultades(pool);
const daoEventos = new DAOEventos(pool);
const daoInscripciones = new DAOInscripciones(pool);
const daoListaNegra = new DAOListaNegra(pool);
const daoAccesibilidad = new DAOAccesibilidad(pool);

router.get("/", (req, res) => {
  if (!req.session.auth)
    res.redirect("/");
  else
  {
    daoFacultades.readAllFacultades((facultades) => {
      daoEventos.readAllEventos((eventos) => {
        daoAccesibilidad.readPreferencias(req.session.usuario.id, (preferencias => {
            console.log(preferencias);
            res.render("index", {
                eventos: eventos,
                usuario: req.session.usuario,
                facultades: facultades,
                eventosInscritos: null,
                notificaciones: null,
                preferencias: preferencias
            });
        }))
      });
    });
  }


});

router.get("/lista_espera/:ident", (req, res) => {
  const ident = req.params.ident;
  console.log(`Id del evento: ${ident}`);
  daoEventos.readEventoPorId(ident, (evento) => {
    daoFacultades.readAllFacultades((facultades) => {
      daoEventos.readAllEventos((eventos) => {
        daoInscripciones.readUsuarioListaEsperaPorEvento(ident, (lista) => {
          res.render("lista_espera", {
            ident: ident,
            usuario: req.session.usuario,
            facultades: facultades,
            evento: evento,
            eventos: eventos,
            lista: lista,
          });
        });
      });
    });
  });
});

router.get("/lista_asistentes/:ident", (req, res) => {
  const ident = req.params.ident;
  console.log(`Id del evento: ${ident}`);
  daoEventos.readEventoPorId(ident, (evento) => {
    daoFacultades.readAllFacultades((facultades) => {
      daoEventos.readAllEventos((eventos) => {
        daoInscripciones.readUsuarioListaAsistentesPorEvento(ident, (lista) => {
          res.render("lista_asistentes", {
            ident: ident,
            usuario: req.session.usuario,
            facultades: facultades,
            evento: evento,
            eventos: eventos,
            lista: lista,
            notificaciones: null
          });
        });
      });
    });
  });
});

router.get("/nuevo_evento", (req, res) => {
  res.render("nuevo_evento");
});

//Middleware comprobacion
const comprobacion = [
  body("*")
    .customSanitizer((value) => value.normalize("NFC"))
    .matches(/^[a-zA-Z0-9_@.:/áéíóúÁÉÍÓÚ\-\s]*$/)
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

router.post("/nuevo_evento", comprobacion, eventosController.crearEvento);
router.post("/eliminar_evento", comprobacion, eventosController.eliminarEvento);
router.post("/editar_evento", comprobacion, eventosController.editarEvento);

module.exports = router;
