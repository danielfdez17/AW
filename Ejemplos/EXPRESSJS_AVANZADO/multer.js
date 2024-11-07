"use strict";
const path = require("path");
const express = require("express");
const multer = require("multer");
const app = express();
//const multerFactory = multer({dest: path.join(__dirname, 'public/upload-files/')});
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

var almacen = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
 //       console.log(file.originalname + path.extname(file.originalname));
        cb(null, file.originalname);
    }
  });
//const multerFactory = multer({ storage: almacen });
// const multerFactory = multer({ dest: path.join(__dirname, "uploads")});
const multerFactory = multer({ storage: multer.memoryStorage() });
app.get("/", (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "formulario.html"));
});

app.post("/procesar_formulario.html", multerFactory.single('foto'), function(request, response) {
    let nombreFichero = null;
    if (request.file.filename) { // Si se ha subido un fichero
        console.log(`Nombre del fichero: ${request.file.originalname}` );
        console.log(`Nombre del fichero2: ${request.file.filename}` );
        console.log(`Fichero guardado en: ${request.file.path}`);
        console.log(`Tamaño: ${request.file.size}`);
        console.log(`Tipo de fichero: ${request.file.mimetype}`);
        nombreFichero = request.file.originalname;
    }
    response.render("datosFormulario", {
        nombre: request.body.nombre ,
        apellidos: request.body.apellidos ,
        fumador: request.body.fumador === "si" ? "Sí" : "No",
        imagen : nombreFichero
    });
});

app.get("/imagen/:id", function(request, response) {
    console.log("id: " + request.params.id);
    let pathImg = path.join(__dirname, "uploads", request.params.id);
    response.sendFile(pathImg);
    });

app.listen(3000, (err) => {
    if (err) {
        console.error(`No se pudo inicializar el servidor: ${err.message}`);
    } else {
        console.log("Servidor arrancado en el puerto 3000");        
    }
});