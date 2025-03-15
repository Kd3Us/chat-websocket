// test-api.js
const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

// Fonction pour créer un nouveau log
async function createLog() {
  try {
    const response = await axios.post(`${API_URL}/logs`, {
      id: Date.now().toString(), // Utiliser un timestamp comme ID (ou autre méthode de votre choix)
      name: 'Test User',
      message: 'Message de test via API',
      date: new Date().toLocaleDateString('fr-FR'),
      heure: new Date().toLocaleTimeString('fr-FR')
    });
    
    console.log('Log créé avec succès:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du log:', error.response?.data || error.message);
    return null;
  }
}

// Fonction pour récupérer tous les logs
async function getLogs() {
  try {
    const response = await axios.get(`${API_URL}/logs`);
    console.log('Logs récupérés:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des logs:', error.response?.data || error.message);
    return [];
  }
}

// Fonction pour supprimer un log
async function deleteLog(logId) {
  try {
    const response = await axios.delete(`${API_URL}/logs/${logId}`);
    console.log('Log supprimé avec succès:', response.data);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du log:', error.response?.data || error.message);
    return false;
  }
}

// Fonction principale pour exécuter les tests
async function runTests() {
  console.log('Démarrage des tests de l\'API...');
  
  // Test de création d'un log
  const newLog = await createLog();
  if (!newLog) {
    console.error('Échec du test de création de log');
    return;
  }
  
  // Test de récupération des logs
  const logs = await getLogs();
  if (logs.length === 0) {
    console.error('Aucun log récupéré ou échec du test de récupération');
  }
  
  // Test de suppression du log créé
  if (newLog) {
    const deleted = await deleteLog(newLog.id);
    if (!deleted) {
      console.error('Échec du test de suppression de log');
    }
  }
  
  console.log('Tests terminés');
}

// Exécuter les tests
runTests();