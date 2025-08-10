// URL base del backend - funciona en desarrollo y producción
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api' 
    : '/api';

// Variables globales
let currentToken = null;

// Elementos del DOM
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const userPanel = document.getElementById('user-panel');
const registerSection = document.getElementById('register-section');
const loginSection = document.getElementById('login-section');
const logoutBtn = document.getElementById('logout-btn');
const refreshUsersBtn = document.getElementById('refresh-users');

// Mensajes
const registerMessage = document.getElementById('register-message');
const loginMessage = document.getElementById('login-message');
const userToken = document.getElementById('user-token');
const usersList = document.getElementById('users-list');

// Función para mostrar mensajes
function showMessage(element, message, isSuccess = true) {
    element.textContent = message;
    element.className = isSuccess ? 'message success' : 'message error';
    element.style.display = 'block';
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// Función para hacer peticiones HTTP
async function makeRequest(url, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    if (currentToken) {
        options.headers['Authorization'] = `Bearer ${currentToken}`;
    }
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Error en la petición');
        }
        
        return result;
    } catch (error) {
        throw new Error(error.message || 'Error de conexión');
    }
}

// Manejar registro
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(registerForm);
    const userData = {
        username: formData.get('username'),
        password: formData.get('password')
    };
    
    try {
        const response = await makeRequest(`${API_BASE_URL}/auth/register`, 'POST', userData);
        showMessage(registerMessage, '¡Usuario registrado exitosamente!', true);
        registerForm.reset();
        
        // Actualizar lista de usuarios
        await loadUsers();
        
    } catch (error) {
        showMessage(registerMessage, `Error: ${error.message}`, false);
    }
});

// Manejar login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(loginForm);
    const userData = {
        username: formData.get('username'),
        password: formData.get('password')
    };
    
    try {
        const response = await makeRequest(`${API_BASE_URL}/auth/login`, 'POST', userData);
        
        currentToken = response.token;
        
        // Guardar datos en localStorage
    localStorage.setItem('authToken', currentToken);
    localStorage.setItem('username', userData.username);
        
        showMessage(loginMessage, '¡Inicio de sesión exitoso! Redirigiendo a la tienda...', true);
        
        // Redirigir a la tienda después de 1.5 segundos
        setTimeout(() => {
            window.location.href = '/shop.html';
        }, 1500);
        
    } catch (error) {
        showMessage(loginMessage, `Error: ${error.message}`, false);
    }
});

// Manejar logout
logoutBtn.addEventListener('click', () => {
    currentToken = null;
    userToken.textContent = '';
    
    // Mostrar formularios y ocultar panel de usuario
    userPanel.style.display = 'none';
    registerSection.style.display = 'block';
    loginSection.style.display = 'block';
    
    // Limpiar formularios
    registerForm.reset();
    loginForm.reset();
});

// Función para cargar usuarios
async function loadUsers() {
    try {
        const response = await makeRequest(`${API_BASE_URL}/auth/users`);
        
        if (response.users && response.users.length > 0) {
            usersList.innerHTML = response.users.map(user => `
                <div class="user-item">
                    <div class="user-username">${user.username}</div>
                    <div class="user-id">ID: ${user.id || user._id || ''}</div>
                </div>
            `).join('');
        } else {
            usersList.innerHTML = `
                <div style="text-align: center; color: #666; padding: 20px;">
                    <p>No hay usuarios registrados aún.</p>
                    <p>¡Sé el primero en registrarte!</p>
                </div>
            `;
        }
    } catch (error) {
        usersList.innerHTML = `
            <div class="user-item" style="border-left-color: #dc3545;">
                <div class="user-email" style="color: #dc3545;">Error al cargar usuarios</div>
                <div class="user-id">${error.message}</div>
            </div>
        `;
    }
}

// Actualizar lista de usuarios
refreshUsersBtn.addEventListener('click', loadUsers);

// Cargar usuarios al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

// Función para verificar si el backend está funcionando
async function checkBackendStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/../`);
        if (response.ok) {
            console.log('✅ Backend conectado correctamente');
        }
    } catch (error) {
        console.warn('⚠️ No se pudo conectar al backend. Asegúrate de que esté funcionando en el puerto 3001 (desarrollo) o que esté desplegado correctamente');
        console.error('Error conectando al backend:', error);
        
        // Mostrar mensaje en la página
        const statusDiv = document.createElement('div');
        statusDiv.innerHTML = `
            <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                <strong>⚠️ Backend no disponible</strong><br>
                Asegúrate de iniciar el servidor backend con: <code>npm run dev</code>
            </div>
        `;
        document.querySelector('.container').insertBefore(statusDiv, document.querySelector('.header'));
    }
}

// Verificar estado del backend al cargar
checkBackendStatus();
