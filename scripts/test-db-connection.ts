#!/usr/bin/env tsx
import { Pool } from 'pg';
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

console.log('🚀 Test de connexion à la base de données...');

// Créer un pool de connexions
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  let client;
  try {
    // Obtenir une connexion du pool
    client = await pool.connect();
    console.log('✅ Connexion réussie à la base de données!');
    
    // Exécuter une requête simple
    const result = await client.query('SELECT version()');
    console.log('📋 Version de la base de données:', result.rows[0].version);
    
    // Lister les schémas existants
    const schemas = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT LIKE 'pg_%' 
      AND schema_name != 'information_schema'
    `);
    console.log('📂 Schémas existants:', schemas.rows.map(row => row.schema_name));
    
  } catch (error) {
    console.error('❌ Erreur lors de la connexion à la base de données:', error);
  } finally {
    // Libérer la connexion
    if (client) {
      client.release();
    }
    // Fermer le pool
    await pool.end();
    console.log('🔒 Connexion fermée');
  }
}

// Exécuter le test
testConnection();