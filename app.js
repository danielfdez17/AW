"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);

const indexRouter = require("./routes/index");
const routerAsistentes = require("./routes/asistentes.js");
const routerOrganizadores = require("./routes/organizadores.js");

const port = 3000;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const sessionStore = new MySQLStore({
  host: "localhost",
  user: "root",
  password: "",
  database: "AW_24",
  port: 3306,
  expiration: 999999,
});

// Configuración de la sesión
// app.use(
//   session({
//     secret: "mi_clave_secreta",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );
app.use(
  session({
    secret: "mi_clave_secreta",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { secure: false, maxAge: 999999 },
  })
);

// Middleware para la autenticación del usuario
app.use((req, res, next) => {
  if (req.session && req.session.auth) {
    res.locals.usuario = req.session.usuario;
    res.locals.granjas = req.session.granjas;
  }
  next();
});

app.use("/", indexRouter);
app.use("/asistentes", routerAsistentes);
app.use("/organizadores", routerOrganizadores);

// Control error 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Control error 500
app.use(function (req, res, next) {
  next(createError(500));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render("error", { error: err, message: err.message });
});

app.listen(port, (err) => {
  if (err) console.log(`Erro al iniciar el servidor: ${err}`);
  else console.log(`Servidor escuchando en http://localhost:${port}`);
});