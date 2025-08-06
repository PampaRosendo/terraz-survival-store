/* backend/controllers/authController-persistent.js */
const User = require('../models/userModel-persistent');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'tu-jwt-secret-super-seguro-aqui';

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        const user = await User.create({ email, password });
        
        // No devolver la contraseña
        const { password: _, ...userWithoutPassword } = user;
        
        res.status(201).json({ 
            message: '✅ Usuario creado exitosamente y guardado permanentemente',
            user: userWithoutPassword
        });
    } catch (err) {
        console.error('Error en register:', err);
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        const user = User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email }, 
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // No devolver la contraseña
        const { password: _, ...userWithoutPassword } = user;

        console.log(`✅ Login exitoso: ${user.username} (${user.email})`);

        res.json({ 
            token, 
            message: 'Login exitoso',
            user: userWithoutPassword
        });
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todos los usuarios (sin contraseñas)
exports.getAllUsers = async (req, res) => {
    try {
        const users = User.getAll();
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.json({ 
            users: usersWithoutPasswords, 
            count: users.length,
            message: `${users.length} usuarios encontrados`
        });
    } catch (err) {
        console.error('Error en getAllUsers:', err);
        res.status(500).json({ error: err.message });
    }
};

// Middleware para verificar token JWT
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Token de acceso requerido' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};
