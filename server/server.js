const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Importer les routes 
const logsRoutes = require('./routes/logs');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/logs', logsRoutes);

// Connexion à MongoDB (sera configuré par la personne 2)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// serveur HTTP
const server = http.createServer(app);

// Config Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Gestion des connexions
io.on('connection', (socket) => {
  console.log('Nouvel utilisateur connecté:', socket.id);
  
  socket.broadcast.emit('user_connected', `Un nouvel utilisateur s'est connecté`);
  
  socket.on('message', async (messageData) => {
    try {
      const Message = require('./models/message');
      
      const msgObject = {
        id: new mongoose.Types.ObjectId().toString(),
        name: messageData.name || 'Anonyme',
        message: messageData.message,
        date: new Date().toLocaleDateString('fr-FR'),
        heure: new Date().toLocaleTimeString('fr-FR')
      };
      
      // Sauvegarder le message
      const message = new Message(msgObject);
      await message.save();
      
      io.emit('message', msgObject);
      
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du message:', error);
    }
  });
  
  // Déconnexion
  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté:', socket.id);
    socket.broadcast.emit('user_disconnected', `Un utilisateur s'est déconnecté`);
  });
});

// Start
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});