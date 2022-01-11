module.exports = (sequelize, DataTypes) => {
    const Currency = sequelize.define("Currency", {
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        purchasePrice: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    })


    return Currency
}