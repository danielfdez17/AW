"use strict";

const DAOUsuarios = require("../db/daoUsuarios.js");
const pool = require("../db/pool.js");
const { validationResult } = require("express-validator");

const daoUsuarios = new DAOUsuarios(pool);

class SignUpController {
  SignUp(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });

    let usuario = req.body;
    if (req.file)
      usuario.imagen = req.file.buffer ;
    else
      usuario.imagen = null;

    daoUsuarios.createUsuario(usuario, (err, usuario) => {
      if (err) next(err);
      else {
        req.session.usuario = usuario;
        req.session.auth = true;
        if(usuario.rol === "organizador")
          res.redirect("/organizadores");
        else
          res.redirect("/asistentes");
      }
    });
  }
}

module.exports = SignUpController;
