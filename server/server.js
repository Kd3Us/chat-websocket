const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const routes = require('./routes/index');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
    if (filePath.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

app.use('/api', routes);

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    methods: ['GET', 'POST']
  }
});

const { initializeSocket } = require('./services/socketService');
initializeSocket(io);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Chemin des fichiers statiques: ${path.join(__dirname, '../client/public')}`);
});