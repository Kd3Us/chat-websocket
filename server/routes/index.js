const express = require('express');
const router = express.Router();
const logsRoutes = require('./logs');

router.use('/logs', logsRoutes);

module.exports = router;