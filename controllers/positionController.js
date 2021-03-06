const db = require("../models")
const requestify = require("requestify")
const links = require("../config/externalLinks");
const req = require("express/lib/request");
const res = require("express/lib/response");


const addStock = (req, res, next) => {
    requestify.get(links.stockPriceAPI + req.body.symbol)
    .then((stock) => {
        return db.Stock.create({
            symbol: req.body.symbol,
            quantity: req.body.quantity,
            purchasePrice: stock.getBody().stock_value,
            UserId: req.params.id
        });
    })
    .then(newStockPosition => res.send(newStockPosition))
    .catch(err => {
        res.status(400);
        res.send(err);
    });
}

const addCurrency = (req, res) => {
    requestify.get(links.currencyAPI + req.body.code)
        .then((response) => {
            const currency = response.getBody();
            db.Currency.create({
                code: req.body.code,
                quantity: req.body.quantity,
                purchasePrice: currency.lastPrice,
                UserId: req.params.id
              })
                .then(newCurrencyPosition => res.send(newCurrencyPosition))
                .catch(err => {
                    res.status(400);
                    res.send(err);
                });
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        });
}

const addCD = (req, res) => {
    const now = new Date();
    db.CD.create({
        deposit: req.body.deposit,
        interestRate: req.body.interestRate,
        term: req.body.term,
        openDate: now.getTime(),
        UserId: req.params.id
    })
    .then((newCDPosition) => {
        res.send(newCDPosition);
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    });
}

const removeStock = (req, res) => {
    db.Stock.destroy({
        where: {
            UserId: req.params.id,
            id: req.query.id
        }
    })
        .then((countDeleted) => {
            if(countDeleted === 0) {
                res.status(400);
                throw new Error('Record not found')
            }
            res.send()
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
            id: req.query.id
        }
    })
    .then((countDeleted) => {
        if(countDeleted === 0) {
            throw new Error('Record not found')
        }
        res.send()
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    });
}

const removeCD = (req, res) => {
    db.CD.destroy({
        where: {
            UserId: req.params.id,
            id: req.query.id
        }
    })
    .then((countDeleted) => {
        if(countDeleted === 0) {
            throw new Error('Record not found')
        }
        res.send()
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    });
}



module.exports = {
    addStock,
    addCurrency,
    addCD,
    removeStock,
    removeCurrency,
    removeCD
}