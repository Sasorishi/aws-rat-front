// models/usertasks.js
module.exports = (sequelize, DataTypes) => {
    const UserTasks = sequelize.define('UserTasks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        taskId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Tasks',
                key: 'id',
            },
        },
    });

    return UserTasks;
};
