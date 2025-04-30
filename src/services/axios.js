import axios from 'axios';
import { fetchCsrfToken } from '../plugins/csrf';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',

  },
});



/// Add request interceptor to include CSRF token for non-GET requests
api.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
    let csrfToken = getCookie('csrftoken');
    if (csrfToken === 'None') {
      // Fetch CSRF token if not found
      response = await api.get('get-csrf-token');
      csrfToken = response
      console.log(response)
      console.log(csrfToken)
    }
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    } else {
      console.warn('CSRF token not available');
    }
  }
  return config;
}, (error) => Promise.reject(error));

// Helper function to get CSRF token from cookies
function getCookie(name) {
  let cookieValue = 'None';
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default api;
