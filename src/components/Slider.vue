<!-- src/components/Slider.vue -->
<template>
  <div class="my-4 h-full text-center">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-32">
      <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-primary"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!items.length" class="prose text-center text-gray-600">
      <h2 class="text-xl font-semibold">No Products Available</h2>
      <p>Check back soon for new arrivals!</p>
    </div>

    <!-- Slider Content -->
    <div v-else>
      <!-- Centered Title and Description -->
      <div v-if="title && title !== 'None'">
        <div class="flex flex-col justify-center items-center min-h-[10vh] mb-6 px-4 sm:px-6 md:px-8">
          <h2 class="prose prose-lg text-gray-900 text-xl sm:text-2xl md:text-3xl font-semibold max-w-prose mx-auto animate-fade-in">
            {{ title }}
          </h2>
          <p class="prose text-gray-700 text-base sm:text-lg md:text-xl mt-2 max-w-prose mx-auto animate-fade-in animate-delay-200">
            {{ details }}
          </p>
        </div>
      </div>

      <div class="relative">
        <!-- Back Button -->
        <button
          v-if="currentIndex > 0"
          @click="scrollBack"
          class="absolute left-0 top-1/3 transform -translate-y-1/2 btn btn-circle bg-gray-900 text-white shadow-lg z-10"
          aria-label="Previous products"
        >
          ←
        </button>

        <!-- Slider -->
        <div
          class="item-container flex gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth mx-4 sm:mx-8 my-8"
          ref="slider"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          @touchstart="startDrag"
          @touchmove="onDrag"
          @touchend="endDrag"
        >
          <div
            v-for="(item, index) in items"
            :key="index"
            class="snap-start flex-shrink-0 @sm:w-1/2 @md:w-1/3 @lg:w-[calc(100%/visibleItems)]"
          >
            <div class="card shadow-xl flex flex-col items-center h-full bg-white rounded-lg group cursor-pointer">
              <div class="relative w-80 h-80 overflow-hidden rounded-t-lg">
                
                <!-- Shimmer Placeholder -->
                <div
                  v-if="!loadedImages[index]"
                  class="absolute inset-0 bg-gray-200 animate-pulse"
                ></div>

                <!-- First Image -->
                <img
                  :src="item.photo_1"
                  :alt="item.name"
                  class="object-cover w-full h-full absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110"
                  :class="{
                    'opacity-0': !loadedImages[index],
                    'opacity-100 group-hover:opacity-0': loadedImages[index]
                  }"
                  loading="lazy"
                  @load="onImageLoad(index)"
                  @click="$router.push(`/product/${item.id}`)"
                />

                <!-- Second Image -->
                <img
                  :src="item.photo_2 || item.photo_1"
                  :alt="item.name + ' second image'"
                  class="object-cover w-full h-full absolute inset-0 scale-105 transition-transform duration-500 ease-in-out"
                  :class="{
                    'opacity-0': !loadedImages[index],
                    'opacity-0 group-hover:opacity-100': loadedImages[index]
                  }"
                  loading="lazy"
                />
              </div>

              <div class="card-body p-4">
                <h3 class="text-gray-600 text-base sm:text-lg font-semibold">{{ item.name }}</h3>
                <p class="text-gray-500 text-sm sm:text-base">₦{{ item.price }}</p>

                <!-- Size Options -->
                <div class="mt-3 flex flex-wrap justify-center gap-2">
                  <button
                    v-for="(size, sIndex) in item.available_options"
                    :key="sIndex"
                    class="btn btn-sm rounded-full transition-all"
                    :class="{
                      'btn-primary': selectedSizes[index] === sIndex,
                      'btn-ghost hover:bg-gray-200': selectedSizes[index] !== sIndex,
                    }"
                    @click="selectSize(index, sIndex)"
                    :aria-label="`Select size ${size.size}`"
                  >
                    {{ size.size }}
                  </button>
                </div>

                <!-- Color Options -->
                <div
                  v-if="selectedSizes[index] !== null && item.available_options[selectedSizes[index]]"
                  class="flex gap-2 mt-3 justify-center items-center flex-wrap"
                >
                  <button
                    v-for="(color, cIndex) in item.available_options[selectedSizes[index]].colors"
                    :key="cIndex"
                    class="w-6 h-6 rounded-full border-2 transition-all focus:ring-2 focus:ring-offset-2"
                    :style="{ backgroundColor: color.name }"
                    :class="{
                      'opacity-40': !color.instock,
                      'border-gray-900 scale-110': selectedColors[index] === cIndex,
                      'border-gray-300': selectedColors[index] !== cIndex,
                    }"
                    :aria-label="`Select color ${color.name}${!color.instock ? ' (Out of stock)' : ''}`"
                    @click="selectColor(index, cIndex)"
                  ></button>
                </div>

                <!-- Add to Cart Button -->
                <AddToCartBtn
                  :is-adding-to-cart="isAddingToCart"
                  :is-disabled="!canAddToCart(index)"
                  :payload="getCartPayload(index)"
                  @add-to-cart="handleAddToCart"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Forward Button -->
        <button
          v-if="currentIndex < items.length - visibleItems"
          @click="scrollForward"
          class="absolute right-0 top-1/3 transform -translate-y-1/2 btn btn-circle bg-gray-900 text-white shadow-lg z-10"
          aria-label="Next products"
        >
          →
        </button>
      </div>

      <!-- View More Button -->
      <div class="flex justify-center items-center mt-8">
        <button
          class="btn btn-secondary md:w-1/6 px-6 py-3 uppercase tracking-wide animate-pulse hover:scale-105 transition-transform"
          @click="$router.push(to)"
          aria-label="View more products"
        >
          View More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AddToCartBtn from './AddToCartBtn.vue';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default {
  components: {
    AddToCartBtn,
  },
  props: {
    title: String,
    details: String,
    to: String,
    items: { type: Array, required: true },
    visibleItems: { type: Number, default: 2 },
  },
  data() {
    return {
      currentIndex: 0,
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
      selectedSizes: [],
      selectedColors: [],
      isAddingToCart: false,
      isLoading: false,
      loadedImages: [],
    };
  },
  watch: {
    items(newItems) {
      this.selectedSizes = newItems.map(() => null);
      this.selectedColors = newItems.map(() => null);
      this.loadedImages = newItems.map(() => false);
      this.isLoading = false;

      this.$nextTick(() => {
        const imgElements = this.$refs.slider.querySelectorAll('img');
        imgElements.forEach((img, idx) => {
          if (img.complete && img.naturalWidth !== 0) {
            this.loadedImages[idx] = true;
          }
        });
      });
    },
  },
  mounted() {
    if (this.items.length) {
      this.selectedSizes = this.items.map(() => null);
      this.selectedColors = this.items.map(() => null);
      this.loadedImages = this.items.map(() => false);

      this.$nextTick(() => {
        const imgElements = this.$refs.slider.querySelectorAll('img');
        imgElements.forEach((img, idx) => {
          if (img.complete && img.naturalWidth !== 0) {
            this.loadedImages[idx] = true;
          }
        });
      });
    } else {
      this.isLoading = true;
    }
  },
  methods: {
    scrollBack() {
      try {
        const slider = this.$refs.slider;
        const itemWidth = slider.children[0].offsetWidth + 16;
        slider.scrollLeft -= itemWidth;
        this.currentIndex = Math.max(this.currentIndex - 1, 0);
      } catch (error) {
        console.error('Error in scrollBack:', error);
        toast.error('Error scrolling back.');
      }
    },
    scrollForward() {
      try {
        const slider = this.$refs.slider;
        const itemWidth = slider.children[0].offsetWidth + 16;
        slider.scrollLeft += itemWidth;
        this.currentIndex = Math.min(this.currentIndex + 1, this.items.length - this.visibleItems);
      } catch (error) {
        console.error('Error in scrollForward:', error);
      }
    },
    startDrag(event) {
      this.isDragging = true;
      this.startX = event.pageX || event.touches[0].pageX;
      this.scrollLeft = this.$refs.slider.scrollLeft;
    },
    onDrag(event) {
      if (!this.isDragging) return;
      event.preventDefault();
      const x = event.pageX || event.touches[0].pageX;
      const walk = x - this.startX;
      this.$refs.slider.scrollLeft = this.scrollLeft - walk;
    },
    endDrag() {
      this.isDragging = false;
    },
    selectSize(index, sIndex) {
      this.selectedSizes[index] = sIndex;
      this.selectedColors[index] = null;
    },
    selectColor(index, cIndex) {
      if (this.selectedSizes[index] !== null) {
        this.selectedColors[index] = cIndex;
      }
    },
    canAddToCart(index) {
      const sizeIndex = this.selectedSizes[index];
      const colorIndex = this.selectedColors[index];
      if (sizeIndex == null || colorIndex == null) return false;
      const item = this.items[index];
      const size = item?.available_options?.[sizeIndex];
      const color = size?.colors?.[colorIndex];
      return size && color && color.instock;
    },
    getCartPayload(index) {
      const item = this.items[index];
      const size = item?.available_options?.[this.selectedSizes[index]];
      const color = size?.colors?.[this.selectedColors[index]];
      return {
        id: item.id,
        size: size?.size || '',
        color: color?.name || '',
        name: item.name,
      };
    },
    handleAddToCart(payload) {
      this.isAddingToCart = true;
      if (!payload.id || !payload.size || !payload.color) {
        toast.error('Please select size and color!');
        return;
      }
      this.$emit('add-to-cart', payload);
      setTimeout(() => {
        this.isAddingToCart = false;
      }, 500);
    },
    onImageLoad(index) {
      this.loadedImages[index] = true;
    }
  },
};
</script>

<style scoped>
.item-container::-webkit-scrollbar {
  display: none;
}
.item-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
