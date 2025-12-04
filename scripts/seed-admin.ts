import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Vérifier que la variable d'environnement DATABASE_URL est définie
if (!process.env.DATABASE_URL) {
  console.error('❌ La variable d\'environnement DATABASE_URL n\'est pas définie');
  console.error('Veuillez créer un fichier .env avec la variable DATABASE_URL configurée');
  console.error('Vous pouvez copier .env.example vers .env et modifier les valeurs');
  process.exit(1);
}

console.log('DATABASE_URL:', process.env.DATABASE_URL);

// Initialiser Prisma Client avec les options par défaut
const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Création de l'utilisateur administrateur
    const adminUser = await prisma.user.create({
      data: {
        name: 'Administrateur',
        email: 'admin@namahouse.com',
        password: '$2b$10$rJ7M0TJQv/QG5l8./a.ceuWfPzJZ.JyZV2.y3A1fF.rO/.jxdhOqG', // mot de passe: admin123
        role: 'admin',
        emailVerified: new Date(),
      },
    });

    console.log('✅ Administrateur créé avec succès:');
    console.log(`ID: ${adminUser.id}`);
    console.log(`Nom: ${adminUser.name}`);
    console.log(`Email: ${adminUser.email}`);
    console.log(`Rôle: ${adminUser.role}`);

  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      console.log('⚠️  L\'administrateur existe déjà dans la base de données');
    } else {
      console.error('❌ Erreur lors de la création de l\'administrateur:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();