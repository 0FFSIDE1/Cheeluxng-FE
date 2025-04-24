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
        class="btn btn-primary btn-sm px-6 py-2 rounded-full uppercase tracking-wide animate-pulse hover:scale-105 transition-transform"
        @click="$router.push('/collections/sportswear')"
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

const cartStore = useCartStore();
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
      console.log('Showcase: hasSecondary', isValid, this.secondaryProduct);
      return isValid;
    },
    canAddToCart() {
      if (!this.secondaryProduct || !this.secondaryProduct.available_options) {
        console.log('Showcase: Cannot add to cart - missing product/options', {
          secondaryProduct: this.secondaryProduct,
        });
        return false;
      }
      if (this.selectedSize == null || this.selectedColor == null) {
        console.log('Showcase: Cannot add to cart - missing selections', {
          selectedSize: this.selectedSize,
          selectedColor: this.selectedColor,
        });
        return false;
      }
      const size = this.secondaryProduct.available_options[this.selectedSize];
      const color = size?.colors?.[this.selectedColor];
      const isValid = size && color && color.instock;
      console.log('Showcase: Can add to cart', isValid, { size, color });
      return isValid;
    },
  },
  methods: {
    handleSizeChange({ sizeIndex }) {
      console.log('Showcase: Size changed', { sizeIndex });
      this.selectedSize = sizeIndex;
      this.selectedColor = null; // Reset color on size change
    },
    handleColorChange({ colorIndex }) {
      console.log('Showcase: Color changed', { colorIndex });
      this.selectedColor = colorIndex;
    },
    getCartPayload() {
      const payload = {
        id: this.secondaryProduct?.id || '',
        size: '',
        color: '',
      };
      if (!this.secondaryProduct || !this.secondaryProduct.available_options) {
        console.log('Showcase: Invalid payload - missing product/options', {
          secondaryProduct: this.secondaryProduct,
        });
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
      console.log('Showcase: Generated payload', payload);
      return payload;
    },
    handleAddToCart(payload) {
      console.log('Showcase: handleAddToCart called with payload', payload);
      try {
        this.isAddingToCart = true;
        if (!payload || !payload.id || !payload.size || !payload.color) {
          console.error('Showcase: Invalid cart payload', payload);
          alert('Please select a valid size and color.');
          return;
        }
        if (!this.canAddToCart) {
          console.error('Showcase: Cannot add to cart - invalid state', {
            canAddToCart: this.canAddToCart,
          });
          alert('Selected item is not available.');
          return;
        }
        console.log('Showcase: Emitting add-to-cart', payload);
        cartStore.addProductToCart(payload.id, payload);
        console.log('Showcase: add-to-cart emitted');
      } catch (error) {
        console.error('Showcase: Error in handleAddToCart', error);
        alert('Failed to add to cart. Please try again.');
      } finally {
        console.log('Showcase: Resetting isAddingToCart');
        this.isAddingToCart = false;
      }
    },
  },
};
</script>