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
        "INSERT INTO eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) VALUES (?, ?, ?, ?, ?, ?, ?)";
      connection.query(
        sql,
        [
          evento.titulo,
          evento.descripcion,
          evento.fecha,
          evento.hora,
          evento.ubicacion,
          evento.capacidadMaxima,
          evento.id_organizador,
          evento.tipo_evento
        ],
        (err, rows) => {
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
      const sql = "SELECT * FROM eventos";
      connection.query(sql, (err, rows) => {
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
      const sql = "SELECT * FROM eventos WHERE id_organizador = ?";
      connection.query(sql, [id], (err, rows) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows);
      });
    });
  }

  readEvento(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql = "SELECT * FROM eventos WHERE id = ?";
      connection.query(sql, [id], (err, rows) => {
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
        "UPDATE eventos SET titulo = ? and descripcion = ? and fecha = ? and hora = ? and ubicacion = ? and capacidad_maxima = ? and id_organizador = ? WHERE id = ?";
      connection.query(
        sql,
        [
          evento.titulo,
          evento.descripcion,
          evento.fecha,
          evento.hora,
          evento.ubicacion,
          evento.capacidadMaxima,
          evento.idOrganizador,
          evento.id,
        ],
        (err, rows) => {
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
      const sql = "UPDATE eventos SET activo = false WHERE id = ?";
      connection.query(sql, [id], (err, rows) => {
        if (err) {
          callback(err);
          return;
        }
        callback(id);
      });
    });
  }
}

module.exports = DAOEventos;
