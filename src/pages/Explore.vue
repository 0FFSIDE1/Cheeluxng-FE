<template>
    <div class="min-h-screen bg-cyan-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl text-center font-bold text-gray-900 mb-8">Explore Our Latest Collections 🛍️</h1>
        <p class="prose text-gray-700 text-base sm:text-lg md:text-xl my-8 max-w-prose mx-auto animate-fade-in animate-delay-200">
            Welcome to our Explore section — your destination for discovering the freshest arrivals and best-selling favorites! ✨ Whether you're upgrading your activewear, searching for cozy loungewear, or finding the perfect statement piece, we've curated a collection that brings comfort, quality, and style together.

            Browse a wide range of categories, including shorts, sleeves, and stylish sets designed for every lifestyle. Our collection is made to move with you — whether you’re hitting the gym, working from home, or heading out for casual weekends
        </p>
  
        <!-- Filter Section -->
        <FilterComponent @update:filters="updateFilters" />
  
        <!-- Show loading until products are ready -->
        <div v-if="loading" class="text-center py-12">
          <p class="text-lg text-gray-700 animate-pulse">Loading products...</p>
        </div>
  
        <div v-else>
          <ProductGrid :selectedFilters="filters" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useProductStore } from '@/store/productStore';
  import FilterComponent from '@/components/Filter.vue';
  import ProductGrid from '@/components/ProductGrid.vue';

  const route = useRoute();
  const productStore = useProductStore();
  const loading = ref(true);
  // Default filters from URL query if any
  const filters = reactive({
    name: route.query.name || '',
    type: route.query.type || '',
    minPrice: route.query.minPrice ? parseFloat(route.query.minPrice) : null,
    maxPrice: route.query.maxPrice ? parseFloat(route.query.maxPrice) : null,
    category: route.query.category || '',
    section: route.query.section || '',
  });
  
  const updateFilters = (newFilters) => {
    Object.assign(filters, newFilters);
  };
  onMounted(async () => {
    if (!productStore.allProducts.length) {
      try {
        await productStore.loadAllProducts();
      } catch (err) {
        console.error('Error loading products:', err);
      }
    }
    loading.value = false;
  });
</script>
  
  