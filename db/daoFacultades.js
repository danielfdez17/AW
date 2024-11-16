"use strict";

class DAOFacultades {
  pool;
  constructor(pool) {
    this.pool = pool;
  }

  readAllFacultades(callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql = "SELECT * FROM facultades";
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
}

module.exports = DAOFacultades;
