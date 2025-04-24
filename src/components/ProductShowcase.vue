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
          :src="mainProduct.main_image"
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
            <button
              class="btn btn-primary btn-sm w-full mt-3 rounded-full transition-all"
              :disabled="isAddingToCart || !canAddToCart"
              @click="addToCart"
              aria-label="Add secondary product to cart"
            >
              <span v-if="isAddingToCart" class="animate-spin">⏳</span>
              <span v-else>Add to Cart</span>
            </button>
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

export default {
  name: 'ProductShowcase',
  components: {
    ProductOptionsSelector,
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
      return (
        this.secondaryProduct &&
        Object.keys(this.secondaryProduct).length > 0 &&
        !!this.secondaryProduct.photo_2
      );
    },
    canAddToCart() {
      if (this.selectedSize == null || this.selectedColor == null) {
        console.log('Cannot add to cart: Missing size or color', {
          selectedSize: this.selectedSize,
          selectedColor: this.selectedColor,
        });
        return false;
      }
      const size = this.secondaryProduct?.available_options?.[this.selectedSize];
      const color = size?.colors?.[this.selectedColor];
      const isValid = size && color && color.instock;
      console.log('Can add to cart:', isValid, { size, color });
      return isValid;
    },
  },
  methods: {
    handleSizeChange({ sizeIndex }) {
      console.log('Size changed:', { sizeIndex });
      this.selectedSize = sizeIndex;
      this.selectedColor = null; // Reset color on size change
    },
    handleColorChange({ colorIndex }) {
      console.log('Color changed:', { colorIndex });
      this.selectedColor = colorIndex;
    },
    addToCart() {
      try {
        this.isAddingToCart = true;
        if (!this.secondaryProduct || !this.secondaryProduct.available_options) {
          console.error('Invalid secondary product:', this.secondaryProduct);
          alert('Product data is invalid.');
          return;
        }

        const sizeIndex = this.selectedSize;
        const colorIndex = this.selectedColor;

        if (sizeIndex == null || colorIndex == null) {
          console.log('Missing selections:', { sizeIndex, colorIndex });
          alert('Please select both a size and a color.');
          return;
        }

        const size = this.secondaryProduct.available_options[sizeIndex];
        const color = size?.colors?.[colorIndex];

        if (!size || !color) {
          console.error('Invalid size or color:', { size, color });
          alert('Invalid size or color selected.');
          return;
        }

        if (!color.instock) {
          console.log('Color out of stock:', color);
          alert('Selected color is out of stock ❗');
          return;
        }

        const payload = {
          id: this.secondaryProduct.id,
          size: size.size,
          color: color.name,
        };

        console.log('Emitting add-to-cart:', payload);
        this.$emit('add-to-cart', payload);
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add to cart. Please try again.');
      } finally {
        this.isAddingToCart = false;
      }
    },
  },
};
</script>