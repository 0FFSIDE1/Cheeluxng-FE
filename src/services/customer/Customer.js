import api from '../axios'
import { fetchCsrfToken } from '../../plugins/csrf';

export const fetchCustomerDetails = () => api.get('customer');

export const CreateCustomer = async (payload) => {
    await fetchCsrfToken();
    return api.post('customer/create', payload);
}