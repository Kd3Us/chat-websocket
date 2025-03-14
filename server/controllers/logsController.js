const Message = require('../models/message');

exports.getLogs = async (req, res) => {
  try {
    const logs = await Message.find();
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des logs' });
  }
};

exports.createLog = async (req, res) => {
  try {
    const newLog = new Message(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const logId = req.params.id;
    const deletedLog = await Message.findOneAndDelete({ id: logId });
    
    if (!deletedLog) {
      return res.status(404).json({ message: 'Log non trouvé' });
    }
    
    res.status(200).json({ message: 'Log supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression du log' });
  }
};