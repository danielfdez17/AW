"use strict";

class DAOInscripciones {
  pool;
  constructor(pool) {
    this.pool = pool;
  }

  readEventosInscritosPorAsistenteActivos(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "SELECT e.id, e.titulo, e.descripcion, e.fecha, e.hora, e.ubicacion, e.capacidad_maxima, e.id_organizador, e.tipo_evento FROM eventos e JOIN inscripciones i ON i.id_evento = e.id WHERE i.id_usuario = ? AND i.activo = true;";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(rows);
      });
    });
  }

  readEventosInscritosPorAsistente(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "SELECT e.id, e.titulo, e.descripcion, e.fecha, e.hora, e.ubicacion, e.capacidad_maxima, e.id_organizador, e.tipo_evento FROM eventos e JOIN inscripciones i ON i.id_evento = e.id WHERE i.id_usuario = ?";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(rows);
      });
    });
  }

  readInscripcion(inscripcion, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "SELECT * FROM inscripciones WHERE id_usuario = ? AND id_evento = ?";
      connection.query(
        sql,
        [inscripcion.id_usuario, inscripcion.id_evento],
        (err, rows) => {
          connection.release();
          if (err) {
            callback(err);
            return;
          }
          callback(null, rows[0]);
        }
      );
    });
  }

  createInscripcion(inscripcion, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "INSERT INTO inscripciones (id_usuario, id_evento, estado, fecha_inscripcion) VALUES (?, ?, ?, ?)";
      connection.query(
        sql,
        [
          inscripcion.id_usuario,
          inscripcion.id_evento,
          inscripcion.estado,
          inscripcion.fecha_inscripcion,
        ],
        (err, rows) => {
          connection.release();
          if (err) {
            callback(err);
            return;
          }
          callback(null, rows[0]);
        }
      );
    });
  }

  deleteInscripcion(inscripcion, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "UPDATE inscripciones SET activo = false WHERE id_usuario = ? AND id_evento = ?";
      connection.query(
        sql,
        [inscripcion.id_usuario, inscripcion.id_evento],
        (err, rows) => {
          connection.release();
          if (err) {
            callback(err);
            return;
          }
          callback(null, rows[0]);
        }
      );
    });
  }
  reinscripcionEvento(inscripcion, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "UPDATE inscripciones SET activo = true WHERE id_usuario = ? AND id_evento = ?";
      connection.query(
        sql,
        [inscripcion.id_usuario, inscripcion.id_evento],
        (err, rows) => {
          connection.release();
          if (err) {
            callback(err);
            return;
          }
          callback(null, rows[0]);
        }
      );
    });
  }

  readUsuarioListaEsperaPorEvento(id_evento, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "select u.* from inscripciones i join usuarios u on i.id_usuario = u.id where i.estado = 'espera' and i.id_evento = ? ORDER BY i.fecha_inscripcion;";
      connection.query(sql, [id_evento], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(rows);
      });
    });
  }

  readUsuarioListaAsistentesPorEvento(id_evento, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "select u.* from inscripciones i join usuarios u on i.id_usuario = u.id where i.estado = 'inscrito' and i.id_evento = ? ORDER BY i.fecha_inscripcion;";
      connection.query(sql, [id_evento], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(rows);
      });
    });
  }
  
  readListaEsperaPorEvento(id_evento, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "select * from inscripciones where estado = 'Lista de espera' and id_evento = ? ORDER BY fecha_inscripcion;";
      connection.query(sql, [id_evento], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(rows);
      });
    });
  }

  ListaEsperaAInscrito(inscripcion, callback)
  {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "UPDATE inscripciones SET estado = 'Inscrito' WHERE activo = true AND id_usuario = ? AND id_evento = ? ";
      connection.query(sql, [
        inscripcion.id_usuario,
        inscripcion.id_evento
      ], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(rows);
      });
    });
  }
}

module.exports = DAOInscripciones;
