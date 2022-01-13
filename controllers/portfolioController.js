const db = require("../models")
const requestify = require("requestify")
const links = require("../config/externalLinks")

const getAllPortfolios = (req, res) => {
    let currencies, stocks;
    let currencyData = [];
    let stockData = [];
    let userData = [];
    db.Currency.findAll()
    .then(results => {
        currencies = results;
        return db.Stock.findAll();
    })
    .then(results => {
        stocks = results;

        let currencyPromiseArray = currencies.map((currency) => {
            return requestify.get(links.currencyAPI + currency.code);
        });
        
        return Promise.all(currencyPromiseArray)
    })  
    .then((resultsArray) => {
        //collates data from local db with data from Forex API
        resultsArray.map((response, i) => {
            let currency = response.getBody();
            currencyData.push({
                code: currencies[i].code,
                name: currency.name,
                symbol: currency.symbol,
                purchasePrice: currencies[i].purchasePrice,
                currentPrice: currency.lastPrice,
                quantity: currencies[i].quantity,
                userId: currencies[i].UserId
            });
        })

        let stockPromiseArray = stocks.map((stock) => {
            return requestify.get(links.stockAPI + stock.symbol)
        })

        return Promise.all(stockPromiseArray)
    })
    .then((resultsArray) => {
        //collates data from local db with data from Stock API
        resultsArray.map((response, i) => {
            let stock = response.getBody();
            console.log(stock);
            stockData.push({
                symbol: stocks[i].symbol,
                purchasePrice: stocks[i].purchasePrice,
                currentPrice: stock.stock_value,
                quantity: stocks[i].quantity,
                userId: stocks[i].UserId
            })
        })
        
        return db.User.findAll();
    })
    .then((users) => {
        for(let i=0; i<users.length; i++) {
            let user = {};
            user.userId = users[i].Id
            user.currencies = currencyData.filter((currency) => users[i].Id === currency.userId)
            user.stocks = stockData.filter((stock) => users[i].Id === stock.userId)
            userData.push(user);
        }

        res.send(userData)
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    })
}

const getPortfolio = (req, res) => {
    let userData = [];
    let currencies, stocks;
    db.User.findOne({
        where: {Id: req.params.id},
        include: [db.Currency, db.Stock]
    })
    .then(user => {
        currencies = user.Currencies;
        stocks = user.Stocks;
        //converts the currency array into arrays of promises calling APIs
        let currencyPromiseArray = currencies.map((currency) => {
            return requestify.get(links.currencyAPI + currency.code);
        });
        
        

        return Promise.all(currencyPromiseArray)
    })
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

        let stockPromiseArray = stocks.map((stock) => {
            return requestify.get(links.stockAPI + stock.symbol)
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
    })
    

}


module.exports = {
    getAllPortfolios,
    getPortfolio
}