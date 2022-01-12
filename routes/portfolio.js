const express = require('express');
const router = express.Router();
const db = require("../models");
const requestify = require ("requestify")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Portfolio routing");
});

router.get("/test", (req, res) => {
  requestify.get('https://forex-server.herokuapp.com/currency')
    .then(function(response) {

    res.send(response.getBody());
  });
})

module.exports = router;
