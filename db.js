/* backend/db.js */
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Intentar conectar a MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error.message);
        console.log('💡 Sugerencias:');
        console.log('   1. Verifica tu string de conexión en .env');
        console.log('   2. Asegúrate de tener acceso a internet (si usas MongoDB Atlas)');
        console.log('   3. O instala MongoDB localmente');
        
        // No salir del proceso, permitir que el servidor funcione sin DB
        console.log('⚠️  Servidor iniciando sin base de datos...');
    }
};

module.exports = connectDB;
