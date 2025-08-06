/* backend/controllers/authController.temp.js */
// Controlador temporal que simula una base de datos en memoria
let users = []; // Array temporal para almacenar usuarios

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Verificar si el usuario ya existe
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        
        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear usuario
        const newUser = {
            _id: Date.now().toString(),
            email: email,
            password: hashedPassword,
            createdAt: new Date()
        };
        
        users.push(newUser);
        
        res.status(201).json({ 
            message: 'Usuario creado exitosamente', 
            userId: newUser._id 
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Buscar usuario
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        // Crear token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret_key');
        
        res.json({ 
            token, 
            message: 'Inicio de sesión exitoso' 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // Retornar usuarios sin contraseñas
        const usersWithoutPasswords = users.map(user => ({
            _id: user._id,
            email: user.email,
            createdAt: user.createdAt
        }));
        
        res.json({ 
            users: usersWithoutPasswords, 
            count: usersWithoutPasswords.length 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
