# Scripts de Seed

Ce dossier contient des scripts pour peupler la base de données avec des données initiales.

## Configuration requise

Avant d'exécuter les scripts, assurez-vous d'avoir configuré votre environnement :

1. Copiez le fichier `.env.example` vers `.env`
2. Modifiez les variables d'environnement dans `.env` selon votre configuration

```bash
cp .env.example .env
```

3. Installez les dépendances requises

```bash
pnpm install
```

## Seed Admin

Crée un utilisateur administrateur dans la base de données.

### Utilisation

```bash
npm run seed:admin
```

ou

```bash
pnpm seed:admin
```

### Détails

- Email: admin@namahouse.com
- Mot de passe: admin123
- Rôle: admin

Si l'administrateur existe déjà, le script ne fera rien et affichera un message indiquant que l'administrateur existe déjà.

## Génération du secret Better Auth

Génère un secret sécurisé pour la configuration de Better Auth.

### Utilisation

```bash
npm run generate:auth-secret
```

ou

```bash
pnpm generate:auth-secret
```

### Détails

- Génère un secret aléatoire sécurisé de 32 caractères
- Affiche le secret dans la console pour le copier dans le fichier `.env`
- Utilise l'API crypto de Node.js pour une génération sécurisée