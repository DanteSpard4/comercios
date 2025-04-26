// Constantes y variables globales
const API_URL = 'http://localhost:8000';
const AUTH_ENDPOINT = '/api/v1/auth';
let token = localStorage.getItem('jwtToken');

// Comprobar si el usuario está autenticado
function isAuthenticated() {
    return !!token;
}

// Función para mostrar mensajes de error
function showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

// Redirección según estado de autenticación
function checkAuth() {
    const isLoginPage = window.location.pathname.endsWith('index.html') || 
                        window.location.pathname === '/' ||
                        window.location.pathname === '/comercios/';
                        
    if (!isAuthenticated() && !isLoginPage) {
        // No está autenticado y no está en la página de login
        window.location.href = 'index.html';
    } else if (isAuthenticated() && isLoginPage) {
        // Ya está autenticado y está en la página de login
        window.location.href = 'productos.html';
    }
}

// Iniciar sesión
async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}${AUTH_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: username,
                clave: password
            })
        });

        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }

        const data = await response.json();
        token = data.jwtToken;
        
        // Guardar el token en localStorage
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('username', username);
        
        // Redireccionar a la página de productos
        window.location.href = 'productos.html';
    } catch (error) {
        showError(error.message);
        console.error('Error en login:', error);
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    token = null;
    window.location.href = 'index.html';
}

// Configuración de headers para peticiones autenticadas
function getAuthHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

// Eventos para la página de login
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password);
    });
}

// Eventos para la página de productos (logout)
if (document.getElementById('logout-btn')) {
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Mostrar el nombre del usuario en la página
    const username = localStorage.getItem('username');
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay && username) {
        usernameDisplay.textContent = `Usuario: ${username}`;
    }
}

// Comprobar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', checkAuth);