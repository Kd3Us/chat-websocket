const Message = require('../models/message');

exports.getLogs = async (req, res) => {
  try {
    const logs = await Message.find();
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des logs' });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const logId = req.params.id;
    const deletedLog = await Message.findByIdAndDelete(logId);
    if (!deletedLog) {
      return res.status(404).json({ message: 'Log non trouvé' });
    }
    res.status(200).json({ message: 'Log supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression du log' });
  }
};