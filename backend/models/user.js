// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
        },
    });

    User.associate = (models) => {
        User.belongsToMany(models.Task, {
            through: 'UserTasks', // Table de jonction
            as: 'tasks',
            foreignKey: 'userId',
        });
    };

    return User;
};