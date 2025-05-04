import { defineStore } from "pinia";
import { getCart, deleteCartItem, updateCart, addToItemCart } from "../services/cart/cart";

export const useCartStore = defineStore('cartstore', {
    state: () => ({
        cartItems: [],
        totalAmount: 0,
        loading: false,
        error: null,
        message: '',
    }),
    actions: {
        async fetchCart() {
            this.loading = true
            this.error = null
            try {
                const response = await getCart()
                if (response.data.success) {
                    this.cartItems = response.data.cart.items
                    this.totalAmount = response.data.cart.total_amount
                } else {
                    this.error = response.data.message
                }
            } catch (err){
                this.error = err.response?.data?.message || 'Failed to load cart.'
            }finally {
                this.loading = false
            }
        },

        async addProductToCart(payload) {
            this.loading = true;
            this.error = null;
            try {
              const response = await addToItemCart(payload);
              if (response.data.success) {
                this.message = response.data.message
                await this.fetchCart(); // refresh cart state
                return { success: true, message: this.message };
              } else {
                this.error = response.data.message;
                return { success: false, message: this.message };
              }
            } catch (err) {
              this.error = err.response?.data?.message || "Failed to add item to cart.";
              return { success: false, message: this.error };
            } finally {
              this.loading = false;
            }
        },

        async updateCartItem(itemId, payload) {
            this.loading = true;
            this.error = null;
            try {
              const response = await updateCart(itemId, payload);
              
              if (response.data.success) {
                await this.fetchCart(); // refresh cart
              } else {
                this.error = response.data.message;
              }
            } catch (err) {
              this.error = err.response?.data?.message || 'Failed to update item.';
            } finally {
              this.loading = false;
            }
        },

        async clearCartItem(itemId) {
            this.loading = true;
            this.error = null;
            try {
              const response = await deleteCartItem(itemId);
              if (response.data.success) {
                // Refresh cart
                await this.fetchCart();
              } else {
                this.error = response.data.message;
              }
            } catch (err) {
              this.error = err.response?.data?.message || 'Failed to remove item.';
            } finally {
              this.loading = false;
            }
          },

    },
    
})