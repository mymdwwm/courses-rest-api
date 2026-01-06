const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Course = db.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false // en minutes
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['débutant', 'intermédiaire', 'avancé']]
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    instructor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
    }
}, {
    tableName: 'courses',
    timestamps: true
});

module.exports = Course;