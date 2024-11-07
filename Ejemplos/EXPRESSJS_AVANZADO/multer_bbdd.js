"use strict";
const path = require("path");
const express = require("express");
const multer = require("multer");
const app = express();
const mysql = require("mysql");
//const multerFactory = multer({dest: path.join(__dirname, 'public/upload-files/')});
//app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const multerFactory = multer({ storage: multer.memoryStorage() });
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "express2"
});

app.get("/", (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "formulario.html"));
});

app.post("/procesar_formulario.html", multerFactory.single('foto'), function(request, response) {
    let usuario = {
        nombre: request.body.nombre ,
        apellidos: request.body.apellidos ,
        fumador: request.body.fumador === "si" ? "Sí" : "No",
        imagen : null
    };
    if (request.file.originalname) {
        usuario.imagen= request.file.buffer ;
    }
    insertarUsuario (usuario, function(err, newId) {
        if (!err) {
            usuario.id = newId;
            response.render("datosFormularioBD", usuario);
        }
    });
});
/*
app.get("/imagen/:id", function(request, response) {
    console.log("id: " + request.params.id);
    let pathImg = path.join(__dirname, "uploads", request.params.id);
    response.sendFile(pathImg);
    });
*/
app.get("/imagen/:id", function(request, response) {
    let n = Number(request.params.id);
    if (isNaN(n)) {
        response.status(400);
        response.end("Petición incorrecta");
    } else {
        obtenerImagen (n, function(err, imagen) {
            if (imagen) {
                response.end(imagen);
            } else {
                response.status(404);
                response.end("Not found");
            }
        });
    }
});

function insertarUsuario(usuario, callback) {
    pool.getConnection(function(err, con) {
        if (err) {
            callback(err);
        } else {
            let sql =
            "INSERT INTO personas(Nombre, Apellidos, Fumador, Foto) VALUES (?, ?, ?, ?)";
            con.query(sql, [usuario.nombre, usuario.apellidos, usuario.fumador, usuario.imagen ],
                function(err, result) {
                    con.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result.insertId);
                    }
            });
        }
    });
}

function obtenerImagen(id, callback) {
    pool.getConnection(function(err, con) {
        if (err) {
            callback(err);
        } else {
            let sql = "SELECT foto FROM personas WHERE Id = ?";
            con.query(sql, [id], function(err, result) {
                con.release();
                if (err) {
                    callback(err);
                } else {
                    // Comprobar si existe una persona con el Id dado.
                    if (result.length === 0) {
                        callback("No existe");
                    } else {
                        callback(null, result[0].foto);
                    }
                }
            });
        }
    });
}


app.listen(3000, (err) => {
    if (err) {
        console.error(`No se pudo inicializar el servidor: ${err.message}`);
    } else {
        console.log("Servidor arrancado en el puerto 3000");        
    }
});