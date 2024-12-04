"use strict";
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { identificacionRequerida } = require("./identificacionRequerida.js");

const DAOEventos = require("../db/daoEventos.js");
const DAOComentarios = require("../db/daoComentarios.js");
const DAOListaNegra = require("../db/daolListaNegra.js");

const pool = require("../db/pool.js");

const daoEventos = new DAOEventos(pool);
const daoComentarios = new DAOComentarios(pool);
const daoListaNegra = new DAOListaNegra(pool);

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
        if (err) return next(err);
        else {
          res.status(401).json({ errores: errorDetails });
        }
      });
    } else next();
  },
];


router.get("/:id_evento", identificacionRequerida, (req, res) => {
  const { id_evento } = req.params;
  daoEventos.readEventoPorId(id_evento, (err, evento) => {
    if (err) return next(err);

    daoComentarios.readComentarios(req.session.usuario.id, id_evento, (err, comentarios) => {
      if (err) return next(err);

      res.render("comentarios", {
        usuario: req.session.usuario,
        evento: evento,
        comentarios: comentarios,
      });
    });
  });
});

router.post("/:id_evento/nuevo_comentario", comprobacion, (req, res) => {
  if (!validationResult(req).isEmpty())
    return res.status(400).json({ errors: validationResult(req).array() });
  const id_usuario = req.session.usuario.id;
  const { id_evento } = req.params;
  const { comentario, valoracion } = req.body;
  daoComentarios.createComentario(
    { id_usuario, id_evento, comentario, valoracion },
    (err) => {
      if (err) return next(err);
      else{
        res.setFlash({
          message: "Se ha añadido el comentario con exito",
          type: "exito",
        });
      }
      res.redirect(`/comentarios/${id_evento}`);

    }
  );
});

module.exports = router;
