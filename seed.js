const db = require('./config/database');
const Category = require('./model/Category');
const Course = require('./model/Course');
const User = require('./model/User');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
    try {
        // Réinitialiser la base de données
        await db.sync({ force: true });
        console.log('Base de données réinitialisée');

        // Créer des utilisateurs
        const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
        const hashedPasswordInstructor = await bcrypt.hash('instructor123', 10);

        const admin = await User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: hashedPasswordAdmin,
            role: 'admin'
        });

        const instructor = await User.create({
            username: 'instructor1',
            email: 'instructor@example.com',
            password: hashedPasswordInstructor,
            role: 'instructor'
        });

        console.log('✓ Utilisateurs créés');

        // Créer des catégories
        const devWebCategory = await Category.create({
            name: 'Développement Web',
            description: 'Cours sur le développement web moderne (HTML, CSS, JavaScript, React, Node.js)'
        });

        const dataScienceCategory = await Category.create({
            name: 'Data Science',
            description: 'Analyse de données, machine learning et intelligence artificielle'
        });

        const designCategory = await Category.create({
            name: 'Design',
            description: 'Design graphique, UI/UX et outils créatifs'
        });

        const marketingCategory = await Category.create({
            name: 'Marketing Digital',
            description: 'Marketing en ligne, SEO, réseaux sociaux et publicité digitale'
        });

        console.log('✓ Catégories créées');

        // Créer des cours pour Développement Web
        await Course.create({
            title: 'Introduction à JavaScript',
            description: 'Apprenez les bases de JavaScript de manière progressive. Ce cours couvre les variables, fonctions, boucles, objets et le DOM.',
            duration: 120,
            level: 'débutant',
            price: 29.99,
            published: true,
            instructor: 'Jean Dupont',
            categoryId: devWebCategory.id
        });

        await Course.create({
            title: 'React Avancé',
            description: 'Maîtrisez React et ses concepts avancés : hooks, context API, performance, tests unitaires et patterns avancés.',
            duration: 180,
            level: 'avancé',
            price: 49.99,
            published: true,
            instructor: 'Marie Martin',
            categoryId: devWebCategory.id
        });

        await Course.create({
            title: 'Node.js et Express',
            description: 'Créez des APIs REST professionnelles avec Node.js et Express. Authentification, bases de données et déploiement.',
            duration: 150,
            level: 'intermédiaire',
            price: 39.99,
            published: true,
            instructor: 'Pierre Durand',
            categoryId: devWebCategory.id
        });

        await Course.create({
            title: 'HTML & CSS Moderne',
            description: 'Maîtrisez HTML5 et CSS3 avec Flexbox, Grid, animations et responsive design. Projets pratiques inclus.',
            duration: 90,
            level: 'débutant',
            price: 19.99,
            published: true,
            instructor: 'Sophie Bernard',
            categoryId: devWebCategory.id
        });

        // Créer des cours pour Data Science
        await Course.create({
            title: 'Python pour la Data Science',
            description: 'Apprenez Python et ses bibliothèques essentielles : NumPy, Pandas, Matplotlib pour l\'analyse de données.',
            duration: 200,
            level: 'débutant',
            price: 44.99,
            published: true,
            instructor: 'Lucas Mercier',
            categoryId: dataScienceCategory.id
        });

        await Course.create({
            title: 'Machine Learning avec Scikit-Learn',
            description: 'Découvrez les algorithmes de machine learning et leur implémentation avec scikit-learn. Projets réels inclus.',
            duration: 220,
            level: 'avancé',
            price: 59.99,
            published: true,
            instructor: 'Emma Dubois',
            categoryId: dataScienceCategory.id
        });

        await Course.create({
            title: 'Visualisation de Données',
            description: 'Créez des visualisations impactantes avec Matplotlib, Seaborn et Plotly. Storytelling avec les données.',
            duration: 100,
            level: 'intermédiaire',
            price: 34.99,
            published: true,
            instructor: 'Thomas Petit',
            categoryId: dataScienceCategory.id
        });

        // Créer des cours pour Design
        await Course.create({
            title: 'Figma pour Débutants',
            description: 'Apprenez à créer des maquettes et prototypes professionnels avec Figma. Interface design et collaboration.',
            duration: 80,
            level: 'débutant',
            price: 24.99,
            published: true,
            instructor: 'Léa Roux',
            categoryId: designCategory.id
        });

        await Course.create({
            title: 'UX Design Avancé',
            description: 'Maîtrisez les principes UX : recherche utilisateur, personas, tests d\'utilisabilité et architecture de l\'information.',
            duration: 160,
            level: 'avancé',
            price: 54.99,
            published: true,
            instructor: 'Antoine Moreau',
            categoryId: designCategory.id
        });

        // Créer des cours pour Marketing
        await Course.create({
            title: 'SEO et Marketing de Contenu',
            description: 'Optimisez votre présence en ligne avec le SEO moderne et le marketing de contenu stratégique.',
            duration: 130,
            level: 'intermédiaire',
            price: 37.99,
            published: true,
            instructor: 'Camille Laurent',
            categoryId: marketingCategory.id
        });

        await Course.create({
            title: 'Publicité Facebook et Instagram',
            description: 'Créez et gérez des campagnes publicitaires rentables sur Facebook et Instagram. ROI et optimisation.',
            duration: 110,
            level: 'débutant',
            price: 32.99,
            published: true,
            instructor: 'Nicolas Simon',
            categoryId: marketingCategory.id
        });

        // Créer un cours non publié
        await Course.create({
            title: 'TypeScript Avancé (En préparation)',
            description: 'Ce cours sera bientôt disponible. Types avancés, generics, decorators et best practices.',
            duration: 170,
            level: 'avancé',
            price: 49.99,
            published: false,
            instructor: 'Jean Dupont',
            categoryId: devWebCategory.id
        });

        console.log('✓ Cours créés');
        console.log('Base de données initialisée avec succès !');
        console.log(' Utilisateurs créés :');
        console.log('   - Admin : admin@example.com / admin123');
        console.log('   - Instructor : instructor@example.com / instructor123');
        console.log('Catégories : 4');
        console.log(' Cours : 12 (dont 11 publiés)');
        
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
    } finally {
        await db.close();
        console.log('Connexion à la base de données fermée');
    }
};

seedDatabase();