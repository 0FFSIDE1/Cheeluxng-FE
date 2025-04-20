import api from "../axios";

export const getCart = () => api.get('get-cart');
export const addToCart = (itemId, data) => api.post(`${itemId}/add-to-cart`, data);
export const updateCart = (itemId, payload) => api.patch(`${itemId}/update-cart`, payload);
export const deleteCartItem = (itemId) => api.delete(`${itemId}/delete`);