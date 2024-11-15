"use strict;";

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const LoginController = require("../controllers/logIn.js");
const loginController = new LoginController();

const SignUpController = require("../controllers/signUp.js");
const signUpController = new SignUpController();

const EditProfileController = require("../controllers/editProfile.js");
const editProfileController = new EditProfileController();

const InscripcionesController = require("../controllers/inscripciones.js");
const inscripcionesController = new InscripcionesController();

const EventosController = require("../controllers/eventos.js");
const eventosController = new EventosController();

const routerAsistentes = require("./asistentes.js");
const routerOrganizadores = require("./organizadores.js");

// Propuesta  para recoger info de render
const DAOFacultades = require("../db/daoFacultades.js");
const DAOEventos = require("../db/daoEventos.js");
const DAOInscripciones = require("../db/daoInscripciones.js");
const DAOListaNegra = require("../db/daolListaNegra.js");
const pool = require("../db/pool.js");

const daoFacultades = new DAOFacultades(pool);
const daoEventos = new DAOEventos(pool);
const daoInscripciones = new DAOInscripciones(pool);
const daoListaNegra = new DAOListaNegra(pool);

router.get("/", (req, res) => {
  const { ip } = req;
  daoListaNegra.readListaNegra(ip, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (rows) {
      return res
        .status(401)
        .json({ error: "Acceso denegado: IP en lista negra" });
    } else {
      if (req.session.auth) {
        if (req.session.usuario.rol === "asistente") {
          res.redirect("/asistentes");
        } else {
          res.redirect("/organizadores");
        }
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
    }
  });
});

router.use("/asistentes", routerAsistentes);
router.use("/organizadores", routerOrganizadores);

router.get("/logOut", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(createError(err)); // Maneja el error si ocurre al destruir la sesión
    } else {
      res.clearCookie("connect.sid"); // Limpia la cookie de sesión
      //   res.render("index");
      res.redirect("/"); // Redirige al usuario a la página principal
    }
  });
});

//Middleware comprobacion
const comprobacion = [
  body("*")
    .matches(/^[a-zA-Z0-9_@.]*$/)
    .withMessage("Caracteres no permitidos")
    .custom((value) => {
      const sqlKeywords = [
        "SELECT",
        "INSERT",
        "DROP",
        "DELETE",
        "UPDATE",
        "UNION",
        "ALTER",
        "TRUNCATE",
        "CREATE",
      ];
      if (
        sqlKeywords.some((keyword) => value.toUpperCase().includes(keyword))
      ) {
        throw new Error("Uso de palabras reservadas no permitido");
      }
      return true;
    }),

  // Maneja los resultados de la validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { ip } = req;
      daoListaNegra.createListaNegra(ip, (err) => {
        if (err) next(err);
        else {
          // res.status(401).json({ errors: errors.array() });
          res.redirect("/logOut");
        }
      });
    } else next();
  },
];

router.post("/signUp", comprobacion, signUpController.SignUp);
router.post("/login", comprobacion, loginController.login);
router.post("/editarPerfil", comprobacion, editProfileController.edit);
router.post("/inscribirse", comprobacion, inscripcionesController.inscribirse);
router.post("/nuevo_evento", comprobacion, eventosController.crearEvento);

module.exports = router;
