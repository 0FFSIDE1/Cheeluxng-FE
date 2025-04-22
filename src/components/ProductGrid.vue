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
      <ProductOptionsSelector
        v-if="product.available_options"
        :availableOptions="product.available_options"
        :selectedSize="selectedOptions[product.id]?.size"
        :selectedColor="selectedOptions[product.id]?.color"
        :productId="product.id"
        @update:size="handleSizeChange"
        @update:color="handleColorChange"
      />
      <div class="text-center">
        <button @click="addToCart(index)" class="bg-white text-black rounded-lg mt-4 w-12 h-10 hover:bg-gray-900 hover:text-white">
              +
        </button>
      </div>
      
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../store/productStore';
import ProductOptionsSelector from './productOptions.vue';
import { computed, ref } from 'vue';
import { useCartStore } from '../store/cartStore';


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
      const { category = 'men', productType } = props.selectedFilters;
      let products = productStore.categories[category] || [];
      console.log(products)

      if (productType) {
        products = products.filter(product => product.product_type === productType);
      }

      return products;
    });
    // console.log(filteredProducts.value)

    const selectedOptions = ref({});

    const handleSizeChange = ({ sizeIndex, productId }) => {
      if (!selectedOptions.value[productId]) {
        selectedOptions.value[productId] = {};
      }
      selectedOptions.value[productId].size = sizeIndex;
    };

    const handleColorChange = ({ colorIndex, productId }) => {
      if (!selectedOptions.value[productId]) {
        selectedOptions.value[productId] = {};
      }
      selectedOptions.value[productId].color = colorIndex;
    };

    const cartStore = useCartStore();
    const addToCart = (index) => {
    const product = filteredProducts.value[index];
    const productSelection = selectedOptions.value[product.id] || {};
    const sizeIndex = productSelection.size;
    const colorIndex = productSelection.color;

    if (sizeIndex == null || colorIndex == null) {
      alert('Please select both size and color before adding to cart ❗');
      return;
    }

    const size = product.available_options[sizeIndex];
    const color = size?.colors?.[colorIndex];

    if (!color || !color.instock) {
      alert('Selected color is invalid or out of stock ❗');
      return;
    }

    const payload = {
      id: product.id,
      size: size.size,
      color: color.name,
    };

    console.log('Adding to cart:', payload);
    cartStore.addProductToCart(product.id, payload)

    // Add to cart logic here (e.g., emit or use cart store)
  };

    return {
      filteredProducts,
      selectedOptions,
      handleSizeChange,
      handleColorChange,
      addToCart
    };
  },
  mounted() {
    const productStore = useProductStore();
    if (!productStore.categories.men.length) {
      productStore.loadAllProducts();
    }
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