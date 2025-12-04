# Architecture Technique - Nama House E-commerce

## Stack Technologique

### Backend
- **Base de données** : Neon Database (PostgreSQL)
- **ORM** : Prisma
- **Authentification** : Better Auth
- **Service d'e-mail** : Brevo (prévu, pas encore intégré)

### Frontend
- **Framework** : Next.js 16
- **Langage** : TypeScript
- **Styles** : Tailwind CSS
- **Gestion d'état** : Context API
- **Icônes** : Lucide React

### DevOps
- **Gestionnaire de paquets** : pnpm
- **Déploiement** : À définir
- **CI/CD** : À définir

## Architecture du Projet

### Structure des Dossiers
```
.
├── app/                 # Pages et layouts Next.js (App Router)
├── components/          # Composants React réutilisables
├── doc/                 # Documentation du projet
├── hooks/               # Hooks React personnalisés
├── lib/                 # Logique métier et services
├── prisma/              # Schéma Prisma et migrations
├── public/              # Ressources statiques
├── scripts/             # Scripts utilitaires
└── styles/              # Styles globaux
```

### Séparation des Responsabilités
- **Backend** : Gère les données dynamiques via Prisma et la base de données
- **Frontend** : Affiche les ressources statiques depuis le dossier `/public`
- **Server Components** : Traitent les données côté serveur
- **Client Components** : Gèrent l'interactivité côté client

## Base de Données

### Schéma Principal
1. **Utilisateurs** (User, Account, Session, etc.)
2. **Produits** (Product, Category, ProductVariant)
3. **Panier** (Cart, CartItem)
4. **Commandes** (Order, OrderItem)
5. **Adresses** (Address)
6. **Avis** (Review)

### Stratégie de Stockage
- **Images** : Stockées dans `/public` et référencées par chemin
- **Données** : Stockées en base de données via Prisma

## Authentification

### Better Auth
- Gestion des utilisateurs (client, admin)
- Vérification d'e-mail (à configurer avec Brevo)
- Réinitialisation de mot de passe
- Sessions sécurisées

## Messagerie

### Service Prévu : Brevo
- Envoi de codes de vérification
- Confirmations de commande
- Notifications

*À intégrer ultérieurement*

## Performance

### Optimisations
- **Next.js Image Optimization** : Pour les images
- **Code Splitting** : Par défaut avec Next.js App Router
- **Caching** : Stratégies de cache serveur et client
- **Lazy Loading** : Pour les composants non critiques

## Sécurité

### Bonnes Pratiques
- Variables d'environnement pour les secrets
- Validation des données d'entrée
- Protection CSRF
- Headers de sécurité HTTP

---

*Dernière mise à jour : décembre 2025*