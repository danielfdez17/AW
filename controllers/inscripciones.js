"use strict";

const pool = require("../db/pool.js");
const DAOInscripciones = require("../db/daoInscripciones.js");
const DAOEventos = require("../db/daoEventos.js");

const daoInscripciones = new DAOInscripciones(pool);
const daoEventos = new DAOEventos(pool);

// Clase que controla los datos enviados de los formulario relacionados con las inscripciones
class InscripcionesController {

  //Funcion para inscribirse en un evento
  inscribirEvento(req, res, next) {
    const { id } = req.body;
    let existe = false;

    //Comprobamos los eventos inscritos por el asistente
    daoInscripciones.readEventosInscritosPorAsistente(
      req.session.usuario.id,
      (err, inscripciones) => {
        if (err) next(err);

        inscripciones.forEach((inscripcion) => {
          if (!existe && inscripcion.id == id) {
            existe = true;

            //Comprobamos con la inscripcion actual
            daoInscripciones.readInscripcion({ id_usuario: req.session.usuario.id, id_evento: inscripcion.id },(err, evento_inscrito) => {
                if (err) next(err);
                else {

                  //Verificamos que ya se encontraba inscrito
                  if (evento_inscrito.activo) {
                    res.setFlash({
                      message: "No puedes inscribir al evento de nuevo",
                      type: "error",
                    });
                    res.json({ id_evento: null });
                  } else {

                    //Si ya existia la inscripcion modificamos el estado a activo
                    daoInscripciones.reinscripcionEvento(
                      {
                        id_usuario: req.session.usuario.id,
                        id_evento: inscripcion.id,
                      },
                      (err) => {
                        if (err) next(err);

                        //Incrementamos la capacidad actual del evento (no la maxima)
                        daoEventos.incrementarCapacidadEvento(id, (err) => {
                          if (err) next(err);
                          else {
                            res.setFlash({
                              message: "Inscripción realizada con exito",
                              type: "exito",
                            });
                            res.json({ id_evento: id });
                          }
                        });
                      }
                    );
                  }
                }
              }
            );
          }
        });

        //Si nunca se ha inscrito
        if (!existe) {

          //Comprobamos si se puede inscribir
          daoEventos.readCapacidadEvento(id, (err, capacidad) => {
            if (err) next(err);
            const fecha = new Date();
            const fechaFormateada = fecha
              .toLocaleDateString("es-ES")
              .replace(/\//g, "-");
            let estado;
            if (capacidad.capacidad_maxima == capacidad.capacidad_actual)
              estado = "espera";
            else estado = "inscrito";

            //Creamos la inscripcion
            daoInscripciones.createInscripcion(
              {
                id_usuario: req.session.usuario.id,
                id_evento: parseInt(id),
                estado,
                fecha_inscripcion: fechaFormateada,
              },
              (err) => {
                if (err) next(err);

                if (estado == "espera") {
                  res.setFlash({
                    message: "Has sido añadido a la lista de espera del evento",
                    type: "exito",
                  });
                  res.json({ id_evento: id });
                } else {

                  //Incrementamos la capacidad actual del evento (no la maxima)
                  daoEventos.incrementarCapacidadEvento(id, (err) => {
                    if (err) next(err);
                    else {
                      res.setFlash({
                        message: "Has sido inscrito en el evento",
                        type: "exito",
                      });
                      res.json({ id_evento: id });
                    }
                  });
                }
              }
            );
          });
        }
      }
    );
  }

  //Funcion para eliminar un evento
  anularEvento(req, res, next) {
    const { id } = req.body;
    let existe = false;

    //Comprobamos los eventos activos en los que se ha inscrito el asistente
    daoInscripciones.readEventosInscritosPorAsistenteActivos(
      req.session.usuario.id,
      (err, inscripciones) => {
        if (err) next(err);

        inscripciones.forEach((inscripcion) => {
          if (!existe && inscripcion.id == id) {
            existe = true;

            //Borrado logico de la inscripcion
            daoInscripciones.deleteInscripcion(
              { id_usuario: req.session.usuario.id, id_evento: inscripcion.id },
              (err) => {
                if (err) next(err);

                //Comprobamos si existe gente en lista de espera para ese evento
                daoInscripciones.readListaEsperaPorEvento(
                  inscripcion.id,
                  (lista) => {
                    if (lista && lista.length > 0) {

                      //Inscribimos a esta gente en espera (1 persona)
                      daoInscripciones.ListaEsperaAInscrito(
                        lista[0],
                        (err) => {
                          if (err) next(err);
                          res.setFlash({
                            message: "Inscripcion anulada correctamente",
                            type: "exito",
                          });
                          res.json({ id: inscripcion.id });
                        }
                      );
                    } else {

                      //Si no existe gente en lista de espera directamente decrementamos la capacidad actual (no la maxima)
                      daoEventos.decrementarCapacidadEvento(id, (err) => {
                        if (err) next(err);
                        else {
                          res.setFlash({
                            message: "Inscripcion anulada correctamente",
                            type: "exito",
                          });
                          res.json({ id: inscripcion.id });
                        }
                      });
                    }
                  }
                );
              }
            );
          }
        });
      }
    );
  }
}

module.exports = InscripcionesController;
