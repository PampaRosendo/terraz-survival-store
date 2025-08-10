/* backend/server-persistent.js */
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Mensaje informativo actualizado
console.log('🚀 Iniciando servidor con SISTEMA PERSISTENTE');
console.log('💾 Los datos se guardan PERMANENTEMENTE en archivos JSON');
console.log('✅ Las cuentas creadas serán PERMANENTES');

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Routes - usando controladores persistentes
const authRoutes = require('./routes/authRoutes-persistent');
app.use('/api/auth', authRoutes);

// Import admin routes con sistema persistente
const adminRoutes = require('./routes/adminRoutes-persistent');
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
        message: 'API funcionando correctamente con SISTEMA PERSISTENTE!',
        mode: 'Persistente (archivos JSON)',
        note: 'Las cuentas y datos se guardan PERMANENTEMENTE',
        storage: 'Archivos JSON locales - datos persistentes'
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Frontend available at: http://localhost:${PORT}`);
    console.log(`🔌 API available at: http://localhost:${PORT}/api`);
    console.log(`🔐 Admin panel available at: http://localhost:${PORT}/admin.html`);
    console.log(`💾 MODO PERSISTENTE: Los usuarios se guardan PERMANENTEMENTE`);
    console.log('🧟 ¡Bienvenido a Terraz Survival Store - Versión Persistente!');
});
