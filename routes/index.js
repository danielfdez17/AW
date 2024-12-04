"use strict;";

const express = require("express");
const router = express.Router();
const routerComentarios = require("./comentarios.js");
const { body, validationResult } = require("express-validator");
const { identificacionRequerida } = require("./identificacionRequerida.js");

const multer = require("multer");
const multerFactory = multer({
  storage: multer.memoryStorage(), // Usar memoria para almacenar archivos
});

const LoginController = require("../controllers/login.js");
const loginController = new LoginController();

const SignUpController = require("../controllers/signUp.js");
const signUpController = new SignUpController();

const EditProfileController = require("../controllers/editProfile.js");
const editProfileController = new EditProfileController();

// Propuesta  para recoger info de render
const DAOFacultades = require("../db/daoFacultades.js");
const DAOEventos = require("../db/daoEventos.js");
const DAOListaNegra = require("../db/daolListaNegra.js");
const DAOUsuarios = require("../db/daoUsuarios.js");
const DAOAccesibilidad = require("../db/daoAccesibilidad.js");
const DAOComentarios = require("../db/daoComentarios.js");
const pool = require("../db/pool.js");

const daoFacultades = new DAOFacultades(pool);
const daoEventos = new DAOEventos(pool);
const daoListaNegra = new DAOListaNegra(pool);
const daoUsuarios = new DAOUsuarios(pool);
const daoAccesibilidad = new DAOAccesibilidad(pool);
const daoComentarios = new DAOComentarios(pool);

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
              eventosInscritos: null,
              notificaciones: null,
            });
          });
        });
      }
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

router.get("/toasts", function (req, res) {
  res.render("fragments/toasts");
});

router.get(
  "/imagen/:id",
  identificacionRequerida,
  function (request, response) {
    let n = Number(request.params.id);

    if (isNaN(n)) {
      return response.status(400).send("Petición incorrecta");
    }

    daoUsuarios.obtenerImagen(n, (err, imagen) => {
      if (err) {
        if (err === "No existe") {
          return response.status(404).send("No encontrado");
        }
        return response.status(500).send("Error en el servidor");
      }
      response.end(imagen);
    });
  }
);

//Middleware comprobacion
const comprobacion = [
  body("*")
    .matches(/^[a-zA-Z0-9_@.:/áéíóúÁÉÍÓÚ\-]*$/)
    .withMessage("Caracteres no permitidos")
    .custom((value) => {
      const sqlKeywords = [
        "SELECT",
        "INSERT",
        "CREATE",
        "DELETE",
        "UPDATE",
        "DROP",
        "UNION",
        "ALTER",
        "TRUNCATE",
        "--",
        "AND",
        "OR",
        "LIKE",
        "BETWEEN",
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

      // Construir mensajes personalizados
      const errorDetails = errors.array().map((error) => ({
        campo: error.param,
        valorErroneo: error.value,
        mensaje: error.msg,
      }));

      daoListaNegra.createListaNegra(ip, (err) => {
        if (err) next(err);
        else {
          res.status(401).json({ errores: errorDetails });
        }
      });
    } else next();
  },
];

router.post("/accesibilidad/Tema/:id", comprobacion, (req, res) => {
  const { id } = req.params;
  const { tema } = req.body;
  daoAccesibilidad.updateTema({ tema, id }, (err) => {
    if (!err) {
      res.setFlash({
        message: "Se ha cambiado el tema con exito",
        type: "exito",
      });
      res.json({});
    }
  });
});

router.post("/accesibilidad/Letra/:id", comprobacion, (req, res) => {
  const { id } = req.params;
  const { letra } = req.body;
  daoAccesibilidad.updateLetra({ letra, id }, (err) => {
    if (!err) {
      res.setFlash({
        message: "Se ha cambiado la letra con exito",
        type: "exito",
      });
      res.json({});
    }
  });
});

router.use("/comentarios", routerComentarios);

router.post(
  "/signUp",
  comprobacion,
  multerFactory.single("foto"),
  signUpController.SignUp
);
router.post("/login", comprobacion, loginController.login);
router.post(
  "/editarPerfil",
  comprobacion,
  multerFactory.single("foto"),
  editProfileController.edit
);

const nodemailer = require('nodemailer');

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'usuariopractica3@gmail.com',  // Tu correo de Gmail
    pass: 'hgkfaufqvlarkbue'  // Tu contraseña o contraseña de aplicación
  },
  tls: {
    rejectUnauthorized: false // Deshabilita la validación del certificado SSL
  }
});

// Opciones del correo
const mailOptions = {
  from: 'usuariopractica3@gmail.com',  // Dirección del remitente
  subject: 'Recuperación de contraseña', // Asunto del correo

};

router.post("/recuperar", comprobacion,  (req, res, next) => 
{
  const {correoRecuperacion, telefonoRecuperacion} = req.body;

  const numero_ramdon = Math.floor(Math.random() * 90000) + 10000;

  mailOptions.to = correoRecuperacion;
  mailOptions.html = `<h1>Recupera tu contraseña</h1><p>Su nueva contraseña es ${numero_ramdon}</p>`;// Cuerpo HTML

  daoUsuarios.readUsuarioPorCorreo(correoRecuperacion, (error, usuario)=>
  {
    if(!usuario)
    {
      res.setFlash({ message: "No existe ese correo", type: "error" });
      res.json({});
    }
    else
    {
      if (usuario.  telefono == telefonoRecuperacion)
      {
        daoUsuarios.UpdateContrasena(
          {contrasena: numero_ramdon, 
          correo: correoRecuperacion, 
          telefono: telefonoRecuperacion}, 
        async (error) =>
        {
  
          try {
            // Enviar correo
            const info = await transporter.sendMail(mailOptions);
            console.log("Mensaje enviado: %s", info.messageId);
        } catch (error) {
            console.error("Error al enviar el correo:", error);
            $('#errorFuncionamiento .toast-body').text('Error al enviar el correo');
            $('#errorFuncionamiento').toast('show');
        }
        })
      }
      else
      {
        res.setFlash({ message: "Los parametros no coinciden", type: "error" });
        res.json({});
      }
    }    
  })

});

module.exports = router;
