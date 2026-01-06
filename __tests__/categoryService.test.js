const categoryService = require('../service/categoryService');
const db = require('../config/database');

// Configuration Jest pour les tests asynchrones
beforeAll(async () => {
    // Synchroniser la base de données avant les tests
    await db.sync({ force: true });
});

afterAll(async () => {
    // Fermer la connexion à la base de données après les tests
    await db.close();
});

describe('categoryService', () => {
    describe('getAllCategories', () => {
        test('devrait retourner un tableau vide si aucune catégorie n\'existe', async () => {
            const categories = await categoryService.getAllCategories();
            expect(Array.isArray(categories)).toBe(true);
            expect(categories.length).toBe(0);
        });

        test('devrait retourner toutes les catégories', async () => {
            await categoryService.createCategory({
                name: 'Développement Web',
                description: 'Cours sur le développement web'
            });

            await categoryService.createCategory({
                name: 'Data Science',
                description: 'Cours sur la data science'
            });

            const categories = await categoryService.getAllCategories();
            expect(categories.length).toBe(2);
            expect(categories[0].name).toBe('Développement Web');
            expect(categories[1].name).toBe('Data Science');
        });
    });

    describe('createCategory', () => {
        test('devrait créer une nouvelle catégorie avec toutes les données', async () => {
            const categoryData = {
                name: 'Design',
                description: 'Cours de design graphique'
            };

            const category = await categoryService.createCategory(categoryData);
            expect(category).toBeDefined();
            expect(category.id).toBeDefined();
            expect(category.name).toBe(categoryData.name);
            expect(category.description).toBe(categoryData.description);
        });

        test('devrait créer une catégorie sans description', async () => {
            const categoryData = {
                name: 'Marketing'
            };

            const category = await categoryService.createCategory(categoryData);
            expect(category).toBeDefined();
            expect(category.name).toBe('Marketing');
            expect(category.description).toBeNull();
        });

        test('devrait lancer une erreur si le nom est déjà utilisé', async () => {
            await categoryService.createCategory({
                name: 'Catégorie Unique',
                description: 'Description'
            });

            // Tenter de créer une catégorie avec le même nom
            await expect(
                categoryService.createCategory({
                    name: 'Catégorie Unique',
                    description: 'Autre description'
                })
            ).rejects.toThrow();
        });
    });

    describe('getCategoryWithCourses', () => {
        test('devrait retourner une catégorie avec ses cours', async () => {
            const Category = require('../model/Category');
            const Course = require('../model/Course');

            // Créer une catégorie
            const category = await categoryService.createCategory({
                name: 'Programmation',
                description: 'Cours de programmation'
            });

            // Créer des cours associés
            await Course.create({
                title: 'JavaScript Basics',
                description: 'Apprendre JavaScript',
                duration: 120,
                level: 'débutant',
                price: 29.99,
                published: true,
                instructor: 'John Doe',
                categoryId: category.id
            });

            await Course.create({
                title: 'Advanced React',
                description: 'React avancé',
                duration: 180,
                level: 'avancé',
                price: 49.99,
                published: true,
                instructor: 'Jane Smith',
                categoryId: category.id
            });

            const result = await categoryService.getCategoryWithCourses(category.id);
            expect(result).toBeDefined();
            expect(result.name).toBe('Programmation');
            expect(result.Courses).toBeDefined();
            expect(result.Courses.length).toBe(2);
        });

        test('devrait retourner une catégorie sans cours', async () => {
            const category = await categoryService.createCategory({
                name: 'Catégorie Vide',
                description: 'Sans cours'
            });

            const result = await categoryService.getCategoryWithCourses(category.id);
            expect(result).toBeDefined();
            expect(result.name).toBe('Catégorie Vide');
            expect(result.Courses).toBeDefined();
            expect(result.Courses.length).toBe(0);
        });

        test('devrait lancer une erreur pour une catégorie inexistante', async () => {
            await expect(categoryService.getCategoryWithCourses(9999)).rejects.toThrow('Catégorie non trouvée');
        });
    });

    describe('getCategoryById', () => {
        test('devrait retourner une catégorie existante', async () => {
            const newCategory = await categoryService.createCategory({
                name: 'Test Category',
                description: 'Description de test'
            });

            const category = await categoryService.getCategoryById(newCategory.id);
            expect(category).toBeDefined();
            expect(category.name).toBe('Test Category');
            expect(category.id).toBe(newCategory.id);
        });

        test('devrait lancer une erreur pour une catégorie inexistante', async () => {
            await expect(categoryService.getCategoryById(9999)).rejects.toThrow();
        });
    });
});
