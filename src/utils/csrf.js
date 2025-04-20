
import api from '../services/axios'  // your axios instance if you have one

export const initCsrfToken = async () => {
    const baseURL = import.meta.env.VITE_API_URL;
  try {
    const res = await api.get('http://localhost:8000/api/v1/get-csrf-token')
    console.log('✅ CSRF token set.', res)
  } catch (err) {
    console.error('❌ Failed to set CSRF token:', err)
  }
}
