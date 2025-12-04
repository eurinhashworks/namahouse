import dotenv from 'dotenv';
import path from 'path';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Vérifier que la variable d'environnement DATABASE_URL est définie
if (!process.env.DATABASE_URL) {
  console.error('❌ La variable d\'environnement DATABASE_URL n\'est pas définie');
  console.error('Veuillez créer un fichier .env avec la variable DATABASE_URL configurée');
  console.error('Vous pouvez copier .env.example vers .env et modifier les valeurs');
  process.exit(1);
}

// Fonction pour créer les tables nécessaires
async function createTables(client: any) {
  console.log('🔧 Vérification et création des tables si nécessaire...');
  
  // Créer la table User si elle n'existe pas
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS "User" (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      "emailVerified" TIMESTAMP WITH TIME ZONE,
      password TEXT,
      role TEXT DEFAULT 'customer',
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  
  await client.query(createUserTableQuery);
  console.log('✅ Table User vérifiée/créée');
}

async function createAdminUser() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Connecter le client
    await client.connect();
    
    // Créer les tables si elles n'existent pas
    await createTables(client);
    
    // Hacher le mot de passe
    const saltRounds = 10;
    const plainPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    
    // Créer l'administrateur
    const query = `
      INSERT INTO "User" (id, name, email, "emailVerified", password, role, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
      RETURNING id, name, email, role;
    `;
    
    const values = [
      'admin-' + Date.now(), // ID unique
      'Administrateur',
      'admin@namahouse.com',
      new Date(),
      hashedPassword,
      'admin'
    ];
    
    const result = await client.query(query, values);
    
    if (result.rowCount && result.rowCount > 0) {
      console.log('✅ Administrateur créé avec succès:');
      console.log(`ID: ${result.rows[0].id}`);
      console.log(`Nom: ${result.rows[0].name}`);
      console.log(`Email: ${result.rows[0].email}`);
      console.log(`Rôle: ${result.rows[0].role}`);
    } else {
      console.log('⚠️  L\'administrateur existe déjà dans la base de données');
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('duplicate key value violates unique constraint')) {
        console.log('⚠️  L\'administrateur existe déjà dans la base de données');
      } else {
        console.error('❌ Erreur lors de la création de l\'administrateur:', error.message);
      }
    } else {
      console.error('❌ Erreur inconnue lors de la création de l\'administrateur:', error);
    }
  } finally {
    await client.end();
  }
}

// Exécuter le script
createAdminUser();