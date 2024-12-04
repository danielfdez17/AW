"use strict";
const DAOUsuarios = require("../db/daoUsuarios.js");
const pool = require("../db/pool.js");
const { validationResult } = require("express-validator");

const daoUsuarios = new DAOUsuarios(pool);

// Clase que controla los datos enviados de los formulario relacionados con los perfiles de los usuarios
class EditProfileController {
  edit(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    let usuario = req.body;
    if (req.file) usuario.imagen = req.file.buffer;
    else usuario.imagen = null;

    daoUsuarios.updateUsuario(usuario, (err, usuario) => {
      if (err) next(err);
      else {
        let rol = req.session.usuario.rol;
        req.session.usuario = usuario;
        req.session.usuario.rol = rol;
        res.setFlash({
          message: "¡Se ha editado el perfil con exito!",
          type: "exito",
        });
        res.json({ rol: rol });
      }
    });
  }
}

module.exports = EditProfileController;
