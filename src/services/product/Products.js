import api from "@/axios";

export const fetchAllProducts = (params = {}) => api.get('products', { params }); 
export const fetchAllProductsById = async (id) => {
    return api.get(`product/${id}`);
};
