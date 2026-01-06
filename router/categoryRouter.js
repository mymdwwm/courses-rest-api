const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const {
    validateCreateCategory,
    validateGetCategoryById
} = require('../validators/categoryValidator');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Routes publiques (GET)
router.get('/', categoryController.getAllCategories);
router.get('/:id', validateGetCategoryById, categoryController.getCategoryWithCourses);

// Routes protégées (POST - nécessite une authentification admin)
router.post('/', authenticateToken, requireAdmin, validateCreateCategory, categoryController.createCategory);

module.exports = router;