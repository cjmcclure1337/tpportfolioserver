const db = require("../models")
const requestify = require("requestify")
const links = require("../config/externalLinks")

const getAllPortfolios = (req, res) => {
    
    db.User.findAll({
        include: [db.Currency, db.Stock]
    })
    .then(users => {

    })
}

const getPortfolio = (req, res) => {
    let userData = [];
    db.User.findOne({
        where: {Id: req.params.id},
        include: [db.Currency, db.Stock]
    })
    .then(user => {
        let currencies = user.Currencies;
        let stocks = user.Stocks;
        //converts the currency array into arrays of promises calling APIs
        let currencyPromiseArray = currencies.map((currency) => {
            return requestify.get(links.currencyAPI + currency.code);
        });
        
        let stockPromiseArray = stocks.map((stock) => {
            return requestify.get(links.stockAPI + stock.symbol)
        })

        Promise.all(currencyPromiseArray)
        .then((resultsArray) => {
            //collates data from local db with data from Forex API
            resultsArray.map((response, i) => {
                let currency = response.getBody();
                userData.push({
                    code: currencies[i].code,
                    name: currency.name,
                    symbol: currency.symbol,
                    purchasePrice: currencies[i].purchasePrice,
                    currentPrice: currency.lastPrice,
                    quantity: currencies[i].quantity
                });
            })
            return Promise.all(stockPromiseArray)
        })
        .then((resultsArray) => {
            //collates data from local db with data from Stock API
            resultsArray.map((response, i) => {
                let stock = response.getBody();
                console.log(stock);
                userData.push({
                    symbol: stocks[i].symbol,
                    purchasePrice: stocks[i].purchasePrice,
                    currentPrice: stock.stock_value,
                    quantity: stocks[i].quantity
                })
            })
            res.send(userData)
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        });
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    })
}


module.exports = {
    getAllPortfolios,
    getPortfolio
}