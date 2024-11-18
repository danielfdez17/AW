"use strict";
const pool = require("../db/pool.js");
const DAOInscripciones = require("../db/daoInscripciones.js");
const DAOEventos = require("../db/daoEventos.js");

const daoInscripciones = new DAOInscripciones(pool);
const daoEventos = new DAOEventos(pool);

class InscripcionesController {
  inscribirEvento(req, res, next) {
    const {id} = req.body;
    let existe = false;
    daoInscripciones.readEventosInscritosPorAsistente(req.session.usuario.id, (inscripciones) => {
      inscripciones.forEach((inscripcion) => {
        if (inscripcion.id == id) {
          existe = true;
          res.status(500).json({
            error: "No te puedes inscribir al evento porque ya está inscrito",
          });
        }
      });

    if (!existe){
      daoEventos.readCapacidadEvento(id, (error, capacidad) => {
        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString('es-ES').replace(/\//g, '-');
        let estado;
        if (capacidad <= 0) 
          estado = 'Lista de espera';
        else 
          estado = 'Inscrito';

        daoInscripciones.createInscripcion({id_usuario: req.session.usuario.id, id_evento: parseInt(id), estado, fecha_inscripcion: fechaFormateada}, (error) => 
          {
            daoEventos.updateCapacidadEvento(id, (error) => {
              if(error)
                res.status(500).json({
                  error: error,
                });
            });
            res.redirect("/");
          });
      });
    }
    });

  }
}

module.exports = InscripcionesController;