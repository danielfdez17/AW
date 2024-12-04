"use strict";
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const DAOEventos = require("../db/daoEventos.js");
const DAOComentarios = require("../db/daoComentarios.js");
const DAOListaNegra = require("../db/daolListaNegra.js");

const pool = require("../db/pool.js");

const daoEventos = new DAOEventos(pool);
const daoComentarios = new DAOComentarios(pool);
const daoListaNegra = new DAOListaNegra(pool);

// router.get("/comentarios", (req, res) => {
//   res.redirect(`/comentarios/${req.params.id}`);
// });

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
        "BETWEEN",
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  daoEventos.readEventoPorId(id, (evento) => {
    daoComentarios.readComentarios(req.session.id, id, (comentarios) => {
      res.render("comentarios", {
        usuario: req.session.usuario,
        evento: evento,
        comentarios: comentarios,
      });
    });
  });
});

router.post("/:id/nuevo_comentario", comprobacion, (req, res) => {
  const id_usuario = req.session.usuario.id;
  const { id } = req.params;
  const { comentario, valoracion } = req.body;
  console.log(`id_usuario: ${id_usuario}`);
  console.log(`id: ${id}`);
  console.log(`Comentario: ${comentario}`);
  console.log(`valoracion: ${valoracion}`);
  daoComentarios.createComentario(
    { id_usuario, id, comentario, valoracion },
    (err) => {
      if (!err) {
        res.setFlash({
          message: "Se ha añadido el comentario con exito",
          type: "exito",
        });
      } else {
        res.setFlash({
          message: "Error al añadir el comentario",
          type: "error",
        });
      }
      res.redirect(`/comentarios/${id}`);
      //   daoEventos.readEventoPorId(id, (evento) => {
      //     daoComentarios.readComentarios(req.session.id, id, (comentarios) => {
      //       res.render("comentarios", {
      //         usuario: req.session.usuario,
      //         evento: evento,
      //         comentarios: comentarios,
      //       });
      //     });
      //   });
    }
  );
});

module.exports = router;
