<template>
  <div class="flex flex-col items-center">
    <div class="product-grid grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="(product, index) in visibleProducts"
        :key="product.id"
        class="product-card border p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col"
      >
        <img
          :src="product.cover_image"
          :alt="product.name"
          class="w-full h-56 object-cover rounded-md mb-2"
        />
        <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
        <p class="text-gray-600">${{ product.price }}</p>

        <!-- Product Options Selector (Sizes & Colors) -->
        <ProductOptionsSelector
          v-if="product.available_options && product.available_options.length"
          :availableOptions="product.available_options"
          :selectedSize="selectedOptions[product.id]?.size ?? null"
          :selectedColor="selectedOptions[product.id]?.color ?? null"
          :productId="product.id"
          @update:size="(payload) => updateSize(product.id, payload.sizeIndex)"
          @update:color="(payload) => updateColor(product.id, payload.colorIndex)"
        />

        <div class="text-center mt-auto">
          <button
            @click="addToCart(index)"
            class="bg-gray-900 text-white rounded-lg mt-4 w-12 h-10 hover:bg-gray-600 hover:text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="visibleProducts.length < filteredProducts.length" class="mt-8">
      <button
        @click="loadMore"
        class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import ProductOptionsSelector from './productOptions.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
  name: 'ProductGrid',
  components: {
    ProductOptionsSelector,
  },
  props: {
    selectedFilters: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const productStore = useProductStore();
    const cartStore = useCartStore();

    const productsPerPage = 8;
    const currentPage = ref(1);

    const filteredProducts = computed(() => {
      const { name, type, minPrice, maxPrice, category, section } = props.selectedFilters;
      let products = productStore.allProducts || [];

      if (category) {
        products = products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
      }

      if (type) {
        products = products.filter(p => p.product_type?.toLowerCase().includes(type.toLowerCase()));
      }

      if (name && name.trim()) {
        const nameLower = name.trim().toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(nameLower));
      }

      if (minPrice !== null && !isNaN(minPrice)) {
        products = products.filter(p => p.price >= minPrice);
      }

      if (maxPrice !== null && !isNaN(maxPrice)) {
        products = products.filter(p => p.price <= maxPrice);
      }

      if (section) {
        products = products.filter(p => p.section?.toLowerCase() === section.toLowerCase());
      }

      return products;
    });

    const visibleProducts = computed(() => {
      return filteredProducts.value.slice(0, currentPage.value * productsPerPage);
    });

    const loadMore = () => {
      currentPage.value++;
    };

    const selectedOptions = ref({});

    const updateSize = (productId, sizeIndex) => {
      if (!selectedOptions.value[productId]) {
        selectedOptions.value[productId] = { size: null, color: null };
      }
      selectedOptions.value[productId].size = sizeIndex;
      selectedOptions.value[productId].color = null; // Reset color when size changes
    };

    const updateColor = (productId, colorIndex) => {
      if (selectedOptions.value[productId]) {
        selectedOptions.value[productId].color = colorIndex;
      }
    };

    const addToCart = (index) => {
      const product = visibleProducts.value[index];
      const options = selectedOptions.value[product.id];

      if (!options || options.size === null || options.color === null) {
      
        toast.error('Please select size and color before adding to cart!')

        return;
      }

      const sizeObj = product.available_options?.[options.size];
      const colorObj = sizeObj?.colors?.[options.color];

      if (!sizeObj || !colorObj || !colorObj.instock) {
        toast.error('Selected option is out of stock.')
        return;
      }

      const payload = {
        id: product.id,
        size: sizeObj.size,
        color: colorObj.name,
        name: product.name,
      };
      cartStore.addProductToCart(product.id, payload);
      toast.success(`Added ${payload.size} / ${payload.color} ${payload.name} to cart!`);
    };

    return {
      filteredProducts,
      visibleProducts,
      loadMore,
      addToCart,
      selectedOptions,
      updateSize,
      updateColor,
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
