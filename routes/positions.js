const express = require('express');
const router = express.Router();
const db = require("../models")

//POST new user by userID
router.post("/new", (req, res) => {
  db.User.create({
    userId: req.body.userId
  })
  .then(newUser => res.send(newUser))
})

//GET positions for all users
router.get('/', function(req, res, next) {
  db.User.findAll({
    include: [db.Stock]
  }).then(allUsers => res.send(allUsers))
});

//GET positions for specific user by userID
router.get('/:id', function(req, res, next) {
    res.send("Retrieving positions for user: " + req.params.id);
});

//POST new stock position
router.post("/:id/stock", (req, res) => {
  db.Stock.create({
    symbol: req.body.symbol,
    quantity: req.body.quantity,
    id: req.body.id
  })
  .then(newStockPosition => res.send(newStockPosition))
})

module.exports = router;
