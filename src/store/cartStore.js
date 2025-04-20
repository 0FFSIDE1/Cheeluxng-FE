import { defineStore } from "pinia";
import { getCart, deleteCartItem, updateCart } from "../services/cart/cart";

export const useCartStore = defineStore('cartstore', {
    state: () => ({
        cartItems: [],
        totalAmount: 0,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchCart() {
            this.loading = true
            this.error = null
            try {
                const response = await getCart()
                if (response.data.success) {
                    console.log(response.data)
                    this.cartItems = response.data.cartitems
                    this.totalAmount = response.data.total_amount
                } else {
                    this.error = response.data.message
                }
            } catch (err){
                this.error = err.response?.data?.message || 'Failed to load cart.'
            }finally {
                this.loading = false
            }
        },

        async addToCart(itemId, data) {
            this.loading = true;
            this.error = null;
            try {
              const response = await addToCart(itemId, data);
              if (response.data.success) {
                await this.fetchCart(); // refresh cart state
              } else {
                this.error = response.data.message;
              }
            } catch (err) {
              this.error = err.response?.data?.message || "Failed to add item to cart.";
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