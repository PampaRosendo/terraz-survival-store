/* backend/server.js */
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Mensaje informativo
console.log('🚀 Iniciando servidor sin MongoDB (modo temporal)');
console.log('💾 Los datos se almacenan en memoria temporalmente');

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);

// Import admin routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// Ruta para servir la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para la tienda (después del login)
app.get('/shop.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop.html'));
});

// Ruta para los juegos
app.get('/games.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'games.html'));
});

// Ruta para el panel de admin
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Basic API route
app.get('/api', (req, res) => {
    res.json({ 
        message: 'API funcionando correctamente!',
        mode: 'Temporal (sin MongoDB)',
        note: 'Los datos se almacenan en memoria'
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Frontend available at: http://localhost:${PORT}`);
    console.log(`🔌 API available at: http://localhost:${PORT}/api`);
    console.log(`� Admin panel available at: http://localhost:${PORT}/admin.html`);
    console.log(`�📝 Modo temporal: Los usuarios se guardan en memoria`);
    console.log('🧟 ¡Bienvenido a Terraz Survival Store!');
});
