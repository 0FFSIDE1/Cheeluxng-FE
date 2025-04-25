<!-- src/components/AddToCartBtn.vue -->
<template>
    <button
      class="btn btn-dark px-6 py-2 rounded-full transition-all w-full"
      :disabled="isAddingToCart || isDisabled"
      @click="handleAddToCart"
      aria-label="Add to cart"
    >
      <span v-if="isAddingToCart" class="animate-spin">⏳</span>
      <span v-else>Add to Cart</span>
    </button>
  </template>
  
  <script>
  import { useToast } from 'vue-toastification';

  const toast = useToast();
  export default {
    name: 'AddToCartBtn',
    props: {
      isAddingToCart: {
        type: Boolean,
        default: false,
      },
      isDisabled: {
        type: Boolean,
        default: false,
      },
      payload: {
        type: Object,
        required: true,
        validator: (payload) => 'id' in payload && 'size' in payload && 'color' in payload,
      },
    },
    methods: {
      handleAddToCart() {

        if (!this.payload || !this.payload.id || !this.payload.size || !this.payload.color) {
            toast.error('Invalid Payload', {
                timeout: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            })
          return;
        }
        this.$emit('add-to-cart', this.payload);
      },
    },
  };
  </script>