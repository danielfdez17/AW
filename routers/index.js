"use strict";

const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/logIn.js");
const loginController = new LoginController();

const SignUpController = require("../controllers/signUp.js");
const signUpController = new SignUpController();

// Propuesta  para recoger info de render
const DAOFacultades = require("../db/daoFacultades.js");
const pool = require("../db/pool.js");

const evento = {
  titulo: "Inteligencia Artificial",
  descripcion:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  fecha: "02/12/2024",
  hora: "11:30",
  capacidad: "15/20",
  ubicacion: "Facultad de Informática",
  tipoEvento: "Conferencia",
};

const daoFacultades = new DAOFacultades(pool);


// Redirige directamente a productos para evitar que el usuario tenga que escribir la URL completa
router.get("/",  (req, res) =>  {

  daoFacultades.readAllFacultades(facultades =>
  {
    res.render("index", {
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      capacidad: evento.capacidad,
      ubicacion: evento.ubicacion,
      tipoEvento: evento.tipoEvento,
      facultades: facultades
    });
  });

});


router.post("/signUp", signUpController.SignUp);
router.post("/logIn", loginController.login);

module.exports = router;
