<!-- filepath: c:\Users\USER\vue-tailwind-boilerplate\src\components\Slider.vue -->
<template>
    <div class="my-12 md:mx-12 h-full text-center ">
      <h2 class="text-gray-900">{{ title }}</h2>
      <div class="relative">
        <!-- Back Button -->
        <button
          v-if="currentIndex > 0"
          @click="scrollBack"
          class="absolute left-0 top-1/3 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full shadow-lg z-10"
        >
          &#8592;
        </button>
  
        <!-- Slider Container -->
        <div
          class="item-container flex gap-4 overflow-x-auto scroll-smooth mx-8 my-12"
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
            class="h-full w-52 md:w-72 flex-shrink-0"
          >
            <div class="down-content flex flex-col justify-center items-center h-full">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-58 object-cover rounded-t-lg"
              />
              <h3 class="text-gray-600 text-lg font-semibold mt-2">
                {{ item.name }}
              </h3>
              <p class="text-gray-400">{{ item.price }}</p>
              <ul class="flex gap-4 mt-4">
                <li
                  v-for="(color, colorIndex) in item.colors"
                  :key="colorIndex"
                  :class="`rounded-full w-4 h-3 ${color}`"
                ></li>
              </ul>
              <button class=" bg-white text-black rounded-lg mt-3 w-10 hover:bg-slate-950 hover:text-gray-50 md:cartBtn">+</button>
            </div>
          </div>
        </div>
  
        <!-- Front Button -->
        <button
          v-if="currentIndex < items.length - visibleItems"
          @click="scrollForward"
          class="absolute right-0 top-1/3 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full shadow-lg z-10"
        >
          &#8594;
        </button>
      </div>
      <div class="flex justify-center items-center mt-12">
      <button class="md:w-1/6 bg-slate-950 shadow-xl shadow-red-100 p-4 rounded-full text-xs  text-gray-50 hover:text-gray-950 hover:bg-slate-50 " type="button">VIEW MORE</button>
</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
      visibleItems: {
        type: Number,
        default: 3, // Default number of visible items
      },
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
        const itemWidth = slider.children[0].offsetWidth + 16; // Item width + gap
        slider.scrollLeft -= itemWidth;
        this.currentIndex = Math.max(this.currentIndex - 1, 0);
      },
      scrollForward() {
        const slider = this.$refs.slider;
        const itemWidth = slider.children[0].offsetWidth + 16; // Item width + gap
        slider.scrollLeft += itemWidth;
        this.currentIndex = Math.min(
          this.currentIndex + 1,
          this.items.length - this.visibleItems
        );
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
        const walk = (x - this.startX) * 1; // Adjust the multiplier for sensitivity
        this.$refs.slider.scrollLeft = this.scrollLeft - walk;
      },
      endDrag() {
        this.isDragging = false;
      },
    },
  };
  </script>
  
  <style>
  /* Hide scrollbar for the slider */
  .item-container::-webkit-scrollbar {
    display: none;
  }
  .item-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  </style>