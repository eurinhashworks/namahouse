# Nama House - Boutique E-commerce

Bienvenue dans le dépôt officiel de **Nama House**, une boutique e-commerce spécialisée dans l'importation de produits du Nigeria, Dubaï et France.

## 🛍️ À Propos du Projet

Nama House est une plateforme e-commerce moderne développée avec Next.js 16, permettant aux clients d'acheter des produits variés tels que :
- Sacs et accessoires
- Perruques et produits capillaires
- Chaussures de marque
- Cosmétiques et soins
- Parfums de luxe

### Fonctionnalités Clés
- ✨ Interface utilisateur responsive avec thème sombre/clair
- 🔍 Recherche avancée de produits
- 🛒 Panier d'achat persistant
- 💳 Processus de paiement sécurisé
- 👤 Interface d'administration pour la gestion des produits
- 🌐 Localisation en français (prioritaire)
- 🔐 Authentification sécurisée avec Better Auth
- 🗄️ Base de données PostgreSQL avec Neon et Prisma ORM

## 🚀 Technologies Utilisées

- [Next.js 16](https://nextjs.org/) avec App Router
- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Zod](https://zod.dev/) pour la validation
- [pnpm](https://pnpm.io/) pour la gestion des dépendances
- [Neon Database](https://neon.tech/) - PostgreSQL serverless
- [Prisma](https://www.prisma.io/) - ORM moderne
- [Better Auth](https://www.better-auth.com/) - Système d'authentification complet

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- Node.js (version recommandée : 18.x ou supérieure)
- pnpm (gestionnaire de paquets)
- Compte Neon Database (gratuit disponible)

## 🛠️ Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/eurinhashworks/namahouse.git
cd namahouse
```

2. Installer les dépendances :
```bash
pnpm install
```

3. Configurer les variables d'environnement :
Créer un fichier `.env` basé sur `.env.example` et remplir les valeurs appropriées.

4. Appliquer les migrations Prisma :
```bash
npx prisma migrate dev
```

5. Démarrer le serveur de développement :
```bash
pnpm dev
```

6. Accéder à l'application :
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
nama-house-e-commerce/
├── app/                 # Pages et layouts Next.js (App Router)
│   ├── admin/           # Interface d'administration
│   ├── api/             # API routes (auth, produits, etc.)
│   ├── cart/            # Page panier
│   └── search/          # Page de recherche
├── components/          # Composants React réutilisables
├── lib/                 # Logique métier et utilitaires
├── prisma/              # Schéma de base de données et migrations
├── public/              # Fichiers statiques
└── styles/              # Styles globaux
```

## 🎯 Scripts Disponibles

- `pnpm dev` - Démarre le serveur de développement
- `pnpm build` - Compile l'application pour la production
- `pnpm start` - Démarre le serveur de production
- `pnpm lint` - Exécute l'analyseur de code ESLint
- `pnpm db:migrate` - Applique les migrations de base de données
- `pnpm db:studio` - Lance Prisma Studio pour explorer la base de données

## 🌿 Branches Git

- `main` - Branche de développement principale
- `prod` - Branche de production

## 🔧 Déploiement

Le projet est prêt pour le déploiement sur Vercel, la plateforme recommandée pour les applications Next.js.

### Variables d'environnement pour le déploiement
Assurez-vous de configurer toutes les variables d'environnement dans les paramètres de déploiement de Vercel.

## 👥 Contributeurs

- **Eurin Hash Works** - [@eurinhashworks](https://github.com/eurinhashworks)

## 📄 Licence

Ce projet est la propriété de Nama House. Tous droits réservés.

## 📞 Contact

Pour toute question concernant ce projet, veuillez contacter l'équipe de développement à l'adresse : eurinhash.works@gmail.com