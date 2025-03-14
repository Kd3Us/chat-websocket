const Message = require('../models/message');
const mongoose = require('mongoose');

function initializeSocket(io) {
  io.on('connection', (socket) => {
    console.log('Nouvel utilisateur connecté:', socket.id);
    
    socket.broadcast.emit('user_connected', `Un nouvel utilisateur s'est connecté`);
    
    
    socket.on('message', handleMessage(socket, io));
    
    // Déconnexion
    socket.on('disconnect', () => {
      console.log('Utilisateur déconnecté:', socket.id);
      socket.broadcast.emit('user_disconnected', `Un utilisateur s'est déconnecté`);
    });
  });
}

function handleMessage(socket, io) {
  return async (messageData) => {
    try {
      // Format du message
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
      
      // Diffuser le message
      io.emit('message', msgObject);
      
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du message:', error);
    }
  };
}

module.exports = { initializeSocket };