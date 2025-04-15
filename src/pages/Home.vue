<template>
  <!-- <-- start of hero section -->
  <section
    class="relative mx-2 h-[120vh] md:h-[135vh] bg-fixed bg-center bg-no-repeat bg-cover overflow-hidden"
    style="
      background-image:
        linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 40%),
        url('./src/assets/hero.jpeg');
      backdrop-filter: blur(12px);
    "
  >
    <div class="absolute inset-0 flex justify-center items-center text-white text-center z-30 md:px-2 ">
      <div class="flex flex-col justify-center items-center max-w-2xl mx-auto bg-gray-800 bg-opacity-20 rounded-full p-6 shadow-2xl">
        <h2 class="text-sm drop-shadow-md leading-relaxed text-balance md:p-8">
          Discover high-performance gym and sportswear designed to fuel your passion and elevate your workouts. Our gear is crafted for comfort, durability, and style.
        </h2>
        <p class=" md:mt-6 text-lg md:text-xl drop-shadow-sm font-medium">
          Gear Up, Push Limits, Conquer Goals.
        </p>
        <button class="cartBtn md:mt-4 p-3" type="button">EXPLORE</button>
      </div>
    </div>
  </section>
  <!-- <-- end of hero section -->

   <!-- <-- new arrival section -->
   <Slider
    title="NEW ARRIVALS ✨"
    :items="products"
    :visibleItems="2"
  />
  <!-- <-- end of new arrival section -->
 
  

  <!-- <-- POPULAR selling section -->
  <section class="h-full md:h-[1000px] bg-slate-200">
    <div class="flex flex-col mx-6 md:mx-12  gap-8 w-1/3">
      <div class="md:mx-12 md:mt-12 w-96">
        <h2 class="text-gray-900 text-sm md:text-balance md:text-justify md:text-3xl">POPULAR SELLING</h2>
      </div>
      <div>
        <div class="md:mx-12 flex gap-4">
          <button class="bg-slate-950 text-gray-50 flex justify-center items-center p-5 w-50 rounded-full shadow-md h-10">Women</button>
          <button class="bg-slate-50 flex justify-center items-center p-5 h-10  text-gray-950 w-50 rounded-full shadow-md hover:bg-slate-950 hover:text-gray-50">Men</button>
        </div>
      </div>
    </div>
      <Slider
    :items="products"
    :visibleItems="4"
  />
</section>
  <!-- <-- fast selling section -->
  <ProductShowcase
    title="FAST SELLING"
    :mainProduct="products[0]"
    :secondaryProduct="products[1]"
  />
  <!-- <-- end of fast selling section -->
<!-- accessories section -->
<section class="bg-pink-100 py-14"
>
<div class="h-full mx-12 flex flex-col p-8">
  <h2 class="text-gray-900 text-balance flex justify-center text-3xl mb-8">ACCESSORIES</h2>
  
  <div class="accessoriesdiv grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
    <!-- Accessory Card -->
    <div class="relative group bg-slate-100 rounded-3xl shadow-xl shadow-orange-200 overflow-hidden">
      <img src="/images/product/0S1A2589-Edit.jpeg" class="object-cover h-full w-full rounded-3xl transition-transform duration-500 group-hover:scale-105" alt="">

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl">
        <p class="text-lg font-semibold mb-2">Classic Hats</p>
        <button class="mt-2 px-4 py-2 bg-white text-black rounded-full hover:bg-orange-300 transition">View</button>
      </div>
    </div>

    <!-- Duplicate for other products -->
    <div class="relative group bg-slate-100 rounded-3xl shadow-xl shadow-orange-200 overflow-hidden">
      <img src="/images/product/0S1A2556-Edit.jpeg" class="object-cover h-full w-full rounded-3xl transition-transform duration-500 group-hover:scale-105" alt="">

      <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl">
        <p class="text-lg font-semibold mb-2">Stylish Bags and Others</p>
        <button class="mt-2 px-4 py-2 bg-white text-black rounded-full hover:bg-orange-300 transition">View</button>
      </div>
    </div>

    <div class="relative group bg-slate-100 rounded-3xl shadow-xl shadow-orange-200 overflow-hidden">
      <img src="/images/product/0S1A2650-Edit.jpeg" class="object-cover h-full w-full rounded-3xl transition-transform duration-500 group-hover:scale-105" alt="">

      <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl">
        <p class="text-lg font-semibold mb-2">Bottles</p>
        <button class="mt-2 px-4 py-2 bg-white text-black rounded-full hover:bg-orange-300 transition">View</button>
      </div>
    </div>
  </div>
</div>

</section>

<section class="bg-fuchsia-100">
  <div class="h-full mx-12 flex flex-col p-8">
    <h2 class="text-gray-900 text-balance text-3xl my-5">CHICKY SETS 🌟</h2>
    <div class="grid grid-cols-3 md:grid-cols-5 gap-5 mt-6">
      <div class="bg-slate-200 rounded-3xl shadow-md shadow-orange-600 p-2 flex flex-col justify-center items-center"><img src="/images/product/image00156.jpeg" class="object-cover h-full rounded-lg" alt=""><div class="bg-pink-200 rounded p-6 flex flex-col items-center w-full mt-2">
        <h3 class="text-2xl">
          Product 1
        </h3>
        <p>$99.99</p>
        <button class="cartBtn">+</button>
        
      </div></div>
      <div class="bg-slate-200 rounded-3xl shadow-md shadow-orange-600 p-2 flex flex-col justify-center items-center"><img src="/images/product/image00001.jpeg" class="object-cover h-full rounded-2xl" alt=""><div class="bg-pink-200 rounded p-6 flex flex-col items-center w-full mt-2">
        <h3 class="text-2xl">
          Product 1
        </h3>
        <p>$99.99</p>
        <button class="cartBtn">+</button>
        
      </div></div>
      <div class="bg-slate-200 rounded-3xl shadow-md shadow-orange-600 p-2 flex flex-col justify-center items-center"><img src="/images/product/image00010.jpeg" class="object-cover h-full rounded-2xl" alt=""><div class="bg-pink-200 rounded p-6 flex flex-col items-center w-full mt-2">
        <h3 class="text-2xl">
          Product 1
        </h3>
        <p>$99.99</p>
        <button class="cartBtn">+</button>
        
      </div></div>
      <div class="bg-slate-200 rounded-3xl shadow-md shadow-orange-600 p-2 flex flex-col justify-center items-center"><img src="/images/product/image00005.jpeg" class="object-cover h-full rounded-2xl" alt=""><div class="bg-pink-200 rounded p-6 flex flex-col items-center w-full mt-2">
        <h3 class="text-2xl">
          Product 1
        </h3>
        <p>$99.99</p>
        <button class="cartBtn">+</button>
        
      </div></div>
      <div class="bg-slate-200 rounded-3xl shadow-md shadow-orange-600 p-2 flex flex-col justify-center items-center"><img src="/images/product/image00007.jpeg" class="object-cover h-full rounded-2xl" alt=""><div class="bg-pink-200 rounded p-6 flex flex-col items-center w-full mt-2">
        <h3 class="text-2xl">
          Product 1
        </h3>
        <p>$99.99</p>
        <button class="cartBtn">+</button>
        
      </div></div>
    </div>

    <div class="flex justify-center items-center my-12">
      <button class=" w-1/6 bg-slate-950 shadow-xl shadow-red-300 p-4 rounded-full text-xs  text-gray-50 hover:text-gray-950 hover:bg-slate-50 " type="button">VIEW MORE</button>
    </div>
  </div>
</section>
<section class="p-20 bg-gradient-to-r from-pink-50 to-gray-300">
  <div class="h-full flex flex-col">
  <h2 class="text-gray-900 text-balance text-3xl my-5 text-center">LADIES COMFORT 🌟</h2>
  <p class="text-center p-5 text-balance text-lg">From high-intensity workouts to cozy days at home, our versatile designs ensure you look stylish and feel confident wherever you go. CHEELUXNG brings you the latest in women's active fashion.</p>

  <div class="flex flex-wrap gap-8 justify-center items-center mt-6">
    <!-- Card 1 -->
    <div class="relative group bg-pink-200 rounded-full shadow-md w-64 h-80 shadow-slate-600 p-2 transform rotate-[-6deg] overflow-hidden">
      <img src="/images/product/image00006.jpeg" class="object-cover w-full h-full rounded-full transition-transform duration-500 group-hover:scale-105" alt="">

      <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full text-center p-4">
        <p class="text-base font-semibold mb-2">Soft Lounge Set</p>
        <button class="px-4 py-2 bg-white text-black rounded-full hover:bg-pink-300 transition">View</button>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="relative group bg-pink-200 rounded-3xl shadow-md w-64 h-96 shadow-slate-600 p-2 transform rotate-[-9deg] overflow-hidden">
      <img src="/images/product/image00002.jpeg" class="object-cover w-full h-full rounded-3xl transition-transform duration-500 group-hover:scale-105" alt="">

      <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl text-center p-4">
        <p class="text-base font-semibold mb-2">Elegant Robe Set</p>
        <button class="px-4 py-2 bg-white text-black rounded-full hover:bg-pink-300 transition">View</button>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="relative group bg-pink-200 rounded-full shadow-md w-64 h-80 shadow-slate-600 p-2 transform rotate-[-3deg] overflow-hidden">
      <img src="/images/product/image00004.jpeg" class="object-cover w-full h-full rounded-full transition-transform duration-500 group-hover:scale-105" alt="">

      <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full text-center p-4">
        <p class="text-base font-semibold mb-2">Relaxed Fit Tee</p>
        <button class="px-4 py-2 bg-white text-black rounded-full hover:bg-pink-300 transition">View</button>
      </div>
    </div>

    <!-- Card 4 -->
    <div class="relative group bg-pink-200 rounded-3xl shadow-md w-64 h-96 shadow-slate-600 p-2 transform rotate-[3deg] overflow-hidden">
      <img src="/images/product/image00003.jpeg" class="object-cover w-full h-full rounded-3xl transition-transform duration-500 group-hover:scale-105" alt="">

      <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl text-center p-4">
        <p class="text-base font-semibold mb-2">Comfy Joggers</p>
        <button class="px-4 py-2 bg-white text-black rounded-full hover:bg-pink-300 transition">View</button>
      </div>
    </div>
  </div>

  <!-- View More Button -->
  <div class="flex justify-center items-center mt-12">
    <button class="w-1/6 bg-slate-950 shadow-xl shadow-red-300 p-4 rounded-full text-xs text-gray-50 hover:text-gray-950 hover:bg-slate-50 transition">
      VIEW MORE
    </button>
  </div>
</div>

</section>

<!-- women section -->
<section class="h-[1200px] bg-gradient-to-r from-rose-100 to-rose-200">
    <div class="mx-12 flex flex-col p-8">
      <div class="mt-12">
        <h2 class="text-gray-900 text-balance text-3xl my-5">POPULAR LADIES SETS</h2>
      </div>
      <div>
        <div class="flex gap-4">
         
          <button class="bg-slate-950 text-gray-50 flex justify-center items-center p-5 w-50 rounded-full shadow-md h-10">SHORTS</button>
          <button class="bg-slate-50 flex justify-center items-center p-5 h-10  text-gray-950 w-50 rounded-full shadow-md hover:bg-slate-950 hover:text-gray-50">SETS</button>
        </div>
      </div>
    </div>
      <Slider
    :items="products"
    :visibleItems="5"
  />
  
</section>
<!-- end women section -->

<!-- start men section -->
<section class="h-screen bg-gradient-to-r from-gray-300 to-blue-100">
    <div class="mx-12 flex flex-col p-8">
      <div class="mt-12">
        <h2 class="text-gray-900 text-balance text-3xl my-5">POPULAR MEN</h2>
      </div>
      <div>
        <div class="flex gap-4">
         
          <button class="bg-slate-950 text-gray-50 flex justify-center items-center p-5 w-50 rounded-full shadow-md h-10">SHORTS</button>
          <button class="bg-slate-50 flex justify-center items-center p-5 h-10  text-gray-950 w-50 rounded-full shadow-md hover:bg-slate-950 hover:text-gray-50">SETS</button>
        </div>
      </div>
    </div>
      <Slider
    :items="products"
    :visibleItems="5"
  />

</section>


<!-- end men section -->



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

    }
  }
}
</script>


