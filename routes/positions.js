const express = require('express');
const router = express.Router();
const db = require("../models")

//POST new user by userID
router.post("/", (req, res) => {
  db.User.create({
    Id: req.body.userId
  })
  .then(newUser => res.send(newUser))
})

//GET positions for all users
router.get('/', function(req, res, next) {
  db.User.findAll({
    include: [db.Stock, db.Currency]
  }).then(allUsers => res.send(allUsers))
});

//GET positions for specific user by userID
router.get('/:id', function(req, res, next) {
    res.send("Retrieving positions for user: " + req.params.id);
});

//POST new stock position
router.post("/:id/", (req, res) => {
  switch(req.body.type.toLowerCase()) {
    
    case "stock":
      db.Stock.create({
        symbol: req.body.symbol,
        quantity: req.body.quantity,
        purchasePrice: 100,
        UserId: req.params.id
      }).then(newStockPosition => res.send(newStockPosition))
      break;
    
    case "currency":
      db.Currency.create({
        code: req.body.code,
        quantity: req.body.quantity,
        purchasePrice: 1,
        UserId: req.params.id
      }).then(newCurrencyPosition => res.send(newCurrencyPosition))
      break;
    case "cd":
      break;
    case "mutualfund":
      break;
    default:
      console.log("Invalid type");
      break;
  }
})
  

module.exports = router;
