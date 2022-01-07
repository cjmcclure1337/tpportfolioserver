const dbConfig = require('../config/dbConfig.js')
const { Sequelize, DataTypes } = require('sequelize')

//Initialize Sequelize using imported configurations
const sequelize = new Sequelize({
    database:dbConfig.DB,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    dialect: dbConfig.dialect,
    host: dbConfig.HOST
})

//Test connection to DB
sequelize.authenticate()
    .then(() => {
        console.log("connected to Postgres DB")
    })
    .catch(e => {
        console.log('unable to connect to Postgres DB:' + e)
    });

const db = {};
db.sequelize = sequelize;
//db.Currency = require('./currencyModel')(sequelize, DataTypes)

// sync the db by running the model
db.sequelize.sync({ force: false }).then(() => {
    console.log('DB synced with sequelize')
}).catch((error) => {
    console.log('Error syncing the DB to sequelize: ' + error)
})

module.exports = db