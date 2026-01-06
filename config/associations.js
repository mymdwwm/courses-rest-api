const Course = require('../model/Course');
const Category = require('../model/Category');
const User = require('../model/User');

Category.hasMany(Course, { foreignKey: 'categoryId', as: 'courses' });

Course.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = { Course, Category, User };