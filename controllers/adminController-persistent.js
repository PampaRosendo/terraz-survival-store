/* backend/controllers/adminController-persistent.js */
const User = require('../models/userModel-persistent');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'tu-jwt-secret-super-seguro-aqui';

// Credenciales de admin (en producción deberían estar en variables de entorno)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // En producción, esto debería estar hasheado
};

// Login de admin
exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            const token = jwt.sign(
                { isAdmin: true, username: ADMIN_CREDENTIALS.username }, 
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            console.log('✅ Admin login exitoso');
            
            res.json({ 
                success: true, 
                token,
                message: 'Login de admin exitoso',
                isAdmin: true
            });
        } else {
            res.status(401).json({ 
                success: false, 
                message: 'Credenciales de admin inválidas' 
            });
        }
    } catch (err) {
        console.error('Error en admin login:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor' 
        });
    }
};

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    try {
        const users = User.getAll();
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        console.log(`📊 Admin consultó ${users.length} usuarios guardados permanentemente`);
        
        res.json({ 
            success: true,
            users: usersWithoutPasswords,
            count: users.length
        });
    } catch (err) {
        console.error('Error obteniendo usuarios:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error obteniendo usuarios' 
        });
    }
};

// Resetear contraseña de usuario
exports.resetUserPassword = async (req, res) => {
    try {
        const { userId, newPassword } = req.body;
        
        const user = User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Usuario no encontrado' 
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        User.update(userId, { password: hashedPassword });

        console.log(`🔑 Admin reseteó contraseña para: ${user.username}`);
        
        res.json({ 
            success: true,
            message: `Contraseña reseteada para ${user.username}. Los cambios son permanentes.`,
            username: user.username
        });
    } catch (err) {
        console.error('Error reseteando contraseña:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error reseteando contraseña' 
        });
    }
};

// Eliminar usuario permanentemente
exports.deleteUser = (req, res) => {
    try {
        const { userId } = req.params;
        
        const user = User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Usuario no encontrado' 
            });
        }

        User.delete(userId);

        console.log(`🗑️ Admin eliminó usuario permanentemente: ${user.username}`);
        
        res.json({ 
            success: true,
            message: `Usuario ${user.username} eliminado permanentemente`,
            deletedUser: user.username
        });
    } catch (err) {
        console.error('Error eliminando usuario:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error eliminando usuario' 
        });
    }
};

// Actualizar dinero del usuario
exports.updateUserMoney = (req, res) => {
    try {
        const { userId, newMoney } = req.body;
        
        const user = User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Usuario no encontrado' 
            });
        }

        const updatedUser = User.update(userId, { money: parseFloat(newMoney) });

        console.log(`💰 Admin actualizó dinero para ${user.username}: $${user.money} → $${newMoney}`);
        
        res.json({ 
            success: true,
            message: `Dinero actualizado para ${user.username}. Los cambios son permanentes.`,
            username: user.username,
            oldMoney: user.money,
            newMoney: parseFloat(newMoney)
        });
    } catch (err) {
        console.error('Error actualizando dinero:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error actualizando dinero del usuario' 
        });
    }
};

// Obtener estadísticas del sistema
exports.getSystemStats = (req, res) => {
    try {
        const stats = User.getStats();
        
        console.log(`📊 Admin consultó estadísticas del sistema`);
        
        res.json({ 
            success: true,
            stats: {
                ...stats,
                message: 'Todos los datos son permanentes y persistentes'
            }
        });
    } catch (err) {
        console.error('Error obteniendo estadísticas:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Error obteniendo estadísticas del sistema' 
        });
    }
};

// Middleware para verificar si es admin
exports.verifyAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Token de admin requerido' 
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(403).json({ 
                success: false, 
                message: 'Acceso denegado. Se requieren privilegios de administrador' 
            });
        }
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(401).json({ 
            success: false, 
            message: 'Token de admin inválido' 
        });
    }
};
