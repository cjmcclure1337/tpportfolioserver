const db = require("../models")
const requestify = require("requestify")
const links = require("../config/externalLinks")

const getAllPortfolios = (req, res) => {
    let currencies, stocks, cds;
    let currencyData = [];
    let stockData = [];
    let cdData = [];
    let userData = [];

    //Retrieve each investment DB
    db.Currency.findAll()
    .then(results => {
        currencies = results;
        return db.Stock.findAll();
    })
    .then(results => {
        stocks = results;
        return db.CD.findAll();
    })
    .then((results) => {
        cds = results;

        //Make API calls and push results into data arrays
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
                userId: currencies[i].UserId,
                investmentID: currencies[i].id
            });
        })

        let stockPromiseArray = stocks.map((stock) => {
            return requestify.get(links.stockPriceAPI + stock.symbol)
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
                userId: stocks[i].UserId,
                investmentID: stocks[i].id
            })
        })

        //adds calculated values to CD data to create cdData array
        cds.map((cd) => {
            const now = new Date();
            const year = 31557600000;
            const duration = (now.getTime() > cd.openDate + cd.term) ? cd.term/year : (now.getTime()-cd.openDate)/year;
            const currentValue = cd.deposit * Math.pow(1 + cd.interestRate, duration)
            cdData.push({
                deposit: cd.deposit,
                interestRate: cd.interestRate,
                term: cd.term,
                openDate: cd.openDate,
                currentValue: currentValue,
                userId: cd.UserId
            });
        }); 
        console.log("CD Data: ", cdData)
        
        return db.User.findAll();
    })
    .then((users) => {
        for(let i=0; i<users.length; i++) {
            let user = {};
            user.userId = users[i].Id
            user.currencies = currencyData.filter((currency) => users[i].Id === currency.userId)
            user.stocks = stockData.filter((stock) => users[i].Id === stock.userId)
            user.cds = cdData.filter((cd) => users[i].Id === cd.userId)
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
    let userData = {stocks: [], currencies: [], cds: []};
    let currencies, stocks, cds;
    db.User.findOne({
        where: {Id: req.params.id},
        include: [db.Currency, db.Stock, db.CD]
    })
    .then(user => {
        currencies = user.Currencies;
        stocks = user.Stocks;
        cds = user.CDs;
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
            userData.currencies.push({
                code: currencies[i].code,
                name: currency.name,
                symbol: currency.symbol,
                purchasePrice: currencies[i].purchasePrice,
                currentPrice: currency.lastPrice,
                quantity: currencies[i].quantity,
                investmentID: currencies[i].id
            });
        })

        let stockPromiseArray = stocks.map((stock) => {
            return requestify.get(links.stockInfoAPI + stock.symbol)
        })

        return Promise.all(stockPromiseArray)
    })
    .then((resultsArray) => {
        //collates data from local db with data from Stock API
        resultsArray.map((response, i) => {
            let stock = response.getBody();
            console.log(stock);
            userData.stocks.push({
                symbol: stocks[i].symbol,
                purchasePrice: stocks[i].purchasePrice,
                currentPrice: stock.stock_value.stock_value,
                quantity: stocks[i].quantity,
                name: stock.stock_name,
                investmentID: stocks[i].id
            })
        })

        cds.map((cd) => {
            const now = new Date();
            const year = 31557600000;
            const duration = (now.getTime() > cd.openDate + cd.term) ? cd.term/year : (now.getTime()-cd.openDate)/year;
            const currentValue = cd.deposit * Math.pow(1 + cd.interestRate, duration)
            userData.cds.push({
                deposit: cd.deposit,
                interestRate: cd.interestRate,
                term: cd.term,
                openDate: cd.openDate,
                currentValue: currentValue,
                investmentId: cd.id
            });
        });


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