"use strict";
const mysql = require("mysql");
class DAO {
  host;
  username;
  password;
  database;
  pool;
  constructor(host, username, password, database) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.database = database;
    this.pool = mysql.createPool({
      host: this.host,
      user: this.username,
      password: this.password,
      database: this.database,
    });
  }
  async insertarUsuario(usuario, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
      } else {
        connection.query(
          "INSERT INTO usuarios (nombre, correo, telefono) VALUES (?, ?, ?)",
          [usuario.nombre, usuario.correo, usuario.telefono],
          (err, rows) => {
            if (err) {
              callback(err);
            } else {
              callback(null);
            }
            connection.release();
            usuario.id = rows.id;
          }
        );
      }
    });
  }

  async enviarMensaje(usuarioOrigen, usuarioDestino, mensaje, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
      } else {
        connection.query(
          "INSERT INTO mensajes (idOrigen, idDestino, mensaje, hora, leido) VALUES (?, ?, ?, ?, ?)",
          [usuarioOrigen.id, usuarioDestino.id, mensaje, Date.now(), 0],
          (err, rows) => {
            if (err) {
              callback(err);
            } else {
              callback(null);
            }
            connection.release();
          }
        );
      }
    });
  }
  async bandejaEntrada(usuario, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err, undefined);
      } else {
        connection.query(
          "SELECT mensaje, hora FROM mensajes WHERE idDestino = ? AND leido = 0",
          [usuario.id],
          (err, rows) => {
            if (err) {
              callback(err, undefined);
            }
            connection.release();
            mensajes = [];
            for (let i = 0; i < rows.length; ++i) {
              mensajes[i].usuario = usuario;
              mensajes[i].mensaje = rows[i].mensaje;
              mensajes[i].hora = rows[i].hora;
            }
            callback(null, mensaje);
          }
        );
      }
    });
  }

  async buscarUsuario(str, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err, undefined);
      } else {
        connection.query(
          "SELECT * FROM usuarios WHERE nombre LIKE %?%",
          [str],
          (err, rows) => {
            if (err) {
              callback(err, undefined);
            } else {
              callback(null, rows);
            }
            connection.release();
          }
        );
      }
    });
  }

  async terminarConexion(callback) {
    this.pool.end();
  }
}

module.exports = DAO;
