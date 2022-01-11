const express = require('express');
const router = express.Router();
const db = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Portfolio routing");
});

module.exports = router;
