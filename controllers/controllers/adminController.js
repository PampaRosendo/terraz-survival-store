/* backend/controllers/adminController.js */
const bcrypt = require('bcrypt');

// Simular base de datos en memoria (como el userModel temporal)
let users = []; // Esta se sincronizará con el sistema actual

// Credenciales de admin (cambiar en producción)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // En producción usar hash
};

// Función para sincronizar usuarios del sistema principal
const syncUsers = () => {
    try {
        const userModel = require('../models/userModel');
        users = userModel.users || [];
    } catch (error) {
        console.log('Using memory users array');
    }
};

// Autenticación de admin
exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            res.json({ 
                success: true, 
                message: 'Admin login successful',
                token: 'admin-token-' + Date.now()
            });
        } else {
            res.status(401).json({ error: 'Invalid admin credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ver todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        syncUsers();
        const sanitizedUsers = users.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt || 'N/A',
            money: user.money || 1000, // Dinero del juego
            lastLogin: user.lastLogin || 'Never'
        }));
        
        res.json({ 
            users: sanitizedUsers,
            totalUsers: sanitizedUsers.length,
            totalMoney: sanitizedUsers.reduce((sum, user) => sum + user.money, 0)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Resetear contraseña de usuario
exports.resetUserPassword = async (req, res) => {
    try {
        const { userId, newPassword } = req.body;
        syncUsers();
        
        const userIndex = users.findIndex(user => user._id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        users[userIndex].password = hashedPassword;
        
        res.json({ 
            success: true,
            message: `Password reset for user ${users[userIndex].username}`,
            newPassword: newPassword // Solo para admin, en producción no enviar
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        syncUsers();
        
        const userIndex = users.findIndex(user => user._id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const deletedUser = users.splice(userIndex, 1)[0];
        
        res.json({ 
            success: true,
            message: `User ${deletedUser.username} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar dinero de usuario
exports.updateUserMoney = async (req, res) => {
    try {
        const { userId, newAmount } = req.body;
        syncUsers();
        
        const userIndex = users.findIndex(user => user._id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        users[userIndex].money = parseInt(newAmount);
        
        res.json({ 
            success: true,
            message: `Money updated for ${users[userIndex].username}`,
            newAmount: newAmount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Estadísticas del sistema
exports.getSystemStats = async (req, res) => {
    try {
        syncUsers();
        
        const stats = {
            totalUsers: users.length,
            totalMoney: users.reduce((sum, user) => sum + (user.money || 1000), 0),
            averageMoney: users.length > 0 ? Math.round(users.reduce((sum, user) => sum + (user.money || 1000), 0) / users.length) : 0,
            recentUsers: users.slice(-5).map(user => ({
                username: user.username,
                email: user.email,
                createdAt: user.createdAt || 'Recent'
            })),
            systemInfo: {
                serverUptime: process.uptime(),
                nodeVersion: process.version,
                platform: process.platform,
                memory: process.memoryUsage()
            }
        };
        
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
