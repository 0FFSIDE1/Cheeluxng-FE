import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach CSRF token to unsafe requests
api.interceptors.request.use(
  (config) => {
    const method = config.method?.toLowerCase();
    const csrfToken = getCookie('csrftoken');
    console.log(csrfToken, method)

    if (csrfToken && method && ['post', 'put', 'patch', 'delete'].includes(method)) {
      config.headers['X-CSRFToken'] = csrfToken;
      console.log(`Attached CSRF token to ${method.toUpperCase()} request:`, csrfToken);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Utility function to read cookie value
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

export default api;
