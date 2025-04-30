import api from '@/services/axios';
import Cookies from 'js-cookie';

export const fetchCsrfToken = async () => {
  if (!Cookies.get('csrftoken')) {
    try {
      const response = await api.get('get-csrf-token'); // ensure this endpoint matches your Django route
      console.log('CSRF token fetched:', Cookies.get('csrftoken'), response.data.csrfToken);
      return response.data.csrfToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
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