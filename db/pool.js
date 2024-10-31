"use strict";
const mysql = require("mysql2");

// Pool de conexiones para acceso a la BD
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "tienda",
});

module.exports = pool;
