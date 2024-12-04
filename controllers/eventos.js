"use strict";
const pool = require("../db/pool.js");
const DAOEventos = require("../db/daoEventos.js");
const daoEventos = new DAOEventos(pool);

const DAOInscripciones = require("../db/daoInscripciones.js");
const daoInscripciones = new DAOInscripciones(pool);

const { validationResult } = require("express-validator");

//Limites de horario y duracion
const MIN_DURACION = "01:00";
const MAX_DURACION = "08:00";
const HORA_INICIO = "08:00";
const HORA_FIN = "22:00";

// Función para trasnformar horas a minutos
const convertirAMinutos = (hora) => {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
};

// Función que comprueba si la hora de inicio del evento y duración del evento está dentro del rango de horas en el que puede haber eventos durante el día
function checkHoraDuracion(hora, duracion) {
  return (
    convertirAMinutos(HORA_INICIO) <= convertirAMinutos(hora) &&
    convertirAMinutos(hora) <= convertirAMinutos(HORA_FIN) &&
    convertirAMinutos(MIN_DURACION) <= convertirAMinutos(duracion) &&
    convertirAMinutos(duracion) <= convertirAMinutos(MAX_DURACION)
  );
}

// Función que comprueba que la hora de un evento es posterior a la actual
function checkFecha(fecha, hora) {
  const fechaActual = new Date();
  const fechaIntroducida = new Date(`${fecha}T${hora}`)
  
  return fechaIntroducida >= fechaActual;
}

// Clase que controla los datos enviados de los formulario relacionados con los eventos
class EventosController {
  //Funcion crear eventos
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
      capacidad_maxima_string,
      tipo_evento,
    } = req.body;

    const id_organizador = req.session.usuario.id;
    const capacidad_maxima = parseInt(capacidad_maxima_string);

    //Comprobamos que sea posterior a la fecha actual
    if (checkFecha(fecha, hora)) {

      //Comprobamos que cumpla con el horario de la universidad
      if (checkHoraDuracion(hora, duracion)) {

        //Comprobamos si existe algun otro evento que coincida con el nuevo
        daoEventos.readEventoPorFecha(fecha, (err, eventos) => {
          if (err) next(err);

          let sePuedeInsertar = true;
          if (eventos) {
            eventos.forEach((evento) => {
              if (evento.hora + evento.duracion >= hora)
                sePuedeInsertar = false;
            });
          }
          if (sePuedeInsertar) {

            //Si cumple lo anterior insertamos el evento en la base de datos
            daoEventos.createEvento(
              {
                titulo,
                descripcion,
                fecha,
                hora,
                duracion,
                ubicacion,
                capacidad_maxima,
                id_organizador,
                tipo_evento,
              },
              (err) => {
                if (err) next(err);
                else {
                  res.setFlash({
                    message: "Evento registrado con éxito",
                    type: "exito",
                  });
                  res.redirect("/organizadores");
                }
              }
            );
          } else {
            res.setFlash({
              message:
                "Ya hay un evento que coincide con ese horario y duracion",
              type: "error",
            });
            res.redirect("/organizadores");
          }
        });
      } else {
        res.setFlash({
          message: "Debes respetar los horarios de la universidad",
          type: "error",
        });
        res.redirect("/organizadores");
      }
    } else {
      res.setFlash({
        message: "Debe ser una fecha igual o posterior a la actual",
        type: "error",
      });
      res.redirect("/organizadores");
    }
  }

  eliminarEvento(req, res, next) {
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });
    const { id } = req.body;

    daoInscripciones.readUsuarioListaAsistentesPorEvento(id, (err, usuario) => {
      if (err) next(err);

      if (usuario.length > 0) {
        res.setFlash({
          message: "No puedes eliminar este evento, ya hay gente inscrita",
          type: "error",
        });
        res.json({ id_evento: null });
      } else {
        daoEventos.deleteEvento(id, (err) => {
          if (err) next(err);
          else {
            res.setFlash({
              message: "Evento elimiando con éxito",
              type: "exito",
            });
            res.json({ id_evento: id });
          }
        });
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

    if (checkFecha(fecha, hora)) {
      if (checkHoraDuracion(hora, duracion)) {
        daoEventos.readEventoPorFecha(fecha, (err, eventos) => {
          if (err) next(err);

          let sePuedeActualizar = true;
          if (eventos) {
            eventos.forEach((evento) => {
              if (
                evento.id != id &&
                convertirAMinutos(evento.hora) +
                  convertirAMinutos(evento.duracion) >=
                  convertirAMinutos(hora)
              )
                sePuedeActualizar = false;
            });
          }

          if (sePuedeActualizar) {
            daoEventos.readEventoPorId(parseInt(id), (err, eventos) => {
              if (err) next(err);

              if (eventos.capacidad_actual < capacidad_maxima) {
                daoInscripciones.readListaEsperaPorEvento(
                  parseInt(id),
                  (lista) => {
                    const fecha_actual = new Date();
                    const fechaFormateada = fecha_actual
                      .toLocaleDateString("es-ES")
                      .replace(/\//g, "-");
                    let auxiliar = capacidad_maxima - eventos.capacidad_actual;
                    let i = 0;
                    while (i < auxiliar && lista && lista.length > 0) {
                      daoInscripciones.ListaEsperaAInscrito(
                        {
                          id_usuario: lista[i].id_usuario,
                          id_evento: parseInt(lista[i].id_evento),
                          evento: "inscrito",
                          fecha_inscripcion: fechaFormateada,
                        },
                        (error) => {
                          daoEventos.incrementarCapacidadEvento(id, (error) => {
                            if (error)
                              res.status(500).json({
                                error: error,
                              });
                          });
                        }
                      );
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
                        else {
                          res.setFlash({
                            message: "Edicion registrada con éxito",
                            type: "exito",
                          });
                          res.json({});
                        }
                      }
                    );
                  }
                );
              } else {
                res.setFlash({
                  message:
                    "No puedes reducir la capacidad maxima a menos de la asistencia actual",
                  type: "error",
                });
                res.json({});
              }
            });
          } else {
            res.setFlash({
              message:
                "Ya hay un evento que coincide con ese horario y duracion",
              type: "error",
            });
            res.json({});
          }
        });
      } else {
        res.setFlash({
          message: "Debes respetar los horarios de la universidad",
          type: "error",
        });
        res.json({});
      }
    } else {
      res.setFlash({
        message: "Debe ser una fecha igual o posterior a la actual",
        type: "error",
      });
      res.json({});
    }
  }
}

module.exports = EventosController;
