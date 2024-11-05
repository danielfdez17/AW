"use strict";
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("sumando1");
});

module.exports = router;
