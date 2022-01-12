const db = require("../models")


const addStock = (req, res, next) => {
    db.Stock.create({
        symbol: req.body.symbol,
        quantity: req.body.quantity,
        purchasePrice: 100,
        UserId: req.params.id
      })
        .then(newStockPosition => res.send(newStockPosition))
        .catch(err => {
            res.status(400);
            res.send(err);
        });
}

const addCurrency = (req, res) => {
    db.Currency.create({
        code: req.body.code,
        quantity: req.body.quantity,
        purchasePrice: 1,
        UserId: req.params.id
      })
        .then(newCurrencyPosition => res.send(newCurrencyPosition))
        .catch(err => {
            res.status(400);
            res.send(err);
        });
}

const removeStock = (req, res) => {
    db.Stock.destroy({
        where: {
            UserId: req.params.id,
            id: req.body.id
        }
    })
        .then((countDeleted) => {
            if(countDeleted === 0) {
                res.status(400);
                res.send("No such record found")
            }
            res.send("Removed stock")
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        });
}

const removeCurrency = (req, res) => {
    db.Currency.destroy({
        where: {
            UserId: req.params.id,
            id: req.body.id
        }
    })
    .then((countDeleted) => {
        if(countDeleted === 0) {
            res.status(400);
            res.send("No such record found")
        }
        res.send("Removed currency")
    })
        .catch(err => {
            res.status(400);
            res.send(err);
        });
}



module.exports = {
    addStock,
    addCurrency,
    removeStock,
    removeCurrency
}