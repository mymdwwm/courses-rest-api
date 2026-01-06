const express = require('express');
const db = require('./config/database');
const courseRouter = require('./router/courseRouter');
const categoryRouter = require('./router/categoryRouter');
const authRouter = require('./router/authRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.json());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes d'authentification
app.use('/auth', authRouter);

// Routes de l'API
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);

const initDatabase = async () => {
    try {
        await db.sync(); // permet de se connecter et de créer la base de données
        console.log('✓ Base de données connectée');
        
        app.listen(PORT, () => {
            console.log(` Serveur démarré sur http://localhost:${PORT}`);
            console.log(` Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Erreur initialisation:', error);
    }
};

initDatabase();