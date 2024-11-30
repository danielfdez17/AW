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
        if (!existe && inscripcion.id == id) {
          existe = true;

          daoInscripciones.readInscripcion({id_usuario: req.session.usuario.id, id_evento: inscripcion.id}, (error, evento_inscrito) =>
          {
            if(error)
              res.status(500).json({
                error: error,
              });
            else
            {
              if(evento_inscrito.activo)
                {
                  res.setFlash({ message: "No puedes inscribir al evento de nuevo", type: "error" });
                  res.redirect("/");
                }
                else
                {
                  daoInscripciones.reinscripcionEvento({id_usuario: req.session.usuario.id, id_evento: inscripcion.id}, (error) =>
                  {
                    daoEventos.incrementarCapacidadEvento(id, (error) => {
                      if(error)
                        res.status(500).json({
                          error: error,
                        });
                      else
                      {
                        res.setFlash({ message: "Inscripción realizada con exito", type: "exito" });
                        res.redirect("/");
                      }
                        
                    });
                    
                  });
      
                }
            }
          })
          
        }
      });

    if (!existe){
      daoEventos.readCapacidadEvento(id, (error, capacidad) => {
        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString('es-ES').replace(/\//g, '-');
        let estado;
        if (capacidad.capacidad_maxima == capacidad.capacidad_actual) 
          estado = 'espera';
        else 
          estado = 'inscrito';

        daoInscripciones.createInscripcion({id_usuario: req.session.usuario.id, id_evento: parseInt(id), estado, fecha_inscripcion: fechaFormateada}, (error) => 
          {
            if(estado == 'espera')
            {
              res.setFlash({ message: "Has sido añadido a la lista de espera del evento", type: "exito" });
              res.redirect("/");
            }
            else
            {
              daoEventos.incrementarCapacidadEvento(id, (error) => {
                if(error)
                  res.status(500).json({
                    error: error,
                  });
                else
                {
                  res.setFlash({ message: "Has sido inscrito en el evento", type: "exito" });
                  res.redirect("/");
                }
              });
            }

          });
      });
    }
    });

  }

  anularEvento(req, res, next) {
    const {id} = req.body;
    let existe = false;
    daoInscripciones.readEventosInscritosPorAsistenteActivos(req.session.usuario.id, (inscripciones) => {
      inscripciones.forEach((inscripcion) => {
        if (!existe && inscripcion.id == id)
        {
          existe = true;
          daoInscripciones.deleteInscripcion({id_usuario: req.session.usuario.id, id_evento: inscripcion.id}, (error) =>
            {
              daoInscripciones.readListaEsperaPorEvento(inscripcion.id, (lista) =>
              {
                if(lista)
                {

                  daoInscripciones.ListaEsperaAInscrito(lista[0], (error) =>
                  {
                    res.setFlash({ message: "Inscripcion anulada correctamente", type: "exito" });
                    res.redirect("/");
                  })

                }
                else
                {
                  daoEventos.decrementarCapacidadEvento(id, (error) => {
                    if(error)
                      res.status(500).json({
                        error: error,
                      });
                    else
                    {
                      res.setFlash({ message: "Inscripcion anulada correctamente", type: "exito" });
                      res.redirect("/");
                    }
                      
                  });
                }
              })
            });
        }

      });

    });
  }
}

module.exports = InscripcionesController;

