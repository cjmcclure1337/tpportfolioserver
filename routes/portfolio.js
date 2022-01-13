const express = require('express');
const router = express.Router();
const db = require("../models");
const requestify = require ("requestify")
const portfolioController = require("../controllers/portfolioController");

//GET full portfolio for all users
router.get('/', portfolioController.getAllPortfolios);

//GET full portfolio for one user
router.get('/:id', portfolioController.getPortfolio);

router.get("/test", (req, res) => {
  requestify.get('https://forex-server.herokuapp.com/currency')
    .then(function(response) {

    res.send(response.getBody());
  });
})

module.exports = router;
