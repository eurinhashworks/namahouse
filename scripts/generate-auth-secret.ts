/**
 * Script pour générer un secret sécurisé pour Better Auth
 * 
 * Utilisation :
 * pnpm generate:auth-secret
 */

import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Fonction pour générer une chaîne aléatoire sécurisée
function generateSecureSecret(length: number = 32): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let secret = '';
  
  // Utiliser crypto pour une génération plus sécurisée
  if (typeof require !== 'undefined') {
    try {
      const crypto = require('crypto');
      const buffer = crypto.randomBytes(length);
      secret = buffer.toString('hex');
      return secret;
    } catch (error) {
      console.warn('Crypto non disponible, utilisation de Math.random comme fallback');
    }
  }
  
  // Fallback si crypto n'est pas disponible
  for (let i = 0; i < length * 2; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    secret += chars[randomIndex];
  }
  
  return secret.substring(0, length);
}

// Générer et afficher le secret
const secret = generateSecureSecret(32);

console.log('🔐 Secret Better Auth généré :');
console.log(secret);
console.log('');
console.log('📋 Pour l\'utiliser :');
console.log('1. Copiez cette valeur dans votre fichier .env :');
console.log(`   BETTER_AUTH_SECRET=${secret}`);
console.log('2. Assurez-vous que ce secret est bien gardé et ne soit pas exposé publiquement');

export default secret;