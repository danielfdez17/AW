"use strict";
const express = require("express");
const router = express.Router();

router.get("/organizadores", (req, res) => {
  res.render("organizadores");
});

module.exports = router;
