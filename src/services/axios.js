import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true, // Necessary for cross-origin cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Interceptor to attach CSRF token to unsafe methods
api.interceptors.request.use(
  async (config) => {
    const method = config.method?.toLowerCase();

    if (['post', 'put', 'patch', 'delete'].includes(method)) {
      let csrfToken = getCookie('csrftoken');
      if (!csrfToken || csrfToken === 'None') {
        // Try to fetch CSRF token from backend
        try {
          var response = await api.get('get-csrf-token');
          csrfToken = response.data.csrfToken
        } catch (err) {
          console.error('Failed to fetch CSRF token:', err);
        }
      }
      if (csrfToken && csrfToken !== 'None') {
        config.headers['X-CSRFToken'] = csrfToken;
      } else {
        console.warn('CSRF token not available for request.');
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default api;
