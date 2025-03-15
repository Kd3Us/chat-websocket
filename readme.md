Système de Chat en Ligne avec WebSockets
Ce projet est un système de chat en ligne utilisant les WebSockets pour permettre à plusieurs utilisateurs de discuter en temps réel. Les logs de chaque conversation sont stockés dans une base de données MongoDB.
Fonctionnalités

Chat en temps réel via Socket.IO
Authentification simple avec nom d'utilisateur
Notification des connexions/déconnexions d'utilisateurs
Stockage des messages dans MongoDB
API REST pour récupérer et supprimer les logs
Interface utilisateur responsive

Structure du projet

server/ : Code du serveur Node.js avec Express et Socket.io
client/public/ : Interface utilisateur HTML/CSS/JS

Installation
Prérequis

Node.js v14+
MongoDB

Étapes

Cloner le dépôt
git clone https://github.com/votre-compte/chat-websocket.git
cd chat-websocket
Installer les dépendances du serveur
cd server
npm install
Configurer les variables d'environnement
cp .env.example .env
Modifier .env avec vos informations de connexion MongoDB
Démarrer le serveur
node server.js
Accéder à l'application
Ouvrir http://localhost:3000 dans votre navigateur

API REST

GET /api/logs : Récupérer tous les logs de conversation
POST /api/logs : Créer un nouveau log (utilisé par Socket.IO)
DELETE /api/logs/:id : Supprimer un log par ID

Socket.IO Events

connection : Nouvel utilisateur connecté
message : Message envoyé par un utilisateur
username_change : Changement de nom d'utilisateur
disconnect : Déconnexion d'un utilisateur