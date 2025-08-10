/* backend/routes/adminRoutes-persistent.js */
const express = require('express');
const { 
    adminLogin, 
    getAllUsers, 
    resetUserPassword, 
    deleteUser, 
    updateUserMoney, 
    getSystemStats,
    verifyAdmin 
} = require('../controllers/adminController-persistent');

const router = express.Router();

// Ruta de login para admin (no requiere autenticación)
router.post('/login', adminLogin);

// Todas las demás rutas requieren autenticación de admin
router.use(verifyAdmin);

// Rutas de administración (todas requieren token de admin)
router.get('/users', getAllUsers);
router.post('/users/reset-password', resetUserPassword);
router.delete('/users/:userId', deleteUser);
router.post('/users/update-money', updateUserMoney);
router.get('/stats', getSystemStats);

module.exports = router;
