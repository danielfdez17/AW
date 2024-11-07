"use strict";

const express = require("express");
const router = express.Router();

// Redirige directamente a productos para evitar que el usuario tenga que escribir la URL completa
router.get('/', (req, res) => {
    res.render("index");
});
  
module.exports = router;