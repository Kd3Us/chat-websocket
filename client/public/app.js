const usernameModal = document.getElementById('usernameModal');
const usernameForm = document.getElementById('usernameForm');
const usernameInput = document.getElementById('usernameInput');
const usernameError = document.getElementById('usernameError');
const usernameDisplay = document.getElementById('usernameDisplay');
const userInfo = document.getElementById('userInfo');
const changeUsernameBtn = document.getElementById('changeUsernameBtn');
const chatContainer = document.getElementById('chatContainer');
const messageList = document.getElementById('messageList');
const loadingMessages = document.getElementById('loadingMessages');
const emptyMessages = document.getElementById('emptyMessages');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const usersList = document.getElementById('usersList');
const userCount = document.getElementById('userCount');

let currentUsername = '';
let socket;

function init() {
  const savedUsername = localStorage.getItem('chatUsername');
  
  if (savedUsername) {
    currentUsername = savedUsername;
    usernameInput.value = savedUsername;
    showChat(savedUsername);
  }

  initializeSocket();
  
  usernameForm.addEventListener('submit', handleUsernameSubmit);
  changeUsernameBtn.addEventListener('click', showUsernameModal);
  messageForm.addEventListener('submit', handleMessageSubmit);
  messageInput.addEventListener('input', handleMessageInput);
  
  fetchMessages();
}

function initializeSocket() {
  const serverUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : window.location.origin;
  
  socket = io(serverUrl);
  
  socket.on('connect', () => {
    console.log('Connecté au serveur socket');
    
    if (currentUsername) {
      socket.emit('username_update', { username: currentUsername });
    }
  });
  
  socket.on('disconnect', () => {
    console.log('Déconnecté du serveur socket');
  });
  
  socket.on('error', (error) => {
    console.error('Erreur socket:', error.message);
    alert(`Erreur: ${error.message}`);
  });
  
  socket.on('message', (message) => {
    addMessage(message);
  });
  
  socket.on('users_update', (userList) => {
    updateUsersList(userList);
  });
  
  socket.on('user_connected', (message) => {
    addSystemMessage(message);
  });
  
  socket.on('user_disconnected', (message) => {
    addSystemMessage(message);
  });
}

async function fetchMessages() {
  try {
    loadingMessages.style.display = 'block';
    emptyMessages.style.display = 'none';
    
    const response = await axios.get('/api/logs');
    const messages = response.data;
    
    loadingMessages.style.display = 'none';
    
    if (messages.length === 0) {
      emptyMessages.style.display = 'block';
    } else {
      messages.forEach(message => addMessage(message));
    }
  } catch (error) {
    console.error('Erreur lors du chargement des messages:', error);
    loadingMessages.style.display = 'none';
    emptyMessages.textContent = 'Erreur lors du chargement des messages.';
    emptyMessages.style.display = 'block';
  }
}

function handleUsernameSubmit(event) {
  event.preventDefault();
  
  const username = usernameInput.value.trim();
  
  // Validation
  if (!username) {
    showUsernameError('Veuillez entrer un nom d\'utilisateur');
    return;
  }
  
  if (username.length < 3) {
    showUsernameError('Le nom d\'utilisateur doit contenir au moins 3 caractères');
    return;
  }
  
  if (username.length > 20) {
    showUsernameError('Le nom d\'utilisateur ne doit pas dépasser 20 caractères');
    return;
  }
  
  const oldUsername = currentUsername || 'Anonyme';
  currentUsername = username;
  
  localStorage.setItem('chatUsername', username);
  
  if (oldUsername !== username) {
    socket.emit('username_change', { oldName: oldUsername, newName: username });
  } else {
    socket.emit('username_update', { username });
  }
  
  showChat(username);
}

function showUsernameError(message) {
  usernameError.textContent = message;
  usernameError.style.display = 'block';
  usernameInput.focus();
}

function showChat(username) {
  usernameModal.style.display = 'none';
  chatContainer.style.display = 'flex';
  userInfo.style.display = 'flex';
  usernameDisplay.textContent = `Connecté en tant que: ${username}`;
  messageInput.focus();
}

function showUsernameModal() {
  usernameModal.style.display = 'flex';
  usernameInput.value = currentUsername;
  usernameError.style.display = 'none';
  usernameInput.focus();
}

function handleMessageSubmit(event) {
  event.preventDefault();
  
  const messageText = messageInput.value.trim();
  
  if (!messageText) return;
  
  socket.emit('message', {
    name: currentUsername,
    message: messageText
  });
  
  messageInput.value = '';
  sendButton.disabled = true;
  messageInput.focus();
}

function handleMessageInput() {
  sendButton.disabled = !messageInput.value.trim();
}

function addMessage(message) {
  emptyMessages.style.display = 'none';
  
  const messageElement = document.createElement('div');
  
  let messageClass = 'message-item';
  
  if (message.type === 'system') {
    messageClass += ' system';
  } else if (message.name === currentUsername) {
    messageClass += ' own';
  } else {
    messageClass += ' other';
  }
  
  messageElement.className = messageClass;
  
  if (message.type !== 'system') {
    const headerElement = document.createElement('div');
    headerElement.className = 'message-header';
    
    const senderElement = document.createElement('span');
    senderElement.className = 'message-sender';
    senderElement.textContent = message.name;
    
    const timeElement = document.createElement('span');
    timeElement.className = 'message-time';
    timeElement.textContent = `${message.date} à ${message.heure}`;
    
    headerElement.appendChild(senderElement);
    headerElement.appendChild(timeElement);
    messageElement.appendChild(headerElement);
  }
  
  const contentElement = document.createElement('div');
  contentElement.className = 'message-content';
  contentElement.textContent = message.message;
  
  messageElement.appendChild(contentElement);
  
  messageList.appendChild(messageElement);
  
  scrollToBottom();
}

function addSystemMessage(text) {
  addMessage({
    id: Date.now().toString(),
    name: 'Système',
    message: text,
    date: new Date().toLocaleDateString('fr-FR'),
    heure: new Date().toLocaleTimeString('fr-FR'),
    type: 'system'
  });
}

function updateUsersList(users) {
  userCount.textContent = users.length;
  
  usersList.innerHTML = '';
  
  users.forEach(username => {
    const userElement = document.createElement('li');
    userElement.className = 'user-item';
    userElement.textContent = username;
    usersList.appendChild(userElement);
  });
}

function scrollToBottom() {
  messageList.scrollTop = messageList.scrollHeight;
}

document.addEventListener('DOMContentLoaded', init);