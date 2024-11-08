"use strict";
const DAOUsuarios = require("../db/daoUsuarios.js");
const pool = require("../db/pool.js");
const { validationResult } = require("express-validator");

const daoUsuarios = new DAOUsuarios(pool);

class LoginController {
  login(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const { nombre, contrasena } = req.body;
    daoUsuarios.readUsuario(nombre, (err, usuario) => {
      if (err) next(err);
      if (usuario.contrasena === contrasena) {
        req.session.idUsuario = usuario.id;
        req.session.rol = usuario.rol;
        res.end();
      } else {
        res.status(401).send("Error: usuario y/o contraseña incorrectos");
      }
    });
  }
}

module.exports = LoginController;
