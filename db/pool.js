"use strict";
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "UCM_GEU",
  port: 3306,
});

module.exports = pool;
