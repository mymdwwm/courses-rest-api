const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');
const {
    validateCreateCourse,
    validateUpdateCourse,
    validateGetCourseById,
    validateGetCoursesByLevel,
    validateDeleteCourse,
    validateSearchCourses,
    validateFilterCourses
} = require('../validators/courseValidator');
const { authenticateToken, requireAdmin, requireInstructorOrAdmin } = require('../middleware/auth');

// Routes publiques (GET)
/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Récupérer tous les cours publiés
 *     description: Retourne la liste complète de tous les cours publiés disponibles dans la base de données
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Liste des cours récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *                 count:
 *                   type: integer
 *                   description: Nombre total de cours
 *                   example: 10
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', courseController.getAllCourses);

router.get('/:id', validateGetCourseById, courseController.getCourseById);
router.get('/level/:level', validateGetCoursesByLevel, courseController.getCoursesByLevel);

// BONUS : Routes de recherche et filtrage (publiques)
router.get('/search', validateSearchCourses, courseController.searchCourses);
router.get('/filter', validateFilterCourses, courseController.filterCourses);

// Routes protégées (POST/PUT/DELETE - nécessitent une authentification)
/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Créer un nouveau cours
 *     description: Crée un nouveau cours dans la base de données (nécessite une authentification instructor ou admin)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - duration
 *               - level
 *               - price
 *               - instructor
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre du cours
 *                 example: "Introduction à JavaScript"
 *               description:
 *                 type: string
 *                 description: Description du cours
 *                 example: "Apprenez les bases de JavaScript de manière progressive"
 *               duration:
 *                 type: integer
 *                 description: Durée du cours en minutes
 *                 example: 120
 *               level:
 *                 type: string
 *                 description: Niveau du cours
 *                 enum: [débutant, intermédiaire, avancé]
 *                 example: "débutant"
 *               price:
 *                 type: number
 *                 description: Prix du cours
 *                 example: 29.99
 *               published:
 *                 type: boolean
 *                 description: Statut de publication
 *                 example: false
 *               instructor:
 *                 type: string
 *                 description: Nom de l'instructeur
 *                 example: "Jean Dupont"
 *               categoryId:
 *                 type: integer
 *                 description: ID de la catégorie
 *                 example: 1
 *     responses:
 *       201:
 *         description: Cours créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cours créé avec succès"
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       400:
 *         description: Erreur de validation des données
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Non authentifié - Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Accès refusé - Droits instructor ou admin requis
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authenticateToken, requireInstructorOrAdmin, validateCreateCourse, courseController.createCourse);
router.put('/:id', authenticateToken, requireInstructorOrAdmin, validateUpdateCourse, courseController.updateCourse);
router.delete('/:id', authenticateToken, requireAdmin, validateDeleteCourse, courseController.deleteCourse);

module.exports = router;