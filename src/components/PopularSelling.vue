<!-- src/components/PopularSelling.vue -->
<template>
  <section
    class="w-full py-8"
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
    <div
      v-else-if="!filteredItems.length"
      class="prose text-center text-gray-600 mx-auto px-4"
    >
      <h2
        class="text-lg @sm:text-xl @md:text-2xl font-semibold font-montserrat"
      >
        No {{ title }} Available
      </h2>
      <p class="font-lato text-sm @sm:text-base">Check back soon for our top picks!</p>
    </div>

    <!-- Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-6">
        <!-- Centered Title -->
        <h2
          class="prose text-center text-gray-950 text-lg @sm:text-xl @md:text-2xl @lg:text-3xl font-semibold font-montserrat leading-snug animate-fade-in"
        >
          {{ title }}
        </h2>

        <!-- Filter Buttons -->
        <div
          class="flex flex-wrap gap-2 @sm:gap-4 justify-center max-w-3xl mx-auto"
        >
          <button
            v-for="filter in filters"
            :key="filter"
            class="btn btn-sm @sm:btn-md rounded-full transition-all font-lato text-xs @sm:text-sm"
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
      <div class="mt-6 @md:mt-8">
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
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import Slider from './Slider.vue';

const props = defineProps({
  title: { type: String, default: 'Popular Selling' },
  filters: { type: Array, default: () => ['All', 'Women', 'Men'] },
  items: { type: Array, default: () => [] },
  visibleItems: {
    type: Object,
    default: () => ({ xs: 1, sm: 2, md: 3, lg: 4 }),
  },
  sliderTitle: { type: String, default: 'None' },
  to: { type: String, default: '/explore' },
  background: { type: String, default: '' },
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
    try {
      await productStore.loadAllProducts();
    } catch (err) {
      console.error('PopularSelling: Failed to load products', err);
    }
  }
});

// Handle cart addition
const handleCartAdd = (payload) => {
  cartStore.addProductToCart(payload);
  emit('add-to-cart', payload);
};
</script>

<style scoped>
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