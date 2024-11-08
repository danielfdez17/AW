"use strict";

const DAOUsuarios = require("../db/daoUsuarios.js");
const pool = require("../db/pool.js");
const { validationResult } = require("express-validator");

const daoUsuarios = new DAOUsuarios(pool);

class SignUpController {
  SignUp(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const usuario = req.body;
    daoUsuarios.createUsuario(usuario, (err, usuario) => {
      if (err) next(err);
      else {
        req.session.usuario = usuario;
        req.session.auth = true;
        res.redirect("/");
      }
    });
  }
}

module.exports = SignUpController;
