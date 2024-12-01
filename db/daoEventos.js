"use strict";

class DAOEventos {
  pool;
  constructor(pool) {
    this.pool = pool;
  }

  createEvento(evento, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "INSERT INTO eventos (titulo, descripcion, fecha, hora, duracion, ubicacion, capacidad_maxima, id_organizador, tipo_evento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      connection.query(
        sql,
        [
          evento.titulo,
          evento.descripcion,
          evento.fecha,
          evento.hora,
          evento.duracion,
          evento.ubicacion,
          evento.capacidad_maxima,
          evento.id_organizador,
          evento.tipo_evento,
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

  readAllEventos(callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql = "SELECT * FROM eventos WHERE activo = true";
      connection.query(sql, (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(rows);
      });
    });
  }

  readEventosPorOrganizador(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "SELECT * FROM eventos WHERE id_organizador = ? AND activo = true";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows);
      });
    });
  }

  readEventoPorFecha(fecha, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "SELECT * FROM eventos WHERE fecha = ? and activo = true ORDER BY fecha ASC";
      connection.query(sql, [fecha], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows);
      });
    });
  }

  readEventoPorId(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "SELECT * FROM eventos WHERE id = ?";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows[0]);
      });
    });
  }

  readCapacidadEvento(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql = "SELECT capacidad_actual, capacidad_maxima FROM eventos WHERE id = ?";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows[0]);
      });
    });
  }

  incrementarCapacidadEvento(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "UPDATE eventos SET capacidad_actual = capacidad_actual + 1 WHERE id = ?";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows);
      });
    });
  }

  decrementarCapacidadEvento(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "UPDATE eventos SET capacidad_actual = capacidad_actual - 1 WHERE id = ?";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows);
      });
    });
  }

  updateEvento(evento, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "UPDATE eventos SET titulo = ?, descripcion = ?, fecha = ?, hora = ?, duracion = ?, ubicacion = ?, capacidad_maxima = ?, tipo_evento = ?  WHERE id = ?";
      connection.query(
        sql,
        [
          evento.titulo,
          evento.descripcion,
          evento.fecha,
          evento.hora,
          evento.duracion,
          evento.ubicacion,
          evento.capacidad_maxima,
          evento.tipo_evento,
          evento.id,
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

  deleteEvento(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "UPDATE eventos SET activo = false WHERE id = ?";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows);
      });
    });
  }


}



module.exports = DAOEventos;
