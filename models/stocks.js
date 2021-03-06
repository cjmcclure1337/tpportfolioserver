module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define("Stock", {
        symbol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        purchasePrice: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    })


    return Stock
}