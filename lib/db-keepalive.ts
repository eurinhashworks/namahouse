// @ts-nocheck
import { PrismaClient } from "@prisma/client";

// Configuration de Prisma Client avec les options appropriées
const prisma = new PrismaClient({});

/**
 * Script de keepalive pour maintenir la connexion à la base de données active
 * Effectue un ping toutes les 10 secondes
 */
async function keepAlive() {
  try {
    // Exécuter une requête simple pour vérifier la connexion
    await prisma.$queryRaw`SELECT 1`;
    console.log("[DB Keepalive] Ping réussi -", new Date().toISOString());
  } catch (error) {
    console.error("[DB Keepalive] Erreur de ping -", error);
  }
}

// Démarrer le keepalive
console.log("Démarrage du script de keepalive de la base de données...");
keepAlive(); // Premier ping immédiat

// Ping toutes les 10 secondes
const interval = setInterval(keepAlive, 10000);

// Gérer l'arrêt propre du script
process.on('SIGINT', async () => {
  console.log("Arrêt du script de keepalive...");
  clearInterval(interval);
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log("Arrêt du script de keepalive...");
  clearInterval(interval);
  await prisma.$disconnect();
  process.exit(0);
});