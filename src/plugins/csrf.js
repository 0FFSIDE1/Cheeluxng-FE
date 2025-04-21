import api from '../services/axios';
import Cookies from 'js-cookie';

export const fetchCsrfToken = async () => {
  if (!Cookies.get('csrftoken')) {
    await api.get('get-csrf-token');
  }
};

export default {
  install: async (app) => {
    // Fetch CSRF token on app start
    await fetchCsrfToken();

    // Make csrf utility available globally
    app.config.globalProperties.$csrf = {
      fetch: fetchCsrfToken,
    };
  }
};