"use strict";
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const DAONotificaciones = require("../db/daoNotificaciones.js");
const DAOUsuarios = require("../db/daoUsuarios.js");
const pool = require("../db/pool.js");

const daoNotificaciones = new DAONotificaciones(pool);
const daoUsuarios = new DAOUsuarios(pool);

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


router.post("/eliminar", comprobacion, function (req, res) {
  if (!validationResult(req).isEmpty())
    return res.status(400).json({ errors: validationResult(req).array() });
  const { id } = req.body;

  daoNotificaciones.EliminarNotificaciones(id, (err, result) => {
    if (err) return next(err);
    else {
      res.setFlash({
        message: "Notificación eliminada correctamente",
        type: "exito",
      });
      res.json({ id: id });
    }
  });
});

router.post("/recordar", comprobacion, function (req, res) {
  if (!validationResult(req).isEmpty())
    return res.status(400).json({ errors: validationResult(req).array() });
  const { tiempo } = req.body;
  const id = req.session.usuario.id;

  daoUsuarios.UpdateRecordatorio({ tiempo: tiempo, id: id }, (err, result) => {
    if (err) return next(err);
    else {
      req.session.usuario.recordatorio = tiempo;
      res.setFlash({
        message: "Se ha actualizado el tiempo de recordatorio con exito",
        type: "exito",
      });
      res.json({});
    }
  });
});

module.exports = router;
