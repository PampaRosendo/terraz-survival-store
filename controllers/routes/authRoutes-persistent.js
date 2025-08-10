/* backend/routes/authRoutes-persistent.js */
const express = require('express');
const { register, login, getAllUsers, verifyToken } = require('../controllers/authController-persistent');

const router = express.Router();

// Ruta de registro (crea usuarios permanentes)
router.post('/register', register);

// Ruta de login
router.post('/login', login);

// Ruta para obtener todos los usuarios (libre para mostrar en frontend)
router.get('/users', getAllUsers);

module.exports = router;
