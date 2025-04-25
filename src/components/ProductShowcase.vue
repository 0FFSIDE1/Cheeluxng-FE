<!-- src/components/ProductShowcase.vue -->
<template>
  <section class="my-6 mx-4 h-full @container">
    <div class="flex justify-center items-center flex-col gap-6 relative">
      <h2
        class="prose prose-lg text-gray-900 text-2xl sm:text-3xl text-center max-w-prose mx-auto animate-fade-in"
      >
        {{ title }}
      </h2>

      <!-- Main Product -->
      <div v-if="mainProduct" class="relative flex justify-center w-full max-w-[700px]">
        <img
          :src="mainProduct.cover_image"
          :alt="mainProduct.name"
          class="object-cover rounded-lg h-auto max-h-[600px] w-full transition-transform hover:scale-[1.02]"
          loading="lazy"
        />

        <!-- Secondary Product -->
        <div
          v-if="hasSecondary"
          class="hidden md:block absolute bottom-0 right-0 md:right-[-80px] h-auto max-h-[400px] w-full max-w-[280px] bg-slate-100 rounded-lg p-3 shadow-lg animate-fade-in animate-delay-200"
        >
          <img
            :src="secondaryProduct.photo_2"
            :alt="secondaryProduct.name"
            class="object-cover rounded-lg w-full h-[200px]"
            loading="lazy"
          />
          <div class="mt-2">
            <h3 class="text-gray-900 text-center md:text-left font-semibold text-base">
              {{ secondaryProduct.name }}
            </h3>
            <p class="text-gray-700 text-center md:text-left font-medium text-sm">
              ₦{{ secondaryProduct.price }}
            </p>

            <!-- Size & Color Selector -->
            <ProductOptionsSelector
              v-if="secondaryProduct.available_options"
              :available-options="secondaryProduct.available_options"
              :selected-size="selectedSize"
              :selected-color="selectedColor"
              :product-id="secondaryProduct.id"
              @update:size="handleSizeChange"
              @update:color="handleColorChange"
            />

            <!-- Add to Cart Button -->
            <AddToCartBtn
              :is-adding-to-cart="isAddingToCart"
              :is-disabled="!canAddToCart"
              :payload="getCartPayload()"
              @add-to-cart="handleAddToCart"
              class="mt-3"
            />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="prose text-center text-gray-600">
        <h3 class="text-lg font-semibold">No Featured Product</h3>
        <p>Check back soon for new arrivals!</p>
      </div>

      <button
        class="btn btn-secondary btn-sm px-6 py-2 rounded-full uppercase tracking-wide animate-pulse hover:scale-105 transition-transform"
        @click="$router.push('/explore')"
        aria-label="View sportswear collection"
      >
        View Collection
      </button>
    </div>
  </section>
</template>

<script>
import ProductOptionsSelector from './productOptions.vue';
import AddToCartBtn from './AddToCartBtn.vue';
import { useCartStore } from '../store/cartStore';
import { useToast } from 'vue-toastification';


const cartStore = useCartStore();
const toast = useToast();
export default {
  name: 'ProductShowcase',
  components: {
    ProductOptionsSelector,
    AddToCartBtn,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    mainProduct: {
      type: Object,
      default: null,
    },
    secondaryProduct: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      selectedSize: null,
      selectedColor: null,
      isAddingToCart: false,
    };
  },
  computed: {
    hasSecondary() {
      const isValid =
        this.secondaryProduct &&
        Object.keys(this.secondaryProduct).length > 0 &&
        !!this.secondaryProduct.photo_2 &&
        !!this.secondaryProduct.id &&
        !!this.secondaryProduct.available_options;
      return isValid;
    },
    canAddToCart() {
      if (!this.secondaryProduct || !this.secondaryProduct.available_options) {
        return false;
      }
      if (this.selectedSize == null || this.selectedColor == null) {
        return false;
      }
      const size = this.secondaryProduct.available_options[this.selectedSize];
      const color = size?.colors?.[this.selectedColor];
      const isValid = size && color && color.instock;
      return isValid;
    },
  },
  methods: {
    handleSizeChange({ sizeIndex }) {
      this.selectedSize = sizeIndex;
      this.selectedColor = null; // Reset color on size change
    },
    handleColorChange({ colorIndex }) {
      this.selectedColor = colorIndex;
    },
    getCartPayload() {
      const payload = {
        id: this.secondaryProduct?.id || '',
        size: '',
        color: '',
        name: this.secondaryProduct.name
      };
      if (!this.secondaryProduct || !this.secondaryProduct.available_options) {
        return payload;
      }
      if (this.selectedSize != null) {
        const size = this.secondaryProduct.available_options[this.selectedSize];
        payload.size = size?.size || '';
        if (this.selectedColor != null && size?.colors) {
          const color = size.colors[this.selectedColor];
          payload.color = color?.name || '';
        }
      }
      return payload;
    },
    handleAddToCart(payload) {
      try {
        this.isAddingToCart = true;
        if (!payload || !payload.id || !payload.size || !payload.color) {
          toast.error('Please select a valid size and color.', {
                timeout: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
          return;
        }
        if (!this.canAddToCart) {
          toast.error('Selected item is not available.', {
                timeout: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            })
          return;
        }
        cartStore.addProductToCart(payload.id, payload);
        toast.success(`${this.secondaryProduct.name} added to cart!`, {
                timeout: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
      } catch (error) {
        toast.error('Failed to add to cart. Please try again.', {
                timeout: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            })
      } finally {
        this.isAddingToCart = false;
      }
    },
  },
};
</script>