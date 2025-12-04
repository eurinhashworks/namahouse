#!/usr/bin/env tsx
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
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

console.log('🔍 Vérification des images importées dans la base de données...');

// Initialiser Prisma Client avec l'adaptateur PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function checkImportedImages() {
  try {
    // Récupérer tous les produits de la base de données
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        images: true,
      }
    });
    
    // Récupérer toutes les catégories de la base de données
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      }
    });
    
    // Compter les images de produits
    let productImageCount = 0;
    const productImages: string[] = [];
    
    console.log('\n📦 Images de produits dans la base de données:');
    for (const product of products) {
      if (product.images && product.images.length > 0) {
        console.log(`  ${product.name}:`);
        for (const image of product.images) {
          productImageCount++;
          productImages.push(image);
          console.log(`    - ${image}`);
        }
      }
    }
    
    // Compter les images de catégories
    let categoryImageCount = 0;
    const categoryImages: string[] = [];
    
    console.log('\n📂 Images de catégories dans la base de données:');
    for (const category of categories) {
      if (category.image) {
        categoryImageCount++;
        categoryImages.push(category.image);
        console.log(`  ${category.name}: ${category.image}`);
      }
    }
    
    // Total des images dans la base de données
    const totalDbImages = productImageCount + categoryImageCount;
    
    console.log(`\n📊 Résumé:`);
    console.log(`  - Images de produits: ${productImageCount}`);
    console.log(`  - Images de catégories: ${categoryImageCount}`);
    console.log(`  - Total dans la base de données: ${totalDbImages}`);
    
    // Vérifier les images dans le dossier public
    const publicDir = path.resolve(__dirname, '../public');
    const imageFiles: string[] = [];
    
    function walkDir(dir: string) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
          const relativePath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');
          imageFiles.push(relativePath);
        }
      }
    }
    
    walkDir(publicDir);
    
    console.log(`\n📁 Images dans le dossier public: ${imageFiles.length}`);
    
    // Comparer les images
    const importedImages = [...productImages, ...categoryImages];
    const missingImages = imageFiles.filter(image => !importedImages.includes(image));
    const unusedImages = importedImages.filter(image => !imageFiles.includes(image));
    
    console.log(`\n🔄 Comparaison:`);
    console.log(`  - Images importées dans la base: ${importedImages.length}`);
    console.log(`  - Images dans le dossier public: ${imageFiles.length}`);
    console.log(`  - Images manquantes (dans public mais pas en base): ${missingImages.length}`);
    console.log(`  - Images non utilisées (en base mais pas dans public): ${unusedImages.length}`);
    
    if (missingImages.length > 0) {
      console.log(`\n⚠️  Images manquantes:`);
      missingImages.forEach(image => console.log(`  - ${image}`));
    }
    
    if (unusedImages.length > 0) {
      console.log(`\n❓ Images non utilisées:`);
      unusedImages.forEach(image => console.log(`  - ${image}`));
    }
    
    if (missingImages.length === 0 && unusedImages.length === 0) {
      console.log(`\n✅ Toutes les images du dossier public sont importées dans la base de données!`);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification des images:', error);
  } finally {
    await prisma.$disconnect();
    console.log('\n🔒 Déconnexion de la base de données');
  }
}

// Exécuter le script
checkImportedImages();