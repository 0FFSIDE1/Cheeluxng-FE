
<template>
  <!-- HERO SECTION -->
  <section
    class="relative mx-2 h-[120vh] md:h-[135vh] bg-fixed bg-center bg-no-repeat bg-cover overflow-hidden"
    style="background-image: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 40%), url('./src/assets/hero.jpeg'); backdrop-filter: blur(12px);"
  >
    <div class="absolute inset-0 flex justify-center items-center text-white text-center z-30 px-4 sm:px-6 md:px-8">
      <div class="flex flex-col justify-center items-center max-w-2xl w-full bg-gray-800/20 rounded-full p-6 md:p-10 shadow-2xl">
        <h2 class="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed drop-shadow-md text-balance px-2 sm:px-4">
          Discover high-performance gym and sportswear designed to fuel your passion and elevate your workouts. Our gear is crafted for comfort, durability, and style.
        </h2>
        <p class="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-sm font-medium">
          Gear Up, Push Limits, Conquer Goals.
        </p>
        <button class="cartBtn mt-4 p-2 sm:p-3 text-xs sm:text-sm md:text-base" type="button">EXPLORE</button>
      </div>
    </div>
  </section>

<!-- NEW ARRIVALS SECTION -->
<Slider title="NEW ARRIVALS ✨" details="Fresh styles are here! Explore our latest collection of activewear and loungewear, designed to keep you comfortable and stylish. From gym days to chill days, these new arrivals are perfect for every mood. Don’t wait—grab your favorites before they’re gone!
" :items="products" :visibleItems="2" />

  

  <!-- POPULAR SELLING SECTION -->
  <section class="w-full bg-slate-200 py-12">
    <div class="flex flex-col gap-6 px-4 sm:px-6 max-w-7xl">
      <div class="w-full md:w-1/2 lg:w-1/3">
        <h2 class="text-gray-900 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug text-balance">
          POPULAR SELLING
        </h2>
      </div>
      <div class="flex flex-wrap gap-4">
        <button class="bg-slate-950 text-white px-4 py-2 rounded-full shadow-md hover:bg-slate-900">Women</button>
        <button class="bg-white text-slate-950 px-4 py-2 rounded-full shadow-md hover:bg-slate-950 hover:text-white">Men</button>
      </div>
    </div>
    <div class="mt-8">
      <Slider :items="products" :visibleItems="4" />
    </div>
  </section>
  
  <!-- FAST SELLING SECTION -->
  <ProductShowcase title="FAST SELLING" :mainProduct="products[0]" :secondaryProduct="products[1]" />

  <!-- ACCESSORIES SECTION -->
  <section class="bg-pink-100 py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      <h2 class="text-center text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">ACCESSORIES</h2>
      <p class="text-lg mb-10 text-gray-700">Shop our newest collection of fashion-forward accessories, designed to complement your activewear and loungewear looks. Don’t miss out—explore our new arrivals and upgrade your style today!</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <template v-for="(item, index) in 3" :key="index">
          <div class="relative group bg-slate-100 rounded-3xl shadow-xl shadow-orange-200 overflow-hidden">
            <img :src="`/images/product/0S1A25${89 + index * 33}-Edit.jpeg`" class="object-cover h-full w-full rounded-3xl transition-transform duration-500 group-hover:scale-105" alt="">
            <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl">
              <p class="text-lg font-semibold mb-2">Accessory {{ index + 1 }}</p>
              <button class="mt-2 px-4 py-2 bg-white text-black rounded-full hover:bg-orange-300 transition">View</button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>

  <!-- CHICKY SETS SECTION -->
  <section class="bg-fuchsia-100 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      <h2 class="text-3xl font-semibold text-center mb-4 text-gray-950">CHICKY SETS 🌟</h2>
      <p class="text-lg mb-10 text-gray-700">
        From high-performance workouts to relaxing weekends at home, CHEELUXNG’s women's activewear collection blends comfort, versatility, and modern style. Whether you're hitting the gym, running errands, or lounging in style, our trend-forward designs empower you to look confident and feel your best—anywhere, anytime.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <template v-for="i in 5" :key="i">
          <div class="bg-slate-200 rounded-3xl shadow-md p-2 flex flex-col items-center">
            <img :src="`/images/product/image0000${i}.jpeg`" class="object-cover w-full h-48 rounded-xl" alt="">
            <div class="bg-pink-200 rounded p-4 mt-4 w-full text-center">
              <h3 class="text-lg font-semibold">Product {{ i }}</h3>
              <p>$99.99</p>
              <button class="cartBtn mt-2">+</button>
            </div>
          </div>
        </template>
      </div>
      <div class="flex justify-center mt-10">
        <button class="bg-slate-950 text-white px-6 py-3 rounded-full hover:bg-white hover:text-slate-950 transition shadow-md">VIEW MORE</button>
      </div>
    </div>
  </section>

  <!-- LADIES COMFORT SECTION -->
  <section class="p-10 bg-gradient-to-r from-pink-50 to-gray-300">
    <div class="max-w-7xl mx-auto text-center px-4 sm:px-6 md:px-12">
      <h2 class="text-3xl font-semibold text-gray-900 mb-4">LADIES COMFORT 🌟</h2>
      <p class="text-lg mb-10 text-gray-700">From high-intensity workouts to cozy days at home, our versatile designs ensure you look stylish and feel confident wherever you go.</p>
      <div class="flex flex-wrap justify-center gap-6">
        <template v-for="i in 4" :key="i">
          <div :class="['relative group bg-pink-200 shadow-md p-2 overflow-hidden transition', i % 2 === 0 ? 'rounded-3xl h-96' : 'rounded-full h-80']" style="width: 16rem;">
            <img :src="`/images/product/image0000${i}.jpeg`" class="object-cover w-full h-full rounded-inherit transition-transform duration-500 group-hover:scale-105" alt="">
            <div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-inherit p-4">
              <div class="text-center">
                <p class="font-semibold mb-2">Item {{ i }}</p>
                <button class="px-4 py-2 bg-white text-black rounded-full hover:bg-pink-300 transition">View</button>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="mt-12">
        <button class="bg-slate-950 text-white px-6 py-3 rounded-full hover:bg-white hover:text-slate-950 transition shadow-md">VIEW MORE</button>
      </div>
    </div>
  </section>

  <!-- WOMEN SECTION -->
  <section class="bg-gradient-to-r from-rose-100 to-rose-200 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      <h2 class="text-3xl font-semibold text-gray-900 mb-4">POPULAR LADIES SETS</h2>
      <div class="flex gap-4 mb-6">
        <button class="bg-slate-950 text-white px-4 py-2 rounded-full shadow-md">SHORTS</button>
        <button class="bg-white text-slate-950 px-4 py-2 rounded-full shadow-md hover:bg-slate-950 hover:text-white">SETS</button>
      </div>
      <Slider :items="products" :visibleItems="5" />
    </div>
  </section>

  <!-- MEN SECTION -->
  <section class="bg-gradient-to-r from-gray-300 to-blue-100 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      <h2 class="text-3xl font-semibold text-gray-900 mb-4">POPULAR MEN</h2>
      <div class="flex gap-4 mb-6">
        <button class="bg-slate-950 text-white px-4 py-2 rounded-full shadow-md">SHORTS</button>
        <button class="bg-white text-slate-950 px-4 py-2 rounded-full shadow-md hover:bg-slate-950 hover:text-white">SETS</button>
      </div>
      <Slider :items="products" :visibleItems="5" />
    </div>
  </section>
</template>

<script>
import Slider from "../components/Slider.vue";
import ProductShowcase from "../components/ProductShowcase.vue";

export default {
  components: {
    Slider,
    ProductShowcase,
  },
  data() {
    return {
      products: [
        { image: "/images/product/product2.jpeg", name: "Product 2", price: "$89.99", colors: ["bg-black", "bg-red-600"] },
        { image: "/images/product/product3.jpeg", name: "Product 3", price: "$99.99", colors: ["bg-green-800", "bg-yellow-400"] },
        { image: "/images/product/product5.jpeg", name: "Product 5", price: "$99.99", colors: ["bg-black", "bg-yellow-600"] },
        { image: "/images/product/product1.jpeg", name: "Product 5", price: "$99.99", colors: ["bg-black", "bg-red-600"] },
        { image: "/images/product/product3.jpeg", name: "Product 7", price: "$99.99", colors: ["bg-black", "bg-blue-600"] },
        { image: "/images/product/product2.jpeg", name: "Product 8", price: "$99.99", colors: ["bg-black", "bg-green-600"] },
        { image: "/images/product/product1.jpeg", name: "Product 9", price: "$99.99", colors: ["bg-black", "bg-brown-600"] },
      ],
    };
  },
};
</script>
