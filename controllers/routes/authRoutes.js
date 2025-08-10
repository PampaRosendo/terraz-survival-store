/* backend/routes/authRoutes.js */
const express = require('express');

// Usar controlador temporal sin MongoDB
const { register, login, getAllUsers } = require('../controllers/authController.temp');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);

module.exports = router;
