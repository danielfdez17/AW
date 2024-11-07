"use strict";
const path = require("path");
const express = require("express");
const { check, validationResult } = require("express-validator");
const empiezaPorA = (param) => {
    return param.startsWith("a");

};
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "formulario2.html"));
});

app.post(
    '/procesar_formulario',
    // El campo login ha de ser no vacío.
    check("login", "Nombre de usuario vacío").notEmpty(),
    // El campo login ha de comenzar por una a.
    check("login", "Nombre de usuario no empieza por a").custom(empiezaPorA),
    // El campo login solo puede contener caracteres alfanuméricos.
    check("login", "Nombre de usuario no válido").matches(/^[A-Z0-9]+$/i),
    // El campo pass ha de tener entre 6 y 10 caracteres.
    check("pass","La contraseña no es válida").isLength({ min: 6, max: 10 }),
    // El campo email ha de ser una dirección de correo válida.
    check("email","Dirección de correo no válida").isEmail(),
    // El campo fechaNacimiento ha de contener una fecha en formato
    // mm/dd/aaaa anterior a la fecha actual.
    check("fechaNacimiento"
        , "Formato de fecha no válido").matches(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/),
    check("fechaNacimiento", "Fecha de nacimiento no válida").isBefore(),
    (request, response) => {
        const errors = validationResult(request);
        if (errors.isEmpty()) {
            console.log("Todo correcto");
            response.redirect("/correcto.html");
        } else {
            console.log("Hay errores");
//            response.render("formularioErrores", {errores: errors.array()});
            response.render("formularioErrores", {errores: errors.mapped()});
        }
});


app.listen(3000, (err) => {
    if (err) {
        console.error(`No se pudo inicializar el servidor: ${err.message}`);
    } else {
        console.log("Servidor arrancado en el puerto 3000");        
    }
});
