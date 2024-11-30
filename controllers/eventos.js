"use strict";
const pool = require("../db/pool.js");
const DAOEventos = require("../db/daoEventos.js");
const daoEventos = new DAOEventos(pool);

const DAOInscripciones = require("../db/daoInscripciones.js");
const daoInscripciones = new DAOInscripciones(pool);

const { validationResult } = require("express-validator");

const MIN_DURACION = "01:00";
const MAX_DURACION = "08:00";
const HORA_INICIO = "08:00";
const HORA_FIN = "22:00";

const convertirAMinutos = (hora) => {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
};

function checkHoraDuracion(hora, duracion) {
  return (
    convertirAMinutos(HORA_INICIO) <= convertirAMinutos(hora) &&
    convertirAMinutos(hora) <= convertirAMinutos(HORA_FIN) &&
    convertirAMinutos(MIN_DURACION) <= convertirAMinutos(duracion) &&
    convertirAMinutos(duracion) <= convertirAMinutos(MAX_DURACION)
  );
}

class EventosController {
  crearEvento(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const {
      titulo,
      descripcion,
      fecha,
      hora,
      duracion,
      ubicacion,
      capacidad,
      capacidad_maxima_string,
      tipo_evento,
    } = req.body;
    const id_organizador = req.session.usuario.id;
    const capacidad_maxima = parseInt(capacidad_maxima_string);
    daoEventos.readEventoPorFecha(fecha, (eventos) => {
      let sePuedeInsertar = true;
      eventos.forEach((evento) => {
        if (evento.hora + evento.duracion >= hora) sePuedeInsertar = false;
      });
      if (sePuedeInsertar) {
        daoEventos.createEvento(
          {
            titulo,
            descripcion,
            fecha,
            hora,
            duracion,
            ubicacion,
            capacidad,
            capacidad_maxima,
            tipo_evento,
            id_organizador,
          },
          (err) => {
            if (err) next(err);
            else
            {
              res.setFlash({ message: "Evento registrado con éxito", type: "exito" });
              res.redirect("/organizadores");
            } 
          }
        );
      } else {
        res.setFlash({ message: "Ya hay un evento que coincide con ese horario y duracion", type: "error" });
        res.redirect("/organizadores");
      }
    });
  }

  eliminarEvento(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const { id } = req.body;
    daoEventos.deleteEvento(id, (err) => {
      if (err) next(err);
      else
      {
        res.setFlash({ message: "Evento elimiando con éxito", type: "exito" });
        res.redirect("/organizadores");
      } 
    });
  }

  editarEvento(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const {
      titulo,
      descripcion,
      fecha,
      hora,
      duracion,
      ubicacion,
      capacidad_maxima_string,
      tipo_evento,
      id,
    } = req.body;
    const capacidad_maxima = parseInt(capacidad_maxima_string);

    if (checkHoraDuracion(hora, duracion)) {
      daoEventos.readEventoPorFecha(fecha, (eventos) => {
        let sePuedeActualizar = true;
        if(eventos)
        {
          eventos.forEach((evento) => {
            if (evento.hora + evento.duracion >= hora) sePuedeActualizar = false;
          });
        }

        if (sePuedeActualizar) {

          daoEventos.readEventoPorId(parseInt(id), (error, eventos) => 
          {
            if(eventos.capacidad_maxima < capacidad_maxima)
            {

              daoInscripciones.readListaEsperaPorEvento(parseInt(id), (lista) =>
                {
                  const fecha = new Date();
                  const fechaFormateada = fecha.toLocaleDateString('es-ES').replace(/\//g, '-');
                  let auxiliar = capacidad_maxima - eventos.capacidad_actual;
                  let i = 0;
                  while(i < auxiliar || (lista && lista.length > 0))
                  {
                    daoInscripciones.ListaEsperaAInscrito({id_usuario: lista[i].id_usuario, id_evento: parseInt(lista[i].id_evento), evento: 'Inscrito', fecha_inscripcion: fechaFormateada}, (error) => 
                    {
                      daoEventos.incrementarCapacidadEvento(id, (error) => {
                        if(error)
                          res.status(500).json({
                            error: error,
                          });
                      });
                      
                    });
                    i++;
                    lista.pop();
                  }

                  daoEventos.updateEvento(
                    {
                      titulo,
                      descripcion,
                      fecha,
                      hora,
                      duracion,
                      ubicacion,
                      capacidad_maxima,
                      tipo_evento,
                      id,
                    },
                    (err) => {
      
                      if (err) next(err);
                      else
                      {
                        res.setFlash({ message: "Evento registrado con éxito", type: "exito" });
                        res.redirect("/organizadores");
                      } 
                    }
                  );
                })
            }

          })

        } else {
          res.setFlash({ message: "Ya hay un evento que coincide con ese horario y duracion", type: "error" });
          res.redirect("/organizadores");
        }
      });
    }
  }
}

module.exports = EventosController;
