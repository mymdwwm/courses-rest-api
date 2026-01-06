const courseService = require('../service/courseService');

// Récupérer tous les cours publiés
const getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json({
            success: true,
            data: courses,
            count: courses.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des cours',
            error: error.message
        });
    }
};

// Récupérer un cours par son ID
const getCourseById = async (req, res) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Récupérer les cours par niveau
const getCoursesByLevel = async (req, res) => {
    try {
        const courses = await courseService.getCoursesByLevel(req.params.level);
        res.status(200).json({
            success: true,
            data: courses,
            count: courses.length,
            level: req.params.level
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des cours par niveau',
            error: error.message
        });
    }
};

// Créer un nouveau cours
const createCourse = async (req, res) => {
    try {
        const newCourse = await courseService.createCourse(req.body);
        res.status(201).json({
            success: true,
            message: 'Cours créé avec succès',
            data: newCourse
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Mettre à jour un cours
const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Cours mis à jour avec succès',
            data: updatedCourse
        });
    } catch (error) {
        const statusCode = error.message.includes('non trouvé') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

// Supprimer un cours
const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await courseService.deleteCourse(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Cours supprimé avec succès',
            data: deletedCourse
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// BONUS : Recherche par mot-clé
const searchCourses = async (req, res) => {
    try {
        const { keyword } = req.query;
        const courses = await courseService.searchCourses(keyword);
        res.status(200).json({
            success: true,
            data: courses,
            count: courses.length,
            keyword: keyword || 'aucun'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la recherche des cours',
            error: error.message
        });
    }
};

// BONUS : Filtrage par prix
const filterCourses = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        const courses = await courseService.filterCourses(minPrice, maxPrice);
        res.status(200).json({
            success: true,
            data: courses,
            count: courses.length,
            filter: { minPrice: minPrice || 'aucun', maxPrice: maxPrice || 'aucun' }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors du filtrage des cours',
            error: error.message
        });
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    getCoursesByLevel,
    createCourse,
    updateCourse,
    deleteCourse,
    searchCourses,
    filterCourses
};