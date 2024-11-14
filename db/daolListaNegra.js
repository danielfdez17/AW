"use strict";

class DAOListaNegra {
  pool;
  constructor(pool) {
    this.pool = pool;
  }

  createListaNegra(intruso, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "INSERT INTO listaNegra (ip) VALUES (?)";
      connection.query(
        sql,
        [
            intruso,
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

  readListaNegra(intruso, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql = "SELECT * FROM listaNegra WHERE ip = ?";
      connection.query(
        sql,
        [
            intruso,
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

}

module.exports = DAOListaNegra;