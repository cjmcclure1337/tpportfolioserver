module.exports = (sequelize, DataTypes) => {
    const CD = sequelize.define("CD", {
        deposit: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        interestRate: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        term: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        openDate: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    })


    return CD
}