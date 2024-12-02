"use strict";

const DAOUsuarios = require("../db/daoUsuarios.js");
const pool = require("../db/pool.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const daoUsuarios = new DAOUsuarios(pool);

class LoginController {
  login(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const { correoLogin, contrasenaLogin } = req.body;
    daoUsuarios.readUsuarioPorCorreo(correoLogin, (err, usuario) => {
      if (err) next(err);
      if (usuario) {
        bcrypt.hash(contrasenaLogin, 10, (err, hash) => {
          if (err) next(err);
          else {
            console.log(contrasenaLogin);
            console.log(hash);
            console.log(usuario.contrasena);
            bcrypt.compare(hash, usuario.contrasena, (err, result) => {
              if (err) next(err);
              else {
                if (result) {
                  console.log(hash, " ", usuario.contrasena);
                  req.session.usuario = usuario;
                  req.session.auth = true;
                  res.setFlash({
                    message: "¡Has iniciado sesión con exito!",
                    type: "exito",
                  });
                  if (usuario.rol === "organizador")
                    res.redirect("/organizadores");
                  else res.redirect("/asistentes");
                } else {
                  res.setFlash({
                    message: "Error: correo y/o contraseña incorrectos",
                    type: "error",
                  });
                  res.redirect("/");
                }
              }
            });
          }
        });
      } else {
        res.setFlash({
          message: "Error: correo y/o contraseña incorrectos",
          type: "error",
        });
        res.redirect("/");
      }
    });
  }
}

module.exports = LoginController;
