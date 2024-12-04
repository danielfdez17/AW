"use strict";

const DAOUsuarios = require("../db/daoUsuarios.js");
const pool = require("../db/pool.js");
const { validationResult } = require("express-validator");

const daoUsuarios = new DAOUsuarios(pool);

// Clase que controla los datos enviados de los formulario relacionados con los inicios de sesión
class LoginController {
  login(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });

    const { correoLogin, contrasenaLogin } = req.body;

    //Extraemos informacion del usuario a traves del correo
    daoUsuarios.readUsuarioPorCorreo(correoLogin, (err, usuario) => {
      if (err) next(err);

      //Comporamos contraseñas
      if (usuario && usuario.contrasena === contrasenaLogin) {
        req.session.usuario = usuario;
        req.session.auth = true;
        res.setFlash({
          message: "¡Has iniciado sesión con exito!",
          type: "exito",
        });
        if (usuario.rol === "organizador") res.redirect("/organizadores");
        else res.redirect("/asistentes");
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
