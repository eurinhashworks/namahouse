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

console.log('🚀 Script d\'importation des produits');

// Initialiser Prisma Client avec l'adaptateur PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Charger les données depuis le fichier JSON
let categoriesData: any[] = [];
let productsData: any[] = [];

try {
  const rawData = fs.readFileSync(path.resolve(__dirname, './products-data.json'), 'utf-8');
  const jsonData = JSON.parse(rawData);
  categoriesData = jsonData.categories || [];
  productsData = jsonData.products || [];
  console.log(`📄 ${categoriesData.length} catégories et ${productsData.length} produits chargés depuis le fichier JSON`);
} catch (error) {
  console.error('❌ Erreur lors du chargement du fichier products-data.json:', error);
  process.exit(1);
}

async function importCategories() {
  console.log('📂 Importation des catégories...');
  
  const categories = [];
  for (const categoryData of categoriesData) {
    try {
      const category = await prisma.category.upsert({
        where: { slug: categoryData.slug },
        update: {
          name: categoryData.name,
          image: categoryData.image || null
        },
        create: {
          name: categoryData.name,
          slug: categoryData.slug,
          image: categoryData.image || null
        }
      });
      categories.push(category);
      console.log(`✅ Catégorie "${category.name}" importée`);
    } catch (error) {
      console.error(`❌ Erreur lors de l'importation de la catégorie "${categoryData.name}":`, error);
    }
  }
  
  return categories;
}

async function importProducts(categories: any[]) {
  console.log('📦 Importation des produits...');
  
  for (const productData of productsData) {
    try {
      // Trouver la catégorie correspondante
      const category = categories.find(c => c.name === productData.categoryName);
      
      if (!category) {
        console.error(`❌ Catégorie "${productData.categoryName}" non trouvée pour le produit "${productData.name}"`);
        continue;
      }
      
      // Générer le slug à partir du nom
      const slug = productData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Préparer les données du produit
      const productPayload = {
        name: productData.name,
        slug: slug,
        description: productData.description,
        price: productData.price,
        images: productData.images,
        categoryId: category.id,
        stock: productData.stock,
        ...(productData.attributes && { attributes: productData.attributes })
      };
      
      // Créer ou mettre à jour le produit
      const product = await prisma.product.upsert({
        where: { slug: slug },
        update: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          images: productData.images,
          categoryId: category.id,
          stock: productData.stock,
          ...(productData.attributes && { attributes: productData.attributes })
        },
        create: productPayload
      });
      
      console.log(`✅ Produit "${product.name}" importé`);
    } catch (error) {
      console.error(`❌ Erreur lors de l'importation du produit "${productData.name}":`, error);
    }
  }
}

async function main() {
  try {
    console.log('🔌 Connexion à la base de données...');
    
    // Importer les catégories
    const categories = await importCategories();
    
    // Importer les produits
    await importProducts(categories);
    
    console.log('🎉 Importation terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'importation:', error);
  } finally {
    await prisma.$disconnect();
    console.log('🔒 Déconnexion de la base de données');
  }
}

// Exécuter le script
main();