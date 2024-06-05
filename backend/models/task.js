// models/task.js
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
        },
        creation_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        description: {
            type: DataTypes.STRING,
        },
        completed_date: {
            type: DataTypes.DATE,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,  // Permettre que le parentId soit nul
            references: {
                model: 'Tasks',
                key: 'id',
            },
        },
    });

    Task.associate = (models) => {
        Task.belongsToMany(models.User, {
            through: 'UserTasks', // Table de jonction
            as: 'users',
            foreignKey: 'taskId',
        });

        Task.hasMany(models.Task, {
            as: 'children',
            foreignKey: 'parentId',
            allowNull: true
        });

        Task.belongsTo(models.Task, {
            as: 'parent',
            foreignKey: 'parentId',
            allowNull: true,
        });
    };

    return Task;
};
