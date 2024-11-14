"use strict;";

const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/logIn.js");
const loginController = new LoginController();

const SignUpController = require("../controllers/signUp.js");
const signUpController = new SignUpController();

const EditProfileController = require("../controllers/editProfile.js");
const editProfileController = new EditProfileController();

const InscripcionesController = require("../controllers/inscripciones.js");
const inscripcionesController = new InscripcionesController();

const EventosController = require("../controllers/eventos.js")
const eventosController = new EventosController();

// Propuesta  para recoger info de render
const DAOFacultades = require("../db/daoFacultades.js");
const DAOEventos = require("../db/daoEventos.js");
const DAOInscripciones = require("../db/daoInscripciones.js");
const pool = require("../db/pool.js");

const daoFacultades = new DAOFacultades(pool);
const daoEventos = new DAOEventos(pool);
const daoInscripciones = new DAOInscripciones(pool);

router.get("/", (req, res) => {
  daoFacultades.readAllFacultades((facultades) => {
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
                facultades: facultades,
              });
            }
          );
        } else {
          res.render("index", {
            eventos: eventos,
            usuario: req.session.usuario,
            facultades: facultades,
          });
        }
      });
    } else {

        daoEventos.readAllEventos((eventos) => {
          res.render("index", {
            eventos: eventos,
            usuario: null,
            facultades: facultades,
          });
        });

    }
  });
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
router.post("/editarPerfil", editProfileController.edit);
router.post("/inscribirse", inscripcionesController.inscribirse);
router.post("/nuevo_evento", eventosController.crearEvento);

module.exports = router;
