<template>
  <div class="my-12 h-full text-center" v-if="items.length">
    <h2 class="text-gray-900 text-xl sm:text-2xl font-semibold">{{ title }}</h2>
    <p class="text-gray-700 text-balance sm:text-lg mb-10">{{ details }}</p>

    <div class="relative">
      <!-- Back Button -->
      <button
        v-if="currentIndex > 0"
        @click="scrollBack"
        class="absolute left-0 top-1/3 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full shadow-lg z-10"
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
          class="flex-shrink-0 w-1/2 sm:w-1/2 md:w-1/4 lg:w-[calc(100%/visibleItems)] h-full"
        >
          <div class="down-content flex flex-col justify-center items-center h-full">
            <img :src="item.photo_1" :alt="item.name" class="object-contain rounded-t-lg" />
            <h3 class="text-gray-600 text-lg font-semibold mt-2">{{ item.name }}</h3>
            <p class="text-gray-400">₦{{ item.price }}</p>

            <!-- Size & Colors -->
            <div class="mt-2 flex flex-row gap-3 items-center">
              <div v-for="(size, sIndex) in item.available_options" :key="sIndex" class="mb-2">
                <span class="text-xs text-gray-500">{{ size.size }}</span>
                <div class="flex flex-row gap-2 mt-1 justify-center">
                  <button
                    v-for="(color, cIndex) in size.colors"
                    :key="cIndex"
                    class="w-4 h-4 rounded-full border"
                    :style="{
                      backgroundColor: color.name,
                      opacity: color.instock ? 1 : 0.3,
                      borderColor: color.instock ? '#000' : '#aaa',
                    }"
                    :title="`${color.name}${!color.instock ? ' (Out of stock)' : ''}`"
                  ></button>
                </div>
              </div>
            </div>

            <button class="bg-white text-black rounded-lg mt-3 w-12 hover:bg-slate-950 hover:text-white md:cartBtn">
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Forward Button -->
      <button
        v-if="currentIndex < items.length - visibleItems"
        @click="scrollForward"
        class="absolute right-0 top-1/3 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full shadow-lg z-10"
      >
        &#8594;
      </button>
    </div>

    <div class="flex justify-center items-center mt-12">
      <button class="md:w-1/6 bg-slate-950 shadow-xl shadow-red-100 p-4 rounded-full text-xs text-gray-50 hover:text-gray-950 hover:bg-slate-50 transition">
        VIEW MORE
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String },
    details: { type: String },
    items: { type: Array, required: true },
    visibleItems: { type: Number, default: 2 },
  },
  data() {
    return {
      currentIndex: 0,
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
    };
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
      const walk = (x - this.startX) * 1;
      this.$refs.slider.scrollLeft = this.scrollLeft - walk;
    },
    endDrag() {
      this.isDragging = false;
    },
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
