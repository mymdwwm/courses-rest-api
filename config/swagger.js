const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestion de Cours en Ligne',
            version: '1.0.0',
            description: 'API REST complète pour gérer une plateforme de cours en ligne avec authentification JWT',
            contact: {
                name: 'Support API',
                email: 'support@courses-api.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3007',
                description: 'Serveur de développement'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Entrez votre token JWT obtenu lors de la connexion'
                }
            },
            schemas: {
                Course: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID unique du cours',
                            example: 1
                        },
                        title: {
                            type: 'string',
                            description: 'Titre du cours',
                            example: 'Introduction à JavaScript'
                        },
                        description: {
                            type: 'string',
                            description: 'Description détaillée du cours',
                            example: 'Apprenez les bases de JavaScript de manière progressive'
                        },
                        duration: {
                            type: 'integer',
                            description: 'Durée du cours en minutes',
                            example: 120
                        },
                        level: {
                            type: 'string',
                            description: 'Niveau de difficulté du cours',
                            enum: ['débutant', 'intermédiaire', 'avancé'],
                            example: 'débutant'
                        },
                        price: {
                            type: 'number',
                            format: 'float',
                            description: 'Prix du cours',
                            example: 29.99
                        },
                        published: {
                            type: 'boolean',
                            description: 'Statut de publication du cours',
                            example: true
                        },
                        instructor: {
                            type: 'string',
                            description: 'Nom de l\'instructeur',
                            example: 'Jean Dupont'
                        },
                        categoryId: {
                            type: 'integer',
                            description: 'ID de la catégorie associée',
                            example: 1
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de création',
                            example: '2024-01-15T10:30:00Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de dernière modification',
                            example: '2024-01-15T10:30:00Z'
                        }
                    }
                },
                Category: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID unique de la catégorie',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            description: 'Nom de la catégorie',
                            example: 'Développement Web'
                        },
                        description: {
                            type: 'string',
                            description: 'Description de la catégorie',
                            example: 'Cours sur le développement web moderne'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de création',
                            example: '2024-01-15T10:30:00Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de dernière modification',
                            example: '2024-01-15T10:30:00Z'
                        }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID unique de l\'utilisateur',
                            example: 1
                        },
                        username: {
                            type: 'string',
                            description: 'Nom d\'utilisateur',
                            example: 'johndoe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Adresse email',
                            example: 'john.doe@example.com'
                        },
                        role: {
                            type: 'string',
                            description: 'Rôle de l\'utilisateur',
                            enum: ['instructor', 'admin'],
                            example: 'instructor'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date d\'inscription',
                            example: '2024-01-15T10:30:00Z'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            description: 'Message d\'erreur',
                            example: 'Une erreur est survenue'
                        },
                        error: {
                            type: 'string',
                            description: 'Détails de l\'erreur',
                            example: 'Détails techniques de l\'erreur'
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Auth',
                description: 'Endpoints d\'authentification et de gestion des utilisateurs'
            },
            {
                name: 'Courses',
                description: 'Endpoints de gestion des cours'
            },
            {
                name: 'Categories',
                description: 'Endpoints de gestion des catégories'
            }
        ]
    },
    apis: ['./router/*.js', './index.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;