# Système de Chat en Ligne avec WebSockets

Ce projet est un système de chat en ligne utilisant les WebSockets pour permettre à plusieurs utilisateurs de discuter en temps réel. Les logs de chaque conversation sont stockés dans une base de données MongoDB.

## Fonctionnalités

- Chat en temps réel via WebSockets
- Stockage des messages dans MongoDB
- API REST pour récupérer et supprimer les logs
- Interface utilisateur responsive

## Structure du projet

- `server/` : Code du serveur Node.js avec Express et Socket.io
- `client/` : Code client HTML/CSS/JS

## Installation

### Prérequis

- Node.js v14+
- MongoDB

### Étapes

1. Cloner le dépôt
git clone https://github.com/votre-compte/chat-websocket.git
cd chat-websocket

2. Installer les dépendances du serveur

cd server
npm install

3. Configurer les variables d'environnement

cp .env.example .env
Modifier .env selon vos besoins

4. Démarrer le serveur

npm run dev

5. Accéder à l'application
Ouvrir `client/public/index.html` dans votre navigateur ou démarrer un serveur statique.

## API REST

- GET `/api/logs` : Récupérer tous les logs de conversation
- DELETE `/api/logs/:id` : Supprimer un log par ID

## Collaborateurs

- Jules SORRENTINO - Chef de projet & Backend (WebSockets)
- [Nom du collaborateur 2] - Backend (Base de données)
- [Nom du collaborateur 3] - Backend (API REST)
- [Nom du collaborateur 4] - Frontend (Structure & Design)
- [Nom du collaborateur 5] - Frontend (Fonctionnalités)
 