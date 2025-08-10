/* backend/controllers/authController.js */
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully', userId: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Nueva función para obtener todos los usuarios (solo emails, sin contraseñas)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Excluir contraseñas
        res.json({ users, count: users.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

