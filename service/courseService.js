const { Course, Category } = require('../config/associations');
const { Op } = require('sequelize');

// Récupérer tous les cours publiés
const getAllCourses = async () => {
    const courses = await Course.findAll({
        where: { published: true },
        include: [{
            model: Category,
            as: 'category',
            attributes: ['id', 'name']
        }],
        order: [['createdAt', 'DESC']]
    });
    return courses;
};

// Récupérer un cours par son ID
const getCourseById = async (courseId) => {
    const course = await Course.findByPk(courseId, {
        include: [{
            model: Category,
            as: 'category',
            attributes: ['id', 'name', 'description']
        }]
    });

    if (!course) {
        throw new Error('Cours non trouvé');
    }

    return course;
};

// Récupérer les cours par niveau
const getCoursesByLevel = async (level) => {
    const courses = await Course.findAll({
        where: { 
            level: level,
            published: true 
        },
        include: [{
            model: Category,
            as: 'category',
            attributes: ['id', 'name']
        }]
    });
    return courses;
};

// Créer un nouveau cours
const createCourse = async (courseData) => {
    const { title, description, duration, level, price, instructor, categoryId, published } = courseData;

    // Vérifier que la catégorie existe
    const category = await Category.findByPk(categoryId);
    if (!category) {
        throw new Error('Catégorie non trouvée');
    }

    const newCourse = await Course.create({
        title,
        description,
        duration,
        level,
        price,
        instructor,
        categoryId,
        published: published || false
    });

    return await getCourseById(newCourse.id);
};

// Modifier un cours
const updateCourse = async (courseId, courseData) => {
    const course = await Course.findByPk(courseId);

    if (!course) {
        throw new Error('Cours non trouvé');
    }

    // Si categoryId est modifié, vérifier qu'elle existe
    if (courseData.categoryId && courseData.categoryId !== course.categoryId) {
        const category = await Category.findByPk(courseData.categoryId);
        if (!category) {
            throw new Error('Catégorie non trouvée');
        }
    }

    await course.update(courseData);
    return await getCourseById(courseId);
};

// Supprimer un cours
const deleteCourse = async (courseId) => {
    const course = await Course.findByPk(courseId);

    if (!course) {
        throw new Error('Cours non trouvé');
    }

    await course.destroy();
    return course;
};

// BONUS : Recherche par mot-clé
const searchCourses = async (keyword) => {
    const courses = await Course.findAll({
        where: {
            published: true,
            [Op.or]: [
                { title: { [Op.like]: `%${keyword}%` } },
                { description: { [Op.like]: `%${keyword}%` } }
            ]
        },
        include: [{
            model: Category,
            as: 'category',
            attributes: ['id', 'name']
        }]
    });
    return courses;
};

// BONUS : Filtrer par prix
const filterCoursesByPrice = async (minPrice, maxPrice) => {
    const whereClause = {
        published: true,
        price: {}
    };

    if (minPrice !== undefined) {
        whereClause.price[Op.gte] = minPrice;
    }
    if (maxPrice !== undefined) {
        whereClause.price[Op.lte] = maxPrice;
    }

    const courses = await Course.findAll({
        where: whereClause,
        include: [{
            model: Category,
            as: 'category',
            attributes: ['id', 'name']
        }]
    });
    return courses;
};

module.exports = {
    getAllCourses,
    getCourseById,
    getCoursesByLevel,
    createCourse,
    updateCourse,
    deleteCourse,
    searchCourses,
    filterCoursesByPrice
};