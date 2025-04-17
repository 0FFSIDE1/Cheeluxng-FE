import axios from 'axios';


const baseURL = 'http://localhost:8000/api/v1/'
const api = axios.create(
    {
        baseURL: baseURL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },

    }
);

// CSRF auto-injection
api.interceptors.request.use((config) => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken && !config.headers['X-CSRFToken']){
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config
})

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