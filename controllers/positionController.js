const db = require("../models")


const addStock = (req, res) => {
    db.Stock.create({
        symbol: req.body.symbol,
        quantity: req.body.quantity,
        purchasePrice: 100,
        UserId: req.params.id
      }).then(newStockPosition => res.send(newStockPosition))
}

const addCurrency = (req, res) => {
    db.Currency.create({
        code: req.body.code,
        quantity: req.body.quantity,
        purchasePrice: 1,
        UserId: req.params.id
      }).then(newCurrencyPosition => res.send(newCurrencyPosition))
}



module.exports = {
    addStock,
    addCurrency
}