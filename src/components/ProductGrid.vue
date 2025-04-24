<!-- components/ProductGrid.vue -->
<template>
  <div class="product-grid grid grid-cols-2 md:grid-cols-4 gap-4">
    <div
      v-for="(product, index) in filteredProducts"
      :key="product.id"
      class="product-card border p-4 rounded-lg shadow-md hover:shadow-lg transition"
    >
      <img :src="product.cover_image" :alt="product.name" class="w-full h-56 object-cover rounded-md mb-2" />
      <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
      <p class="text-gray-600">${{ product.price }}</p>
      <!-- <ProductOptionsSelector
              v-if="product.available_options"
              :availableOptions="product.available_options"
              :selectedSize="selectedSize"
              :selectedColor="selectedColor"
              :productId="secondaryProduct.id"
              @update:size="handleSizeChange"
              @update:color="handleColorChange"
      /> -->

      <!-- Product Options and add to cart logic here -->
      <div class="text-center">
        <button @click="addToCart(index)" class="bg-white text-black rounded-lg mt-4 w-12 h-10 hover:bg-gray-900 hover:text-white">
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import ProductOptionsSelector from './productOptions.vue'

export default {
  name: 'ProductGrid',
  components: {
    ProductOptionsSelector,
  },
  props: {
    selectedFilters: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const productStore = useProductStore();

    const filteredProducts = computed(() => {
      const { name, type, minPrice, maxPrice, category } = props.selectedFilters;
      let products = productStore.allProducts || [];

      if (category) {
        products = products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
      }

      if (type) {
        products = products.filter(p =>
          p.product_type?.toLowerCase().includes(type.toLowerCase())
        );
      }

      if (name && name.trim()) {
        const nameLower = name.trim().toLowerCase();
        products = products.filter(p =>
          p.name.toLowerCase().includes(nameLower)
        );
      }

      if (minPrice !== null && !isNaN(minPrice)) {
        products = products.filter(p => p.price >= minPrice);
      }

      if (maxPrice !== null && !isNaN(maxPrice)) {
        products = products.filter(p => p.price <= maxPrice);
      }

      return products;
    });

    // Add to cart logic ... (your existing implementation)
    const selectedOptions = ref({});
    const cartStore = useCartStore();
    const addToCart = (index) => {
      const product = filteredProducts.value[index];
      // Assuming selectedOptions and validation logic here...
      // Example payload (adjust as needed)
      const payload = {
        id: product.id,
        // other properties...
      };
      cartStore.addProductToCart(product.id, payload);
    };

    return {
      filteredProducts,
      addToCart,
      selectedOptions
    };
  },
};
</script>

<style scoped>
.product-card img {
  transition: transform 0.3s ease;
}
.product-card:hover img {
  transform: scale(1.05);
}
</style>
