import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach CSRF token to applicable requests
api.interceptors.request.use(
  (config) => {
    const method = config.method?.toLowerCase();
    const csrfToken = getCookie('csrftoken');
    console.log(`About to send ${method} with CSRF:`, Cookies.get('csrftoken'));
    // Set X-CSRFToken header for unsafe methods
    if (csrfToken && method && ['post', 'put', 'patch', 'delete'].includes(method)) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    // Set Referer header to match frontend origin
    config.headers['x-csrftoken'] = window.location.origin;

    return config;
  },
  (error) => Promise.reject(error)
);

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export default api;