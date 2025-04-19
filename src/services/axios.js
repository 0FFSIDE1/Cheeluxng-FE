import axios from 'axios';

// Validate environment variable
if (!import.meta.env.VITE_API_URL) {
    throw new Error('VITE_API_URL is not defined in the environment variables. Please set it in your .env file.');
}

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// CSRF auto-injection
api.interceptors.request.use((config) => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken && !config.headers['X-CSRFToken']) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

// Utility to get cookie value
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default api;
