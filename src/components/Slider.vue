<template>
  <div class="my-12 h-full text-center" v-if="items.length">
    <h2 class="text-gray-900 text-xl sm:text-2xl font-semibold">{{ title }}</h2>
    <p class="text-gray-700 sm:text-lg mb-10">{{ details }}</p>

    <div class="relative">
      <!-- Back Button -->
      <button
        v-if="currentIndex > 0"
        @click="scrollBack"
        class="absolute left-0 top-1/3 transform -translate-y-1/2 bg-gray-950 text-white p-2 rounded-full shadow-lg z-10"
      >
        &#8592;
      </button>

      <!-- Slider -->
      <div
        class="item-container flex gap-4 overflow-x-auto scroll-smooth mx-4 sm:mx-8 my-12"
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
          class="flex-shrink-0 w-1/2 sm:w-1/2 md:w-1/4 lg:w-[calc(100%/visibleItems)]"
        >
          <div class="down-content flex flex-col items-center h-full">
            <img :src="item.photo_1" :alt="item.name" class="object-cover w-full h-80 rounded-t-lg" />
            <h3 class="text-gray-600 text-lg font-semibold mt-2">{{ item.name }}</h3>
            <p class="text-gray-400">₦{{ item.price }}</p>

            <!-- Size Options -->
            <div class="mt-3 flex flex-wrap justify-center gap-2">
              <span
                v-for="(size, sIndex) in item.available_options"
                :key="sIndex"
                class="text-xs font-medium cursor-pointer px-3 py-1 rounded-full border transition duration-200"
                :class="{
                  'bg-gray-900 text-white border-gray-900': selectedSizes[index] === sIndex,
                  'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200': selectedSizes[index] !== sIndex
                }"
                @click="selectSize(index, sIndex)"
              >
                {{ size.size }}
              </span>
            </div>

            <!-- Color Options -->
          <div
            v-if="selectedSizes[index] !== null && item.available_options[selectedSizes[index]]"
            class="flex gap-2 mt-3 justify-center items-center flex-wrap">
          <button
            v-for="(color, cIndex) in item.available_options[selectedSizes[index]].colors"
            :key="cIndex"
            class="w-6 h-6 rounded-full border-4 transition-all duration-200"
            :style="{
              backgroundColor: color.name,
              opacity: color.instock ? 1 : 0.1,
              borderColor: selectedColors[index] === cIndex ? '#111827' : '#ccc',
              transform: selectedColors[index] === cIndex ? 'scale(1.2)' : 'scale(1)'
            }"
            :title="`${color.name}${!color.instock ? ' (Out of stock)' : ''}`"
            @click="selectColor(index, cIndex)"
          ></button>
        </div>

            <button class="bg-white text-black rounded-lg mt-4 w-12 h-10 hover:bg-gray-900 hover:text-white">
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Forward Button -->
      <button
        v-if="currentIndex < items.length - visibleItems"
        @click="scrollForward"
        class="absolute right-0 top-1/3 transform -translate-y-1/2 bg-gray-950 text-white p-2 rounded-full shadow-lg z-10"
      >
        &#8594;
      </button>
    </div>

    <!-- View More Button -->
    <div class="flex justify-center items-center mt-12">
      <button class="md:w-1/6 bg-slate-950 shadow-xl p-4 rounded-full text-xs text-white hover:text-slate-950 hover:bg-white transition">
        VIEW MORE
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    details: String,
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
    };
  },
  mounted() {
    this.items.forEach((_, index) => {
      this.selectedSizes[index] = null;
      this.selectedColors[index] = null;
    });
  },
  methods: {
  scrollBack() {
    const slider = this.$refs.slider;
    const itemWidth = slider.children[0].offsetWidth + 16;
    slider.scrollLeft -= itemWidth;
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
  },
  scrollForward() {
    const slider = this.$refs.slider;
    const itemWidth = slider.children[0].offsetWidth + 16;
    slider.scrollLeft += itemWidth;
    this.currentIndex = Math.min(this.currentIndex + 1, this.items.length - this.visibleItems);
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
    this.selectedColors[index] = null; // Reset color on size change
  },
  selectColor(index, cIndex) {
    if (this.selectedSizes[index] === null) return;
    this.selectedColors[index] = cIndex;
  },
  // handleSizeChange({ index, sizeIndex }) {
  // this.selectedSizes[index] = sizeIndex;
  // this.selectedColors[index] = null; // Reset color on size change
  // },
  // handleColorChange({ index, colorIndex }) {
  // if (this.selectedSizes[index] !== null) {
  //   this.selectedColors[index] = colorIndex;
  // }
  // },

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
