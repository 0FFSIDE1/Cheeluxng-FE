import api from "../axios";
import { fetchCsrfToken } from '../../plugins/csrf';

export const getCart = () => api.get('get-cart');

export const addToCart = async (itemId, data) => {
  await fetchCsrfToken();
  return api.post(`${itemId}/add-to-cart`, data);
};

export const updateCart = async (itemId, payload) => {
  await fetchCsrfToken();
  return api.patch(`${itemId}/update-cart`, payload);
};

export const deleteCartItem = async (itemId) => {
  await fetchCsrfToken();
  return api.delete(`${itemId}/delete`);
};