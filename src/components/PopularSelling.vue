<!-- src/components/PopularSelling.vue -->
<template>
    <section
      class="w-full py-8 @container"
      :class="background || 'bg-gradient-to-b from-slate-200 to-slate-100'"
    >
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-32">
        <div
          class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-primary"
          aria-label="Loading popular selling products"
        ></div>
      </div>
  
      <!-- Empty State -->
      <div v-else-if="!filteredItems.length" class="prose text-center text-gray-600 mx-auto">
        <h2 class="text-xl font-semibold font-montserrat">No {{ title }} Available</h2>
        <p class="font-lato">Check back soon for our top picks!</p>
      </div>
  
      <!-- Content -->
      <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 md:px-4">
        <div class="flex flex-col gap-4">
          <!-- Centered Title -->
          <div class="w-full flex justify-center">
            <h2
              class="prose prose-lg text-gray-900 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold font-montserrat leading-snug animate-fade-in"
            >
              {{ title }}
            </h2>
          </div>
          <!-- Filter Buttons -->
          <div class="flex flex-wrap gap-4 justify-center">
            <button
              v-for="filter in filters"
              :key="filter"
              class="btn btn-sm rounded-full transition-all font-lato"
              :class="{
                'btn-dark': activeFilter === filter,
                'btn-ghost hover:bg-gray-200': activeFilter !== filter,
                'btn-secondary': filter === 'Women' && activeFilter === 'Women',
                'btn-primary': filter === 'Men' && activeFilter === 'Men',
              }"
              @click="activeFilter = filter"
              :aria-label="`Filter by ${filter} products`"
              :aria-pressed="activeFilter === filter"
            >
              {{ filter }}
            </button>
          </div>
        </div>
        <!-- Slider -->
        <div class="mt-4">
          <Slider
            :title="sliderTitle"
            :items="filteredItems"
            :visibleItems="visibleItems"
            @add-to-cart="handleCartAdd"
            :to="to"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useProductStore } from '../store/productStore';
  import { useCartStore } from '../store/cartStore';
  import Slider from './Slider.vue';
  
  const props = defineProps({
    title: { type: String, default: 'POPULAR SELLING' },
    filters: { type: Array, default: () => ['All', 'Women', 'Men'] },
    items: { type: Array, default: () => [] },
    visibleItems: { type: Number, default: 4 },
    sliderTitle: { type: String, default: 'None' },
    to: { type: String, default: '/explore' },
    background: { type: String, default: '' }, // Dynamic background prop
  });
  
  const emit = defineEmits(['add-to-cart']);
  
  const productStore = useProductStore();
  const cartStore = useCartStore();
  const activeFilter = ref('All');
  
  // Use props.items if provided, otherwise use productStore.sections.bestSellers
  const items = computed(() => {
    return props.items.length > 0 ? props.items : productStore.sections.bestSellers;
  });
  
  // Filter items based on activeFilter
  const filteredItems = computed(() => {
    if (activeFilter.value === 'All') return items.value;
    return items.value.filter((item) => item.category === activeFilter.value);
  });
  
  // Loading state
  const loading = computed(() => {
    return props.items.length === 0 && productStore.loading;
  });
  
  // Fetch products if no items are provided
  onMounted(async () => {
    if (props.items.length === 0) {
      console.log('PopularSelling: Fetching products');
      try {
        await productStore.loadAllProducts();
        console.log('PopularSelling: Products loaded', productStore.sections.bestSellers);
      } catch (err) {
        console.error('PopularSelling: Failed to load products', err);
      }
    }
  });
  
  // Handle cart addition
  const handleCartAdd = (payload) => {
    console.log('PopularSelling: Adding to cart', payload);
    cartStore.addProductToCart(payload.id, payload);
    emit('add-to-cart', payload);
  };
  </script>
  
  <style scoped>
  /* Ensure Tailwind utilities are applied */
  .animate-fade-in {
    animation: fadeIn 1s ease-in;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>