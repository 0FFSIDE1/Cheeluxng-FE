<template>
  <section class="my-14 mx-1 h-full">
    <div class="flex justify-center items-center flex-col gap-10 relative">
      <h2 class="text-gray-900 text-3xl text-center">{{ title }}</h2>

      <!-- Main Product -->
      <div v-if="mainProduct" class="relative flex justify-center w-full max-w-[700px]">
        <img
          :src="mainProduct.cover_image"
          :alt="mainProduct.name"
          class="object-cover rounded-lg h-auto max-h-[750px] w-full"
        />

        <!-- Secondary Product -->
        <div
          v-if="hasSecondary"
          class="hidden md:block absolute bottom-0 right-0 md:right-[-110px] h-auto max-h-[450px] w-full max-w-[300px] bg-slate-200 rounded-lg p-4 shadow-md"
        >
          <img
            :src="secondaryProduct.photo_2"
            :alt="secondaryProduct.name"
            class="object-cover rounded-lg w-full"
          />
          <div class="mt-2">
            <h3 class="text-gray-900 text-center md:text-left font-semibold">{{ secondaryProduct.name }}</h3>
            <p class="text-gray-700 text-center md:text-left font-medium">₦{{ secondaryProduct.price }}</p>

            <!-- Size & Color Selector Component -->
            <ProductOptionsSelector
              v-if="secondaryProduct.available_options"
              :availableOptions="secondaryProduct.available_options"
              :selectedSize="selectedSize"
              :selectedColor="selectedColor"
              :productIndex="0"
              @update:size="handleSizeChange"
              @update:color="handleColorChange"
            />

            <!-- Color Dots (Optional if used outside ProductOptionsSelector) -->
            <div class="flex justify-between items-center mt-3">
              <ul class="flex gap-2">
                <li
                  v-for="(color, index) in secondaryProduct.colors"
                  :key="index"
                  class="w-4 h-4 rounded-full border border-gray-300"
                  :style="{ backgroundColor: color }"
                ></li>
              </ul>
              <button class="bg-gray-900 w-14 rounded-md py-1 text-white text-sm hover:bg-gray-700 transition">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        class="bg-slate-950 shadow-lg p-4 rounded-full text-xs text-gray-50 hover:text-gray-950 hover:bg-slate-50 transition"
        type="button"
      >
        VIEW COLLECTION
      </button>
    </div>
  </section>
</template>

<script>
import ProductOptionsSelector from './productOptions.vue';

export default {
  name: 'ProductShowcase',
  components: {
    ProductOptionsSelector
  },
  props: {
    title: {
      type: String,
      required: true
    },
    mainProduct: {
      type: Object,
      default: null
    },
    secondaryProduct: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      selectedSize: null,
      selectedColor: null
    };
  },
  computed: {
    hasSecondary() {
      return (
        this.secondaryProduct &&
        Object.keys(this.secondaryProduct).length > 0 &&
        !!this.secondaryProduct.photo_2
      );
    }
  },
  methods: {
    handleSizeChange({ index, sizeIndex }) {
      this.selectedSize = sizeIndex;
      this.selectedColor = null;
    },
    handleColorChange({ index, colorIndex }) {
      this.selectedColor = colorIndex;
    }
  }
};
</script>
