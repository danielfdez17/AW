"use strict";
const DAOUsuarios = require("../db/daoUsuarios.js");
const pool = require("../db/pool.js");
const { validationResult } = require("express-validator");

const daoUsuarios = new DAOUsuarios(pool);

class LoginController {
  login(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const { correo, contrasena } = req.body;
    daoUsuarios.readUsuarioPorCorreo(correo, (err, usuario) => {
      if (err) next(err);
      if (usuario.contrasena === contrasena) {
        req.session.usuario = usuario;
        req.session.auth = true;
        if(usuario.rol === "organizador")
          res.redirect("/organizadores");
        else
          res.redirect("/asistentes");
        
      } else {
        res.status(401).send("Error: correo y/o contraseña incorrectos");
      }
    });
  }
}

module.exports = LoginController;
