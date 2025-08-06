/* backend/models/userModel-persistent.js */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// Archivo donde se guardarán los usuarios
const USERS_FILE = path.join(__dirname, '../data/users.json');
const DATA_DIR = path.join(__dirname, '../data');

// Crear directorio de datos si no existe
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Inicializar archivo de usuarios si no existe
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

class User {
    constructor(userData) {
        this.id = userData.id || Date.now() + Math.random();
        this.username = userData.username;
        this.email = userData.email;
        this.password = userData.password;
        this.money = userData.money || 1000; // Dinero inicial
        this.createdAt = userData.createdAt || new Date().toISOString();
    }

    // Obtener todos los usuarios
    static getAll() {
        try {
            const data = fs.readFileSync(USERS_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading users file:', error);
            return [];
        }
    }

    // Guardar todos los usuarios
    static saveAll(users) {
        try {
            fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
            return true;
        } catch (error) {
            console.error('Error saving users file:', error);
            return false;
        }
    }

    // Crear un nuevo usuario
    static async create(userData) {
        try {
            const users = User.getAll();
            
            // Verificar si el usuario ya existe
            const existingUser = users.find(u => u.email === userData.email || u.username === userData.username);
            if (existingUser) {
                throw new Error('Usuario o email ya existe');
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            
            const newUser = new User({
                ...userData,
                password: hashedPassword
            });

            users.push(newUser);
            User.saveAll(users);
            
            console.log(`✅ Usuario creado permanentemente: ${newUser.username} (${newUser.email})`);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    // Buscar usuario por email
    static findOne(query) {
        const users = User.getAll();
        return users.find(user => {
            if (query.email) return user.email === query.email;
            if (query.username) return user.username === query.username;
            if (query.id) return user.id === query.id;
            return false;
        });
    }

    // Buscar usuario por ID
    static findById(id) {
        const users = User.getAll();
        return users.find(user => user.id === id);
    }

    // Actualizar usuario
    static update(id, updateData) {
        try {
            const users = User.getAll();
            const userIndex = users.findIndex(user => user.id === id);
            
            if (userIndex === -1) {
                throw new Error('Usuario no encontrado');
            }

            users[userIndex] = { ...users[userIndex], ...updateData };
            User.saveAll(users);
            
            console.log(`✅ Usuario actualizado permanentemente: ${users[userIndex].username}`);
            return users[userIndex];
        } catch (error) {
            throw error;
        }
    }

    // Eliminar usuario
    static delete(id) {
        try {
            const users = User.getAll();
            const userIndex = users.findIndex(user => user.id === id);
            
            if (userIndex === -1) {
                throw new Error('Usuario no encontrado');
            }

            const deletedUser = users[userIndex];
            users.splice(userIndex, 1);
            User.saveAll(users);
            
            console.log(`🗑️ Usuario eliminado permanentemente: ${deletedUser.username}`);
            return deletedUser;
        } catch (error) {
            throw error;
        }
    }

    // Obtener estadísticas
    static getStats() {
        const users = User.getAll();
        const totalMoney = users.reduce((sum, user) => sum + (user.money || 0), 0);
        const averageMoney = users.length > 0 ? totalMoney / users.length : 0;

        return {
            totalUsers: users.length,
            totalMoney: totalMoney,
            averageMoney: Math.round(averageMoney)
        };
    }
}

module.exports = User;
