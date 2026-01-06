const courseService = require('../service/courseService');
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

describe('courseService', () => {
    // Variables pour stocker les données de test
    let testCategoryId;
    let testCourseId;

    beforeEach(async () => {
        // Créer une catégorie de test avant chaque test
        const Category = require('../model/Category');
        const category = await Category.create({
            name: 'Test Category',
            description: 'Description de test'
        });
        testCategoryId = category.id;
    });

    describe('getAllCourses', () => {
        test('devrait retourner un tableau vide si aucun cours publié n\'existe', async () => {
            const courses = await courseService.getAllCourses();
            expect(Array.isArray(courses)).toBe(true);
            expect(courses.length).toBe(0);
        });

        test('devrait retourner tous les cours publiés', async () => {
            // Créer deux cours, un publié et un non publié
            await courseService.createCourse({
                title: 'Cours publié',
                description: 'Description du cours publié',
                duration: 120,
                level: 'débutant',
                price: 29.99,
                published: true,
                instructor: 'Test Instructor',
                categoryId: testCategoryId
            });

            await courseService.createCourse({
                title: 'Cours non publié',
                description: 'Description du cours non publié',
                duration: 90,
                level: 'intermédiaire',
                price: 39.99,
                published: false,
                instructor: 'Test Instructor',
                categoryId: testCategoryId
            });

            const courses = await courseService.getAllCourses();
            expect(courses.length).toBe(1);
            expect(courses[0].title).toBe('Cours publié');
            expect(courses[0].published).toBe(true);
        });
    });

    describe('getCourseById', () => {
        test('devrait retourner un cours existant', async () => {
            const newCourse = await courseService.createCourse({
                title: 'Cours de test',
                description: 'Description du cours de test',
                duration: 120,
                level: 'débutant',
                price: 29.99,
                published: true,
                instructor: 'Test Instructor',
                categoryId: testCategoryId
            });

            const course = await courseService.getCourseById(newCourse.id);
            expect(course).toBeDefined();
            expect(course.title).toBe('Cours de test');
            expect(course.id).toBe(newCourse.id);
        });

        test('devrait lancer une erreur pour un cours inexistant', async () => {
            await expect(courseService.getCourseById(9999)).rejects.toThrow('Cours non trouvé');
        });
    });

    describe('createCourse', () => {
        test('devrait créer un nouveau cours avec toutes les données valides', async () => {
            const courseData = {
                title: 'Nouveau cours',
                description: 'Description du nouveau cours',
                duration: 150,
                level: 'intermédiaire',
                price: 49.99,
                published: true,
                instructor: 'Test Instructor',
                categoryId: testCategoryId
            };

            const course = await courseService.createCourse(courseData);
            expect(course).toBeDefined();
            expect(course.id).toBeDefined();
            expect(course.title).toBe(courseData.title);
            expect(course.description).toBe(courseData.description);
            expect(course.duration).toBe(courseData.duration);
            expect(course.level).toBe(courseData.level);
            expect(course.price).toBe(courseData.price);
            expect(course.instructor).toBe(courseData.instructor);
        });

        test('devrait créer un cours avec published = false par défaut', async () => {
            const courseData = {
                title: 'Cours sans published',
                description: 'Description du cours',
                duration: 120,
                level: 'débutant',
                price: 29.99,
                instructor: 'Test Instructor',
                categoryId: testCategoryId
            };

            const course = await courseService.createCourse(courseData);
            expect(course.published).toBe(false);
        });

        test('devrait lancer une erreur si la catégorie n\'existe pas', async () => {
            const courseData = {
                title: 'Cours invalide',
                description: 'Description du cours invalide',
                duration: 120,
                level: 'débutant',
                price: 29.99,
                instructor: 'Test Instructor',
                categoryId: 9999 // ID inexistant
            };

            await expect(courseService.createCourse(courseData)).rejects.toThrow();
        });
    });

    describe('updateCourse', () => {
        test('devrait mettre à jour un cours existant', async () => {
            const course = await courseService.createCourse({
                title: 'Cours à modifier',
                description: 'Description originale',
                duration: 120,
                level: 'débutant',
                price: 29.99,
                published: false,
                instructor: 'Test Instructor',
                categoryId: testCategoryId
            });

            const updatedData = {
                title: 'Cours modifié',
                price: 39.99,
                published: true
            };

            const updatedCourse = await courseService.updateCourse(course.id, updatedData);
            expect(updatedCourse.title).toBe('Cours modifié');
            expect(updatedCourse.price).toBe(39.99);
            expect(updatedCourse.published).toBe(true);
            expect(updatedCourse.description).toBe('Description originale'); // Inchangé
        });

        test('devrait lancer une erreur pour un cours inexistant', async () => {
            await expect(courseService.updateCourse(9999, { title: 'Test' })).rejects.toThrow('Cours non trouvé');
        });
    });

    describe('deleteCourse', () => {
        test('devrait supprimer un cours existant', async () => {
            const course = await courseService.createCourse({
                title: 'Cours à supprimer',
                description: 'Description du cours',
                duration: 120,
                level: 'débutant',
                price: 29.99,
                instructor: 'Test Instructor',
                categoryId: testCategoryId
            });

            const deletedCourse = await courseService.deleteCourse(course.id);
            expect(deletedCourse).toBeDefined();
            expect(deletedCourse.id).toBe(course.id);

            // Vérifier que le cours n'existe plus
            await expect(courseService.getCourseById(course.id)).rejects.toThrow('Cours non trouvé');
        });

        test('devrait lancer une erreur pour un cours inexistant', async () => {
            await expect(courseService.deleteCourse(9999)).rejects.toThrow('Cours non trouvé');
        });
    });

    describe('getCoursesByLevel', () => {
        test('devrait retourner tous les cours du niveau spécifié', async () => {
            await courseService.createCourse({
                title: 'Cours débutant 1',
                description: 'Description',
                duration: 120,
                level: 'débutant',
                price: 29.99,
                published: true,
                instructor: 'Test Instructor',
                categoryId: testCategoryId
            });

            await courseService.createCourse({
                title: 'Cours débutant 2',
                description: 'Description',
                duration: 90,
                level: 'débutant',
                price: 19.99,
                published: true,
                instructor: 'Test Instructor',
                categoryId: testCategoryId
            });

            await courseService.createCourse({
                title: 'Cours avancé',
                description: 'Description',
                duration: 180,
                level: 'avancé',
                price: 59.99,
                published: true,
                instructor: 'Test Instructor',
                categoryId: testCategoryId
            });

            const beginnerCourses = await courseService.getCoursesByLevel('débutant');
            expect(beginnerCourses.length).toBe(2);
            beginnerCourses.forEach(course => {
                expect(course.level).toBe('débutant');
            });
        });
    });
});