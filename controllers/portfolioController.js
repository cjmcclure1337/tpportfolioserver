const db = require("../models")
const requestify = require("requestify")
const links = require("../config/externalLinks")

const getAllPortfolios = (req, res) => {
    res.send("Retrieving all portfolios")
}

const getPortfolio = (req, res) => {
    let userData = [];
    db.Currency.findAll({
        where: {UserId: req.params.id},
    })
        .then(currencies => {
            //converts the currency array into an array of promises calling the Forex API
            let promiseArray = currencies.map((currency) => {
                return requestify.get(links.currencyAPI + currency.code)
            });

            Promise.all(promiseArray)
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
                    });
                    res.send(userData);
                })
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

module.exports = {
    getAllPortfolios,
    getPortfolio
}