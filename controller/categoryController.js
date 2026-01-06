const categoryService = require('../service/categoryService');

// Récupérer toutes les catégories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            data: categories,
            count: categories.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des catégories',
            error: error.message
        });
    }
};

// Récupérer une catégorie avec ses cours
const getCategoryWithCourses = async (req, res) => {
    try {
        const category = await categoryService.getCategoryWithCourses(req.params.id);
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Créer une nouvelle catégorie
const createCategory = async (req, res) => {
    try {
        const newCategory = await categoryService.createCategory(req.body);
        res.status(201).json({
            success: true,
            message: 'Catégorie créée avec succès',
            data: newCategory
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllCategories,
    getCategoryWithCourses,
    createCategory
};