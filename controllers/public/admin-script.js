/* admin-script.js */

let adminToken = null;
let currentUsers = [];
let selectedUserId = null;

// Función de login de admin
async function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (!username || !password) {
        showError('loginError', 'Por favor ingresa usuario y contraseña');
        return;
    }
    
    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            adminToken = data.token;
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            loadDashboard();
        } else {
            showError('loginError', data.error || 'Credenciales inválidas');
        }
    } catch (error) {
        showError('loginError', 'Error de conexión: ' + error.message);
    }
}

// Cargar dashboard
async function loadDashboard() {
    await Promise.all([
        loadStats(),
        loadUsers()
    ]);
}

// Cargar estadísticas
async function loadStats() {
    try {
        const response = await fetch('/api/admin/stats', {
            headers: {
                'Authorization': adminToken
            }
        });
        
        const stats = await response.json();
        
        if (response.ok) {
            document.getElementById('totalUsers').textContent = stats.totalUsers;
            document.getElementById('totalMoney').textContent = '$' + stats.totalMoney.toLocaleString();
            document.getElementById('averageMoney').textContent = '$' + stats.averageMoney.toLocaleString();
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Cargar usuarios
async function loadUsers() {
    try {
        const response = await fetch('/api/admin/users', {
            headers: {
                'Authorization': adminToken
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentUsers = data.users;
            displayUsers(data.users);
        } else {
            showError('usersError', data.error || 'Error cargando usuarios');
        }
    } catch (error) {
        showError('usersError', 'Error de conexión: ' + error.message);
    }
}

// Mostrar usuarios en tabla
function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #888;">No hay usuarios registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id.substring(0, 8)}...</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>$${user.money.toLocaleString()}</td>
            <td>${user.createdAt}</td>
            <td class="user-actions">
                <button class="btn-small" onclick="openResetModal('${user.id}', '${user.username}')">
                    🔑 Reset
                </button>
                <button class="btn-small" onclick="openMoneyModal('${user.id}', '${user.username}', ${user.money})">
                    💰 Dinero
                </button>
                <button class="btn-small btn-danger" onclick="deleteUser('${user.id}', '${user.username}')">
                    🗑️ Eliminar
                </button>
            </td>
        </tr>
    `).join('');
}

// Abrir modal de reset de contraseña
function openResetModal(userId, username) {
    selectedUserId = userId;
    document.getElementById('resetUsername').textContent = username;
    document.getElementById('newPassword').value = '';
    document.getElementById('resetModal').style.display = 'block';
}

// Abrir modal de actualizar dinero
function openMoneyModal(userId, username, currentMoney) {
    selectedUserId = userId;
    document.getElementById('moneyUsername').textContent = username;
    document.getElementById('currentMoney').textContent = currentMoney.toLocaleString();
    document.getElementById('newMoney').value = currentMoney;
    document.getElementById('moneyModal').style.display = 'block';
}

// Cerrar modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    selectedUserId = null;
}

// Confirmar reset de contraseña
async function confirmPasswordReset() {
    const newPassword = document.getElementById('newPassword').value;
    
    if (!newPassword || newPassword.length < 3) {
        alert('La contraseña debe tener al menos 3 caracteres');
        return;
    }
    
    try {
        const response = await fetch('/api/admin/users/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': adminToken
            },
            body: JSON.stringify({
                userId: selectedUserId,
                newPassword: newPassword
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('usersSuccess', `Contraseña actualizada. Nueva contraseña: ${data.newPassword}`);
            closeModal('resetModal');
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error de conexión: ' + error.message);
    }
}

// Confirmar actualización de dinero
async function confirmMoneyUpdate() {
    const newAmount = parseInt(document.getElementById('newMoney').value);
    
    if (isNaN(newAmount) || newAmount < 0) {
        alert('Por favor ingresa un monto válido');
        return;
    }
    
    try {
        const response = await fetch('/api/admin/users/update-money', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': adminToken
            },
            body: JSON.stringify({
                userId: selectedUserId,
                newAmount: newAmount
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('usersSuccess', data.message);
            closeModal('moneyModal');
            await loadUsers(); // Recargar lista
            await loadStats(); // Actualizar estadísticas
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error de conexión: ' + error.message);
    }
}

// Eliminar usuario
async function deleteUser(userId, username) {
    if (!confirm(`¿Estás seguro de eliminar al usuario "${username}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`/api/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': adminToken
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('usersSuccess', data.message);
            await loadUsers(); // Recargar lista
            await loadStats(); // Actualizar estadísticas
        } else {
            showError('usersError', data.error);
        }
    } catch (error) {
        showError('usersError', 'Error de conexión: ' + error.message);
    }
}

// Actualizar lista de usuarios
async function refreshUsers() {
    await loadUsers();
    await loadStats();
    showSuccess('usersSuccess', 'Lista actualizada correctamente');
}

// Cerrar sesión
function logout() {
    if (confirm('¿Seguro que quieres cerrar sesión?')) {
        adminToken = null;
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('adminUsername').value = '';
        document.getElementById('adminPassword').value = '';
        hideMessages();
    }
}

// Funciones de utilidad
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

function hideMessages() {
    const messages = document.querySelectorAll('.error-message, .success-message');
    messages.forEach(msg => msg.style.display = 'none');
}

// Event listeners
document.getElementById('adminUsername').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('adminPassword').focus();
    }
});

document.getElementById('adminPassword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adminLogin();
    }
});

// Cerrar modales al hacer clic fuera
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
