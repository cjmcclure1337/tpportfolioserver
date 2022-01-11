module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    });


    return User
}