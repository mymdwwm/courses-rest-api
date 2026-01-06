const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/jwt');
const { User } = require('../config/associations');

// Inscription d'un nouvel utilisateur
const register = async (userData) => {
    const { username, email, password, role } = userData;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Cet email est déjà utilisé');
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
        throw new Error('Ce nom d\'utilisateur est déjà pris');
    }

    // Créer le nouvel utilisateur
    const newUser = await User.create({
        username,
        email,
        password,
        role: role || 'instructor'
    });

    // Générer le token JWT
    const token = jwt.sign(
        { id: newUser.id, username: newUser.username, role: newUser.role },
        jwtSecret,
        { expiresIn: jwtExpire }
    );

    return {
        token,
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        }
    };
};

// Connexion d'un utilisateur
const login = async (credentials) => {
    const { email, password } = credentials;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new Error('Email ou mot de passe incorrect');
    }

    // Générer le token JWT
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        jwtSecret,
        { expiresIn: jwtExpire }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    register,
    login
};