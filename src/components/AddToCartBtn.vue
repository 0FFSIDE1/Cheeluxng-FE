<!-- src/components/AddToCartBtn.vue -->
<template>
    <button
      class="btn btn-primary px-6 py-2 rounded-full transition-all w-full"
      :disabled="isAddingToCart || isDisabled"
      @click="handleAddToCart"
      aria-label="Add to cart"
    >
      <span v-if="isAddingToCart" class="animate-spin">⏳</span>
      <span v-else>Add to Cart</span>
    </button>
  </template>
  
  <script>
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
        console.log('AddToCartBtn: Handling click with payload', this.payload);
        if (!this.payload || !this.payload.id || !this.payload.size || !this.payload.color) {
          console.error('AddToCartBtn: Invalid payload', this.payload);
          return;
        }
        console.log('AddToCartBtn: Emitting add-to-cart', this.payload);
        this.$emit('add-to-cart', this.payload);
        console.log('AddToCartBtn: add-to-cart emitted');
      },
    },
  };
  </script>