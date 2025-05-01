<!-- src/views/Product.vue -->
<template>
  <div class="bg-pink-100 py-8 min-h-screen">
    <div v-if="loading" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-lg font-lato text-gray-950">Loading product...</p>
    </div>
    <div v-else-if="error" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-lg font-lato text-red-600">{{ error }}</p>
      <router-link to="/explore" class="cartBtn mt-4 inline-block">
        Back to Explore
      </router-link>
    </div>
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
    <button
    @click="goBack"
    class="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg shadow hover:bg-gray-900 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
     >
    ← Back
    </button>
      <!-- Product Details -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Image Gallery -->
        <div class="flex flex-col gap-4">
          <img
            :src="mainImage"
            :alt="`Main image of ${product.name}`"
            class="w-full h-[600px] rounded-3xl shadow-md object-cover"
            loading="lazy"
          />
          <div class="flex gap-2 overflow-x-auto">
            <img
              v-for="(image, index) in thumbnailImages"
              :key="index"
              :src="image"
              :alt="`Thumbnail ${index + 1} of ${product.name}`"
              class="w-16 h-16 rounded-lg cursor-pointer object-cover hover:opacity-75"
              :class="{ 'ring-2 ring-primary': mainImage === image }"
              loading="lazy"
              @click="mainImage = image"
            />
          </div>
        </div>
        <!-- Product Info -->
        <div class="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center gap-4">
          <h1 class="text-3xl font-montserrat text-gray-950">{{ product.name }}</h1>
          <p class="text-2xl font-lato text-gray-950">${{ product.price.toFixed(2) }}</p>
          <p class="text-base font-lato text-gray-700">{{ product.description }}</p>
          <!-- Variant Selection -->
          <ProductOptionsSelector
          :productId="product.id"
          :availableOptions="product.available_options"
          :selected-size="selectedSize"
          :selected-color="selectedColor"
          @update:size="selectSize"
          @update:color="selectColor"
          />
          <!-- Quantity -->
          <div class="flex items-center gap-4">
            <label for="quantity" class="text-base font-lato text-gray-950">Quantity:</label>
            <input
              id="quantity"
              v-model.number="quantity"
              type="number"
              min="1"
              class="w-20 p-2 border border-gray-300 rounded-lg text-base font-lato focus:ring-2 focus:ring-primary"
              aria-label="Select quantity"
            />
          </div>
          <!-- Add to Cart -->
          <AddToCartBtn
            :payload="cartPayload"
            :disabled="!canAddToCart"
            :is-adding="isAddingToCart"
            @add-to-cart="handleAddToCart"
            class="w-full sm:w-auto"
          />
          <p
            v-if="errorMessage"
            class="text-red-600 text-sm font-lato"
            role="alert"
            aria-live="assertive"
          >
            {{ errorMessage }}
          </p>
        </div>
      </div>
      <div class="mt-12">
        <PopularSelling background="bg-pink-100"/>
      </div>
      
      <NewsletterSubscribe/>
    </div>
  </div>
 
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { useToast } from 'vue-toastification';
import AddToCartBtn from '@/components/AddToCartBtn.vue';
import ProductOptionsSelector from '@/components/productOptions.vue';
import NewsletterSubscribe from '@/components/Subscribe.vue'
import PopularSelling from '@/components/PopularSelling.vue';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const toast = useToast();

const product = ref(null); // Changed from [] to null for single object
const mainImage = ref('');
const selectedSize = ref(null);
const selectedColor = ref(null);
const quantity = ref(1);
const loading = ref(true);
const error = ref('');
const isAddingToCart = ref(false);
const errorMessage = ref('');

const goBack = () => {
  router.back();
};

// Fetch product
onMounted(async () => {
  try {
    const productId = route.params.id;
    console.log('Product: Fetching product', { productId });
    const response = await productStore.loadProductById(productId);
    console.log('Product: API response', response);
    if (!response) {
      throw new Error('Product not found');
    }
    product.value = response;
    mainImage.value = product.value.cover_image  || '/images/placeholder.jpg';
    console.log('Product: Loaded product', product.value);
  } catch (err) {
    console.error('Product: Failed to load product', err);
    error.value = 'Failed to load product. Please try again.';
    toast.error(error.value);
  } finally {
    loading.value = false;
  }
});
const thumbnailImages = computed(() => {
  if (!product.value) return [];

  const cover = product.value.cover_image;
  const optionImages = product.value.available_options?.flatMap(option =>
    option.colors
      .map(color => color.image_url)
      .filter(url => !!url && url !== '{}' && url !== 'null')
  ) || [];

  const uniqueImages = Array.from(new Set(optionImages)); // remove duplicates

  if (uniqueImages.length === 0 && cover) {
    return [cover];
  }

  // Always include cover image first if it exists and not already in the list
  return cover && !uniqueImages.includes(cover)
    ? [cover, ...uniqueImages]
    : uniqueImages;
});


// Variant selection
const selectSize = ({ sizeIndex }) => {
  console.log('Product: Size selected', { sizeIndex });
  selectedSize.value = sizeIndex;
  selectedColor.value = null; // Reset color when size changes
  errorMessage.value = '';
};

const selectColor = ({ colorIndex }) => {
  console.log('Product: Color selected', { colorIndex });
  selectedColor.value = colorIndex;
  errorMessage.value = '';
};

// Cart payload
const cartPayload = computed(() => {
  const payload = {
    id: product.value?.id || '',
    size: '',
    color: '',
    quantity: quantity.value,
  };
  if (!product.value || !product.value.available_options) return payload;
  const sizeIndex = selectedSize.value;
  if (sizeIndex != null && product.value.available_options[sizeIndex]) {
    const size = product.value.available_options[sizeIndex];
    payload.size = size.size || '';
    const colorIndex = selectedColor.value;
    if (colorIndex != null && size.colors && size.colors[colorIndex]) {
      payload.color = size.colors[colorIndex].name || '';
    }
  }
  console.log('Product: Generated cart payload', payload);
  return payload;
});

// Cart validation
const canAddToCart = computed(() => {
  if (!product.value || !product.value.available_options) return false;
  const sizeIndex = selectedSize.value;
  const colorIndex = selectedColor.value;
  if (sizeIndex == null || colorIndex == null) return false;
  const size = product.value.available_options[sizeIndex];
  const color = size?.colors?.[colorIndex];
  return size && color && color.instock && quantity.value > 0;
});

// Add to cart
const handleAddToCart = async () => {
  if (!canAddToCart.value) {
    errorMessage.value = 'Please select size and color.';
    toast.error(errorMessage.value);
    return;
  }
  isAddingToCart.value = true;
  try {
    const payload = cartPayload.value;
    await cartStore.addProductToCart(payload.id, payload);
    console.log('Product: Added to cart', payload);
    toast.success(`${payload.size} ${payload.color} ${product.value.name} added to cart!`);
    selectedSize.value = null;
    selectedColor.value = null;
    quantity.value = 1;
  } catch (err) {
    console.error('Product: Failed to add to cart', err);
    errorMessage.value = 'Failed to add to cart. Please try again.';
    toast.error(errorMessage.value);
  } finally {
    isAddingToCart.value = false;
  }
};
</script>