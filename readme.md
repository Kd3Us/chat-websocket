# Application de Chat en Temps Réel avec Node.js et Socket.IO

Cette application est un système de chat en temps réel utilisant Node.js, Express, Socket.IO et MongoDB. Les utilisateurs peuvent se connecter, choisir un nom d'utilisateur, envoyer des messages et voir qui est en ligne.

## Fonctionnalités

- Communication en temps réel via Socket.IO
- Interface utilisateur simple et intuitive
- Persistance des messages dans MongoDB
- Gestion des utilisateurs connectés
- Notification des connexions/déconnexions
- Interface responsive (adaptée aux mobiles)

## Structure du projet

```
chat-websocket/
├── server/
│   ├── server.js                 # Point d'entrée du serveur
│   ├── config/
│   │   └── db.js                 # Configuration MongoDB
│   ├── routes/
│   │   ├── index.js              # Router principal
│   │   └── logs.js               # Routes pour l'API des logs
│   ├── controllers/
│   │   └── logsController.js     # Contrôleur pour l'API des logs
│   ├── models/
│   │   └── message.js            # Modèle Mongoose pour les messages
│   └── services/
│       └── socketService.js      # Gestion de Socket.IO
└── client/
    └── public/
        ├── index.html            # Page HTML principale
        ├── styles.css            # Styles CSS de l'application
        └── app.js                # Logique JavaScript du client
```

## Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (local ou distant)

### Étapes d'installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-nom/chat-websocket.git
   cd chat-websocket
   ```

2. **Installer les dépendances du serveur**
   ```bash
   cd server
   npm install
   ```

3. **Configurer l'environnement**
   
   Créez un fichier `.env` dans le dossier `server` avec le contenu suivant:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/chatdb
   ```
   Remplacez l'URI MongoDB par votre propre connexion si nécessaire.

4. **Démarrer le serveur**
   ```bash
   node server.js
   ```
   
   Le serveur sera accessible à l'adresse http://localhost:3000

## Utilisation

1. Ouvrez votre navigateur et accédez à http://localhost:3000
2. Entrez un nom d'utilisateur lorsque vous y êtes invité
3. Commencez à chatter!

## API REST

L'application expose les endpoints API suivants:

- `GET /api/logs` - Récupérer tous les messages
- `POST /api/logs` - Créer un nouveau message (utilisé par Socket.IO)
- `DELETE /api/logs/:id` - Supprimer un message par ID

## Technologies utilisées

- **Backend**:
  - Node.js et Express
  - Socket.IO pour la communication en temps réel
  - Mongoose pour l'interaction avec MongoDB
  
- **Frontend**:
  - HTML5, CSS3 et JavaScript
  - Socket.IO Client
  - Axios pour les requêtes HTTP

## Auteur

- Jules SORRENTINO

## Licence

Ce projet est sous licence MIT.
message : Message envoyé par un utilisateur
username_change : Changement de nom d'utilisateur
disconnect : Déconnexion d'un utilisateur
