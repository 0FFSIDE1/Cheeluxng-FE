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

// Define safe HTTP methods that require CSRF protection
const CSRF_PROTECTED_METHODS = ['post', 'put', 'patch', 'delete']

// Interceptor to attach CSRF token to applicable requests
api.interceptors.request.use(
  (config) => {
    const method = config.method?.toLowerCase()
    const csrfToken = Cookies.get('csrftoken')

    if (csrfToken && method && CSRF_PROTECTED_METHODS.includes(method)) {
      config.headers['X-CSRFToken'] = csrfToken
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default api;
