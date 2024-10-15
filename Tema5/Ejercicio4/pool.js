"use strict";
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "articulosbd",
});

module.exports = pool;
