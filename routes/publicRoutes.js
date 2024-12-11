const express = require('express');
const RotasPublicas = express.Router();
const authController = require('../controllers/authController');

// Rota pública para login
RotasPublicas.post('/login', authController.login);

module.exports = RotasPublicas;