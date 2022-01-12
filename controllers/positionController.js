const db = require("../models")


const addStock = (req, res) => {
    db.Stock.create({
        symbol: req.body.symbol,
        quantity: req.body.quantity,
        purchasePrice: 100,
        UserId: req.params.id
      })
        .then(newStockPosition => res.send(newStockPosition))
}

const addCurrency = (req, res) => {
    db.Currency.create({
        code: req.body.code,
        quantity: req.body.quantity,
        purchasePrice: 1,
        UserId: req.params.id
      })
        .then(newCurrencyPosition => res.send(newCurrencyPosition))
}

const removeStock = (req, res) => {
    db.Stock.destroy({
        where: {
            UserId: req.params.id,
            id: req.body.id
        }
    })
        .then(() => res.send("Removed stock"))
}

const removeCurrency = (req, res) => {
    db.Currency.destroy({
        where: {
            UserId: req.params.id,
            id: req.body.id
        }
    })
        .then(() => res.send("Removed currency"))
}



module.exports = {
    addStock,
    addCurrency,
    removeStock,
    removeCurrency
}