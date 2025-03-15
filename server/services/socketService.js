const Message = require('../models/message');
const mongoose = require('mongoose');

const connectedUsers = new Map();

function initializeSocket(io) {
  io.on('connection', (socket) => {
    console.log('Nouvel utilisateur connecté:', socket.id);
    
    connectedUsers.set(socket.id, 'Anonyme');
    
    socket.broadcast.emit('user_connected', `Un nouvel utilisateur s'est connecté`);
    
    const userList = [];
    connectedUsers.forEach(value => {
      userList.push(value);
    });
    io.emit('users_update', userList);
    
    socket.on('message', handleMessage(socket, io));
    
    socket.on('username_change', (data) => {
      if (!data || typeof data !== 'object') {
        console.error('Données invalides reçues pour username_change:', data);
        return;
      }
      
      const oldName = data.oldName || 'Anonyme';
      const newName = data.newName || 'Utilisateur';
      
      connectedUsers.set(socket.id, newName);
      
      socket.broadcast.emit('message', {
        name: 'Système',
        message: `${oldName} a changé son nom en ${newName}`,
        date: new Date().toLocaleDateString('fr-FR'),
        heure: new Date().toLocaleTimeString('fr-FR')
      });
      
      const userList = [];
      connectedUsers.forEach(value => {
        userList.push(value);
      });
      io.emit('users_update', userList);
    });
    
    socket.on('username_update', (data) => {
      if (!data || typeof data !== 'object') {
        return;
      }
      
      const username = data.username;
      if (username) {
        connectedUsers.set(socket.id, username);
        
        const userList = [];
        connectedUsers.forEach(value => {
          userList.push(value);
        });
        io.emit('users_update', userList);
      }
    });
    
    socket.on('disconnect', () => {
      console.log('Utilisateur déconnecté:', socket.id);
      
      const username = connectedUsers.get(socket.id) || 'Anonyme';
      
      connectedUsers.delete(socket.id);
      
      socket.broadcast.emit('user_disconnected', `${username} s'est déconnecté`);
      
      const userList = [];
      connectedUsers.forEach(value => {
        userList.push(value);
      });
      io.emit('users_update', userList);
    });
  });
}

function handleMessage(socket, io) {
  return async (messageData) => {
    try {
      if (!messageData.message || messageData.message.trim() === '') {
        return socket.emit('error', { message: 'Le message ne peut pas être vide' });
      }
      
      const name = messageData.name || connectedUsers.get(socket.id) || 'Anonyme';
      
      const msgObject = {
        id: new mongoose.Types.ObjectId().toString(),
        name: name,
        message: messageData.message.trim().substring(0, 1000), 
        date: new Date().toLocaleDateString('fr-FR'),
        heure: new Date().toLocaleTimeString('fr-FR')
      };
      
      const message = new Message(msgObject);
      await message.save();
      
      io.emit('message', msgObject);
      
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du message:', error);
      socket.emit('error', { message: 'Erreur lors de l\'envoi du message' });
    }
  };
}

function cleanupZombieConnections(io) {
  setInterval(() => {
    const activeSocketIds = Array.from(io.sockets.sockets.keys());
    
    const zombieSocketIds = [];
    connectedUsers.forEach((value, key) => {
      if (!activeSocketIds.includes(key)) {
        zombieSocketIds.push(key);
      }
    });
    
    zombieSocketIds.forEach(socketId => {
      connectedUsers.delete(socketId);
    });
    
    if (zombieSocketIds.length > 0) {
      console.log(`Nettoyage de ${zombieSocketIds.length} connexions zombies`);
      
      const userList = [];
      connectedUsers.forEach(value => {
        userList.push(value);
      });
      io.emit('users_update', userList);
    }
  }, 60000); 
}

module.exports = { initializeSocket, cleanupZombieConnections };