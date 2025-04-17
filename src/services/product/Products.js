import api from "../axios";

export const fetchAllProducts = (params = {}) => api.get('products', { params }); 
