// store the configuration secrets of the PG DB here
module.exports = {
    HOST: process.env.HOST, // your endpoint
    USER: process.env.USER, // your username
    PASSWORD: process.env.PASSWORD, // your password
    DB: process.env.DB, // your db name
    dialect: 'postgres',
    }