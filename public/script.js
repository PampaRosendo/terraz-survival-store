// URL base del backend
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3001/api'
    : '/api';

const simpleLoginForm = document.getElementById('simple-login-form');
const simpleLoginMessage = document.getElementById('simple-login-message');
const userPanel = document.getElementById('user-panel');
const userToken = document.getElementById('user-token');
const userEconomy = document.getElementById('user-economy');
const logoutBtn = document.getElementById('logout-btn');

function showMessage(element, message, isSuccess = true) {
    element.textContent = message;
    element.className = isSuccess ? 'message success' : 'message error';
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 4000);
}

function saveUserToLocal(username, userId) {
    localStorage.setItem('simple_username', username);
    localStorage.setItem('simple_userid', userId);
}

function getUserFromLocal() {
    return {
        username: localStorage.getItem('simple_username'),
        userId: localStorage.getItem('simple_userid')
    };
}

async function createOrGetUser(username) {
    // Intenta crear usuario, si ya existe, lo obtiene
    const res = await fetch(`${API_BASE_URL}/simple-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error de conexión');
    }
    return await res.json();
}

async function getEconomy(userId) {
    const res = await fetch(`${API_BASE_URL}/simple-user/${userId}/economy`);
    if (!res.ok) return { balance: 0 };
    return await res.json();
}

simpleLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('simple-username').value.trim();
    if (!username) {
        showMessage(simpleLoginMessage, 'El usuario es requerido', false);
        return;
    }
    try {
        const user = await createOrGetUser(username);
        saveUserToLocal(user.username, user._id);
        showUserPanel(user.username, user._id);
    } catch (err) {
        showMessage(simpleLoginMessage, err.message, false);
    }
});

function showUserPanel(username, userId) {
    document.getElementById('simple-login-section').style.display = 'none';
    userPanel.style.display = 'block';
    userToken.textContent = username;
    // Mostrar economía
    getEconomy(userId).then(economy => {
        userEconomy.textContent = `Balance: $${economy.balance ?? 0}`;
    });
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('simple_username');
    localStorage.removeItem('simple_userid');
    userPanel.style.display = 'none';
    document.getElementById('simple-login-section').style.display = 'block';
});

// Al cargar la página, si hay usuario guardado, mostrar panel
document.addEventListener('DOMContentLoaded', () => {
    const user = getUserFromLocal();
    if (user.username && user.userId) {
        showUserPanel(user.username, user.userId);
    }
});
