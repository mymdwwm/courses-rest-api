const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { validateRegister, validateLogin } = require('../validators/authValidator');
const { authenticateToken } = require('../middleware/auth');

// Routes publiques
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     description: Créer un nouveau compte utilisateur avec email, username et mot de passe
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur (min 3 caractères)
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email unique
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe (min 6 caractères)
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 description: Rôle de l'utilisateur
 *                 enum: [instructor, admin]
 *                 default: instructor
 *                 example: "instructor"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
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
 *                   example: "Utilisateur créé avec succès"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Token JWT pour l'authentification
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Erreur de validation ou email déjà utilisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/register', validateRegister, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Authentifier un utilisateur et obtenir un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Connexion réussie
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
 *                   example: "Connexion réussie"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Token JWT valide pour 24h
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Email ou mot de passe incorrect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/login', validateLogin, authController.login);

// Routes protégées
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;