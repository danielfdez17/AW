"use strict";
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const DAOFacultades = require("../db/daoFacultades.js");
const DAOListaNegra = require("../db/daolListaNegra.js");
const DAOInscripciones = require("../db/daoInscripciones.js");
const DAOEventos = require("../db/daoEventos.js");
const pool = require("../db/pool.js");

const EventosController = require("../controllers/eventos.js");
const eventosController = new EventosController();

const daoFacultades = new DAOFacultades(pool);
const daoEventos = new DAOEventos(pool);
const daoInscripciones = new DAOInscripciones(pool);
const daoListaNegra = new DAOListaNegra(pool);

router.get("/", (req, res) => {
  daoFacultades.readAllFacultades((facultades) => {
    daoEventos.readAllEventos((eventos) => {
      res.render("index", {
        eventos: eventos,
        usuario: req.session.usuario,
        facultades: facultades,
      });
    });
  });
});

router.get("/lista_espera/:ident", (req, res) => {
  const ident = req.params.ident;
  console.log(`Id del evento: ${ident}`);
  daoEventos.readEventoPorId(ident, (evento) => {
    daoFacultades.readAllFacultades((facultades) => {
      daoEventos.readAllEventos((eventos) => {
        daoInscripciones.readListaEsperaPorEvento(ident, (lista) => {
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
        daoInscripciones.readListaAsistentesPorEvento(ident, (lista) => {
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

router.get("/nuevo_evento", (req, res) => {
  res.render("nuevo_evento");
});

//Middleware comprobacion
const comprobacion = [
  body("*")
    .matches(/^[a-zA-Z0-9_@.:/áéíóúÁÉÍÓÚ\-\s]*$/)
    .withMessage("Caracteres no permitidos")
    .custom((value) => {
      const sqlKeywords = [
        "SELECT",
        "INSERT",
        "DROP",
        "DELETE",
        "UPDATE",
        "UNION",
        "ALTER",
        "TRUNCATE",
        "CREATE",
        "--",
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
