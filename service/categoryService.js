const { Category, Course } = require('../config/associations');

// Récupérer toutes les catégories
const getAllCategories = async () => {
    const categories = await Category.findAll({
        order: [['createdAt', 'DESC']]
    });
    return categories;
};

// Récupérer une catégorie par son ID avec ses cours
const getCategoryById = async (categoryId) => {
    const category = await Category.findByPk(categoryId, {
        include: [{
            model: Course,
            as: 'courses',
            where: { published: true },
            required: false // LEFT JOIN pour avoir la catégorie même sans cours
        }]
    });

    if (!category) {
        throw new Error('Catégorie non trouvée');
    }

    return category;
};

// Créer une nouvelle catégorie
const createCategory = async (categoryData) => {
    const { name, description } = categoryData;

    // Vérifier si la catégorie existe déjà
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
        throw new Error('Une catégorie avec ce nom existe déjà');
    }

    const newCategory = await Category.create({
        name,
        description
    });

    return newCategory;
};

const getCategoryWithCourses = async (id) => {
    const category = await Category.findByPk(id, {
        include: [{
            model: Course,
            as: 'Courses' // ou 'courses' selon vos associations
        }]
    });

    if (!category) {
        throw new Error('Catégorie non trouvée');
    }

    return category;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    getCategoryWithCourses
};