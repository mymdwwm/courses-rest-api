const { body, param, validationResult } = require('express-validator');

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

// Validation pour la création d'une catégorie
const validateCreateCategory = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Le nom est requis')
        .isLength({ min: 3, max: 100 })
        .withMessage('Le nom doit contenir entre 3 et 100 caractères'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La description ne peut pas dépasser 500 caractères'),
    handleValidationErrors
];

// Validation pour récupérer une catégorie par ID
const validateGetCategoryById = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif'),
    handleValidationErrors
];

module.exports = {
    validateCreateCategory,
    validateGetCategoryById
};