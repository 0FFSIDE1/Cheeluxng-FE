<template>
  <!-- <-- start of hero section -->
  <section
    class="relative mx-2 h-[200vh] bg-fixed bg-center bg-no-repeat bg-cover overflow-hidden"
    style="
      background-image:
        linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 40%),
        url('./src/assets/hero.jpeg');
      backdrop-filter: blur(12px);
    "
  >
    <div class="absolute inset-0 flex justify-center items-center text-white text-center z-10 px-2 ">
      <div class="flex flex-col justify-center items-center max-w-2xl mx-auto bg-slate-500 bg-opacity-20 rounded-full p-6 shadow-2xl">
        <h2 class="drop-shadow-md leading-relaxed">
          Discover high-performance gym and sportswear designed to fuel your passion and elevate your workouts. Our gear is crafted for comfort, durability, and style.
        </h2>
        <p class="mt-6 text-lg md:text-xl drop-shadow-sm font-medium">
          Gear Up, Push Limits, Conquer Goals.
        </p>
        <button class="bg-white rounded-lg text-black mt-4 p-3" type="button">EXPLORE</button>
      </div>
    </div>
  </section>
  <!-- <-- end of hero section -->

  <!-- <-- new arrival section -->
  <section class="my-12 mx-1 h-[1000px] text-center">
    <h2 class="text-gray-900">NEW ARRIVALS ✨</h2>
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
          v-for="(product, index) in products"
          :key="index"
          class="h-full w-72 flex-shrink-0"
        >
          <div class="down-content flex flex-col justify-center items-center h-full">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-58 object-cover rounded-t-lg"
            />
            <h3 class="text-gray-600 text-lg font-semibold mt-2">
              {{ product.name }}
            </h3>
            <p class="text-gray-400">{{ product.price }}</p>
            <ul class="flex gap-4 mt-4">
              <li
                v-for="(color, colorIndex) in product.colors"
                :key="colorIndex"
                :class="`rounded-full w-4 h-3 ${color}`"
              ></li>
            </ul>
            <button class="bg-white text-black rounded-lg mt-4 p-2">+</button>
          </div>
        </div>
      </div>

      <!-- Front Button -->
      <button
        v-if="currentIndex < products.length - visibleItems"
        @click="scrollForward"
        class="absolute right-0 top-1/3 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full shadow-lg z-10"
      >
        &#8594;
      </button>
    </div>

    <div>
      <button class="bg-gray-900 rounded-lg text-gray-100 mt-4 p-4" type="button">
        VIEW COLLECTION
      </button>
    </div>
  </section>
  <!-- <-- end of new arrival section -->
 
  <!-- <-- fast selling section -->
  <section  class="my-12 mx-1 h-[1000px] flex items-center flex-col  gap-10 border-2 border-gray-950">
    
    <h2 class="text-gray-900">FAST SELLING</h2>
    <div class="flex w-2/4 border-2 border-gray-950">
      hi
    </div>

  </section>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          image: "/images/product/product1.jpeg",
          name: "Product 1",
          price: "$99.99",
          colors: ["bg-black", "bg-red-600", "bg-green-800", "bg-yellow-400"],
        },
        {
          image: "/images/product/product2.jpeg",
          name: "Product 2",
          price: "$89.99",
          colors: ["bg-black", "bg-red-600"],
        },
        {
          image: "/images/product/product3.jpeg",
          name: "Product 3",
          price: "$99.99",
          colors: ["bg-green-800", "bg-yellow-400"],
        },
        {
          image: "/images/product/product5.jpeg",
          name: "Product 5",
          price: "$99.99",
          colors: ["bg-black", "bg-yellow-600"],
        },
        
        {
          image: "/images//product/product1.jpeg",
          name: "Product 5",
          price: "$99.99",
          colors: ["bg-black", "bg-red-600"],
        },
        {
          image: "/images/product/product3.jpeg",
          name: "Product 7",
          price: "$99.99",
          colors: ["bg-black", "bg-blue-600"],
        },
        {
          image: "/images/product/product2.jpeg",
          name: "Product 8",
          price: "$99.99",
          colors: ["bg-black", "bg-green-600"],
        },
        {
          image: "/images/product/product1.jpeg",
          name: "Product 9",
          price: "$99.99",
          colors: ["bg-black", "bg-brown-600"],
        },
      ],
      currentIndex: 0,
      visibleItems: 3, // Adjust based on how many items fit in the viewport
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
        this.products.length - this.visibleItems
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


