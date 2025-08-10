/* backend/routes/adminRoutes.js */
const express = require('express');
const { 
    adminLogin, 
    getAllUsers, 
    resetUserPassword, 
    deleteUser, 
    updateUserMoney, 
    getSystemStats 
} = require('../controllers/adminController');

const router = express.Router();

// Middleware simple de autenticación admin
const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('admin-token-')) {
        return res.status(401).json({ error: 'Admin authentication required' });
    }
    next();
};

// Rutas públicas
router.post('/login', adminLogin);

// Rutas protegidas
router.get('/users', adminAuth, getAllUsers);
router.post('/users/reset-password', adminAuth, resetUserPassword);
router.delete('/users/:userId', adminAuth, deleteUser);
router.post('/users/update-money', adminAuth, updateUserMoney);
router.get('/stats', adminAuth, getSystemStats);

module.exports = router;
