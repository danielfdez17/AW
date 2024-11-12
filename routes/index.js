"use strict;";

const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/logIn.js");
const loginController = new LoginController();

const SignUpController = require("../controllers/signUp.js");
const signUpController = new SignUpController();

const InscripcionesController = require("../controllers/inscripciones.js");
const inscripcionesController = new InscripcionesController();

const EventosController = require("../controllers/eventos.js")
const eventosController = new EventosController();

// Propuesta  para recoger info de render
const DAOFacultades = require("../db/daoFacultades.js");
const DAOEventos = require("../db/daoEventos.js");
const DAOInscripciones = require("../db/daoInscripciones.js");
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
const daoEventos = new DAOEventos(pool);
const daoInscripciones = new DAOInscripciones(pool);

router.get("/", (req, res) => {
  if (req.session.auth) {
    daoEventos.readAllEventos((eventos) => {
      if (req.session.usuario.rol === "asistente") {
        daoInscripciones.readEventosInscritosPorAsistente(
          req.session.usuario.id,
          (eventosInscritos) => {
            res.render("index", {
              eventos: eventos,
              eventosInscritos: eventosInscritos,
              usuario: req.session.usuario,
            });
          }
        );
      } else {
        res.render("index", {
          eventos: eventos,
          usuario: req.session.usuario,
        });
      }
    });
  } else {
    daoFacultades.readAllFacultades((facultades) => {
      daoEventos.readAllEventos((eventos) => {
        res.render("index", {
          eventos: eventos,
          usuario: null,
          facultades: facultades,
        });
      });
    });
  }
});

router.get("/logOut", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(createError(err)); // Maneja el error si ocurre al destruir la sesión
    } else {
      res.clearCookie("connect.sid"); // Limpia la cookie de sesión
      res.redirect("/"); // Redirige al usuario a la página principal
    }
  });
});

router.get("/nuevo_evento", (req, res) => {
  res.render("nuevo_evento");
});

router.post("/signUp", signUpController.SignUp);
router.post("/login", loginController.login);
router.post("/inscribirse", inscripcionesController.inscribirse);
router.post("/nuevo_evento", eventosController.crearEvento);

module.exports = router;
