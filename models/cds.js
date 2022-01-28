module.exports = (sequelize, DataTypes) => {
    const CD = sequelize.define("CD", {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deposit: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        interestRate: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        term: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        openDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })


    return CD
}