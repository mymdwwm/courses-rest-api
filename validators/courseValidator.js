const { body, param, query, validationResult } = require('express-validator');

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Erreurs de validation',
            errors: errors.array()
        });
    }
    next();
};

// Validation pour la création d'un cours
const validateCreateCourse = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Le titre est requis')
        .isLength({ min: 3, max: 200 })
        .withMessage('Le titre doit contenir entre 3 et 200 caractères'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('La description est requise')
        .isLength({ min: 10 })
        .withMessage('La description doit contenir au moins 10 caractères'),
    body('duration')
        .isInt({ min: 1 })
        .withMessage('La durée doit être un nombre positif (en minutes)'),
    body('level')
        .trim()
        .notEmpty()
        .withMessage('Le niveau est requis')
        .isIn(['débutant', 'intermédiaire', 'avancé'])
        .withMessage('Le niveau doit être: débutant, intermédiaire ou avancé'),
    body('price')
        .isFloat({ min: 0 })
        .withMessage('Le prix doit être un nombre positif ou zéro'),
    body('published')
        .optional()
        .isBoolean()
        .withMessage('Le champ published doit être un booléen'),
    body('instructor')
        .trim()
        .notEmpty()
        .withMessage('Le nom de l\'instructeur est requis'),
    body('categoryId')
        .isInt({ min: 1 })
        .withMessage('L\'ID de la catégorie doit être un entier positif'),
    handleValidationErrors
];

// Validation pour la mise à jour d'un cours
const validateUpdateCourse = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif'),
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Le titre ne peut pas être vide')
        .isLength({ min: 3, max: 200 })
        .withMessage('Le titre doit contenir entre 3 et 200 caractères'),
    body('description')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('La description ne peut pas être vide')
        .isLength({ min: 10 })
        .withMessage('La description doit contenir au moins 10 caractères'),
    body('duration')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La durée doit être un nombre positif (en minutes)'),
    body('level')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Le niveau ne peut pas être vide')
        .isIn(['débutant', 'intermédiaire', 'avancé'])
        .withMessage('Le niveau doit être: débutant, intermédiaire ou avancé'),
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Le prix doit être un nombre positif ou zéro'),
    body('published')
        .optional()
        .isBoolean()
        .withMessage('Le champ published doit être un booléen'),
    body('instructor')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Le nom de l\'instructeur ne peut pas être vide'),
    body('categoryId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('L\'ID de la catégorie doit être un entier positif'),
    handleValidationErrors
];

// Validation pour récupérer un cours par ID
const validateGetCourseById = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif'),
    handleValidationErrors
];

// Validation pour récupérer les cours par niveau
const validateGetCoursesByLevel = [
    param('level')
        .trim()
        .notEmpty()
        .withMessage('Le niveau est requis')
        .isIn(['débutant', 'intermédiaire', 'avancé'])
        .withMessage('Le niveau doit être: débutant, intermédiaire ou avancé'),
    handleValidationErrors
];

// Validation pour supprimer un cours
const validateDeleteCourse = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif'),
    handleValidationErrors
];

// BONUS : Validation pour la recherche par mot-clé
const validateSearchCourses = [
    query('keyword')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Le mot-clé ne peut pas être vide')
        .isLength({ min: 2 })
        .withMessage('Le mot-clé doit contenir au moins 2 caractères'),
    handleValidationErrors
];

// BONUS : Validation pour le filtrage par prix
const validateFilterCourses = [
    query('minPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Le prix minimum doit être un nombre positif'),
    query('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Le prix maximum doit être un nombre positif'),
    handleValidationErrors
];

module.exports = {
    validateCreateCourse,
    validateUpdateCourse,
    validateGetCourseById,
    validateGetCoursesByLevel,
    validateDeleteCourse,
    validateSearchCourses,
    validateFilterCourses
};