const express = require('express');
const router = express.Router();
const db = require("../models");
const requestify = require ("requestify")
const portfolioController = require("../controllers/portfolioController");

//GET full portfolio for all users
router.get('/', portfolioController.getAllPortfolios);

//GET full portfolio for one user
router.get('/:id', portfolioController.getPortfolio);

module.exports = router;
