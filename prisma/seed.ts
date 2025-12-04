import { PrismaClient } from '@prisma/client';

// Cette fonction sera appelée par Prisma lors du seeding
async function main() {
  const prisma = new PrismaClient();
  
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

// Exécution du script
main().catch((e) => {
  console.error(e);
  process.exit(1);
});