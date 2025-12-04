#!/usr/bin/env tsx
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Vérifier que la variable d'environnement DATABASE_URL est définie
if (!process.env.DATABASE_URL) {
  console.error('❌ La variable d\'environnement DATABASE_URL n\'est pas définie');
  console.error('Veuillez créer un fichier .env avec la variable DATABASE_URL configurée');
  console.error('Vous pouvez copier .env.example vers .env et modifier les valeurs');
  process.exit(1);
}

console.log('🚀 Création des tables dans la base de données...');

// Créer un pool de connexions
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTables() {
  let client;
  try {
    // Obtenir une connexion du pool
    client = await pool.connect();
    console.log('✅ Connexion réussie à la base de données!');
    
    // Créer les tables nécessaires
    console.log('🔧 Création des tables...');
    
    // Créer la table User
    await client.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        "emailVerified" TIMESTAMP WITH TIME ZONE,
        image TEXT,
        password TEXT,
        role TEXT DEFAULT 'customer',
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table User créée');
    
    // Créer la table Account
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Account" (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        "providerAccountId" TEXT NOT NULL,
        "refresh_token" TEXT,
        "access_token" TEXT,
        "expires_at" INTEGER,
        "token_type" TEXT,
        scope TEXT,
        "id_token" TEXT,
        "session_state" TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table Account créée');
    
    // Créer la table Session
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Session" (
        id TEXT PRIMARY KEY,
        "sessionToken" TEXT UNIQUE NOT NULL,
        "userId" TEXT NOT NULL,
        expires TIMESTAMP WITH TIME ZONE NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table Session créée');
    
    // Créer la table VerificationToken
    await client.query(`
      CREATE TABLE IF NOT EXISTS "VerificationToken" (
        identifier TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires TIMESTAMP WITH TIME ZONE NOT NULL,
        PRIMARY KEY (identifier, token)
      );
    `);
    console.log('✅ Table VerificationToken créée');
    
    // Créer la table TwoFactor
    await client.query(`
      CREATE TABLE IF NOT EXISTS "TwoFactor" (
        id TEXT PRIMARY KEY,
        "userId" TEXT UNIQUE NOT NULL,
        secret TEXT NOT NULL,
        "backupCodes" TEXT[],
        enabled BOOLEAN DEFAULT false,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table TwoFactor créée');
    
    // Créer la table Category
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Category" (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        image TEXT,
        "parentId" TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table Category créée');
    
    // Créer la table Product
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Product" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        currency TEXT DEFAULT 'XOF',
        images TEXT[],
        "categoryId" TEXT NOT NULL,
        stock INTEGER DEFAULT 0,
        "soldCount" INTEGER DEFAULT 0,
        "isActive" BOOLEAN DEFAULT true,
        attributes JSONB,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table Product créée');
    
    // Créer la table ProductVariant
    await client.query(`
      CREATE TABLE IF NOT EXISTS "ProductVariant" (
        id TEXT PRIMARY KEY,
        "productId" TEXT NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL,
        attributes JSONB NOT NULL,
        images TEXT[],
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table ProductVariant créée');
    
    // Créer la table Cart
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Cart" (
        id TEXT PRIMARY KEY,
        "userId" TEXT,
        "sessionId" TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE("userId"),
        UNIQUE("sessionId")
      );
    `);
    console.log('✅ Table Cart créée');
    
    // Créer la table CartItem
    await client.query(`
      CREATE TABLE IF NOT EXISTS "CartItem" (
        id TEXT PRIMARY KEY,
        "cartId" TEXT NOT NULL,
        "productId" TEXT NOT NULL,
        "variantId" TEXT,
        quantity INTEGER NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table CartItem créée');
    
    // Créer la table Order
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Order" (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        total REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        "paymentId" TEXT,
        "shippingAddressId" TEXT NOT NULL,
        "billingAddressId" TEXT NOT NULL,
        "trackingNumber" TEXT,
        notes TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table Order créée');
    
    // Créer la table OrderItem
    await client.query(`
      CREATE TABLE IF NOT EXISTS "OrderItem" (
        id TEXT PRIMARY KEY,
        "orderId" TEXT NOT NULL,
        "productId" TEXT NOT NULL,
        "variantId" TEXT,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table OrderItem créée');
    
    // Créer la table Address
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Address" (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        company TEXT,
        address1 TEXT NOT NULL,
        address2 TEXT,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        "postalCode" TEXT NOT NULL,
        country TEXT NOT NULL,
        phone TEXT NOT NULL,
        "isDefault" BOOLEAN DEFAULT false,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table Address créée');
    
    // Créer la table Review
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Review" (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "productId" TEXT NOT NULL,
        rating INTEGER NOT NULL,
        title TEXT NOT NULL,
        comment TEXT NOT NULL,
        "isVerified" BOOLEAN DEFAULT false,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE("userId", "productId")
      );
    `);
    console.log('✅ Table Review créée');
    
    // Ajouter les contraintes de clés étrangères
    console.log('🔗 Ajout des contraintes de clés étrangères...');
    
    // Contraintes pour Account
    await client.query(`
      ALTER TABLE "Account" 
      ADD CONSTRAINT "Account_userId_fkey" 
      FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE;
    `);
    console.log('✅ Contraintes Account ajoutées');
    
    // Contraintes pour Session
    await client.query(`
      ALTER TABLE "Session" 
      ADD CONSTRAINT "Session_userId_fkey" 
      FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE;
    `);
    console.log('✅ Contraintes Session ajoutées');
    
    // Contraintes pour TwoFactor
    await client.query(`
      ALTER TABLE "TwoFactor" 
      ADD CONSTRAINT "TwoFactor_userId_fkey" 
      FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE;
    `);
    console.log('✅ Contraintes TwoFactor ajoutées');
    
    // Contraintes pour Category (auto-référencement)
    await client.query(`
      ALTER TABLE "Category" 
      ADD CONSTRAINT "Category_parentId_fkey" 
      FOREIGN KEY ("parentId") REFERENCES "Category"(id) ON DELETE SET NULL;
    `);
    console.log('✅ Contraintes Category ajoutées');
    
    // Contraintes pour Product
    await client.query(`
      ALTER TABLE "Product" 
      ADD CONSTRAINT "Product_categoryId_fkey" 
      FOREIGN KEY ("categoryId") REFERENCES "Category"(id) ON DELETE RESTRICT;
    `);
    console.log('✅ Contraintes Product ajoutées');
    
    // Contraintes pour ProductVariant
    await client.query(`
      ALTER TABLE "ProductVariant" 
      ADD CONSTRAINT "ProductVariant_productId_fkey" 
      FOREIGN KEY ("productId") REFERENCES "Product"(id) ON DELETE CASCADE;
    `);
    console.log('✅ Contraintes ProductVariant ajoutées');
    
    // Contraintes pour Cart
    await client.query(`
      ALTER TABLE "Cart" 
      ADD CONSTRAINT "Cart_userId_fkey" 
      FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE SET NULL;
    `);
    console.log('✅ Contraintes Cart ajoutées');
    
    // Contraintes pour CartItem
    await client.query(`
      ALTER TABLE "CartItem" 
      ADD CONSTRAINT "CartItem_cartId_fkey" 
      FOREIGN KEY ("cartId") REFERENCES "Cart"(id) ON DELETE CASCADE;
    `);
    await client.query(`
      ALTER TABLE "CartItem" 
      ADD CONSTRAINT "CartItem_productId_fkey" 
      FOREIGN KEY ("productId") REFERENCES "Product"(id) ON DELETE RESTRICT;
    `);
    await client.query(`
      ALTER TABLE "CartItem" 
      ADD CONSTRAINT "CartItem_variantId_fkey" 
      FOREIGN KEY ("variantId") REFERENCES "ProductVariant"(id) ON DELETE SET NULL;
    `);
    console.log('✅ Contraintes CartItem ajoutées');
    
    // Contraintes pour Order
    await client.query(`
      ALTER TABLE "Order" 
      ADD CONSTRAINT "Order_userId_fkey" 
      FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE RESTRICT;
    `);
    console.log('✅ Contraintes Order.userId ajoutées');
    
    // Contraintes pour OrderItem
    await client.query(`
      ALTER TABLE "OrderItem" 
      ADD CONSTRAINT "OrderItem_orderId_fkey" 
      FOREIGN KEY ("orderId") REFERENCES "Order"(id) ON DELETE CASCADE;
    `);
    await client.query(`
      ALTER TABLE "OrderItem" 
      ADD CONSTRAINT "OrderItem_productId_fkey" 
      FOREIGN KEY ("productId") REFERENCES "Product"(id) ON DELETE RESTRICT;
    `);
    await client.query(`
      ALTER TABLE "OrderItem" 
      ADD CONSTRAINT "OrderItem_variantId_fkey" 
      FOREIGN KEY ("variantId") REFERENCES "ProductVariant"(id) ON DELETE SET NULL;
    `);
    console.log('✅ Contraintes OrderItem ajoutées');
    
    // Contraintes pour Address
    await client.query(`
      ALTER TABLE "Address" 
      ADD CONSTRAINT "Address_userId_fkey" 
      FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE;
    `);
    console.log('✅ Contraintes Address ajoutées');
    
    // Contraintes pour Review
    await client.query(`
      ALTER TABLE "Review" 
      ADD CONSTRAINT "Review_userId_fkey" 
      FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE;
    `);
    await client.query(`
      ALTER TABLE "Review" 
      ADD CONSTRAINT "Review_productId_fkey" 
      FOREIGN KEY ("productId") REFERENCES "Product"(id) ON DELETE CASCADE;
    `);
    console.log('✅ Contraintes Review ajoutées');
    
    console.log('🎉 Toutes les tables ont été créées avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des tables:', error);
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

// Exécuter le script
createTables();