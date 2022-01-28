const dbConfig = require('../config/dbConfig.js')
const { Sequelize, DataTypes } = require('sequelize')

// construct the sequelize object using the constructor
let sequelize = null;

if (process && process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    sequelize = new Sequelize( dbConfig.URL,
    { // use imported configurations from dbConfig
        database: dbConfig.DB,
        username: dbConfig.USER,
        password: dbConfig.PASSWORD,
        dialect: dbConfig.dialect,
        host: dbConfig.HOST,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },)
}

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
db.User = require('./users')(sequelize, DataTypes)
db.Stock = require('./stocks')(sequelize, DataTypes)
db.Currency = require('./currency')(sequelize, DataTypes)
db.CD = require('./cds')(sequelize, DataTypes)

// sync the db by running the model
db.sequelize.sync({ force: false }).then(() => {
    console.log('DB synced with sequelize')
}).catch((error) => {
    console.log('Error syncing the DB to sequelize: ' + error)
})

db.User.hasMany(db.Stock, {
    onDelete: "cascade"
})

db.Stock.belongsTo(db.User, {
    foreignKey: {
        allowNull: false
    }
});

db.User.hasMany(db.Currency, {
    onDelete: "cascade"
})

db.Currency.belongsTo(db.User, {
    foreignKey: {
        allowNull: false
    }
});

db.User.hasMany(db.CD, {
    onDelete: "cascade"
})

db.CD.belongsTo(db.User, {
    foreignKey: {
        allowNull: false
    }
});

module.exports = db