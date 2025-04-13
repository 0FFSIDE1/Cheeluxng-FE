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
   <Slider
    title="NEW ARRIVALS ✨"
    :items="products"
    :visibleItems="4"
  />
  <!-- <-- end of new arrival section -->
 
  

  <!-- <-- POPULAR selling section -->
  <section class="h-[1000px] bg-slate-200">
    <div class="flex flex-col mx-12  gap-8 w-1/3">
      <div class="mx-12 mt-12">
        <h2 class="text-gray-900 text-balance text-justify text-3xl">POPULAR SELLING</h2>
      </div>
      <div>
        <div class="mx-12 flex gap-4">
         
          <button class="bg-slate-950 text-gray-50 flex justify-center items-center p-5 w-50 rounded-full shadow-md h-10">Women</button>
          <button class="bg-slate-50 flex justify-center items-center p-5 h-10  text-gray-950 w-50 rounded-full shadow-md hover:bg-slate-950 hover:text-gray-50">Men</button>
        </div>
      </div>
    </div>
      <Slider
    :items="products"
    :visibleItems="5"
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
  <div class=" h-full mx-12 flex flex-col p-8">
    <h2 class="text-gray-900 text-balance flex justify-center text-3xl mb-8">ACCESSORIES</h2>
    <div class="grid grid-cols-3 md:grid-cols-3 gap-5 mt-6">
      <div class="bg-slate-100 rounded-3xl shadow-xl shadow-orange-200 p-4"><img src="/images/product/product1.jpeg" class="object-cover h-full rounded-3xl" alt=""></div>
      <div class="bg-slate-100 rounded-3xl shadow-xl shadow-orange-200 p-4"><img src="/images/product/product2.jpeg" class="object-cover h-full rounded-3xl" alt=""></div>
      <div class="bg-slate-100 rounded-3xl shadow-xl shadow-orange-200 p-4"><img src="/images/product/product3.jpeg" class="object-cover h-full rounded-3xl" alt=""></div>
      <div class="bg-slate-100 rounded-3xl shadow-xl shadow-orange-200 p-4"><img src="/images/product/product6.jpeg" class="object-cover h-full rounded-3xl" alt=""></div>
      <div class="bg-slate-100 rounded-3xl shadow-xl shadow-orange-200 p-4"><img src="/images/product/product2.jpeg" class="object-cover h-full rounded-3xl" alt=""></div>
     


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
<section class="bg-pink-50">
  <div class="h-full mx-12 flex flex-col p-8">
    <h2 class="text-gray-900 text-balance text-3xl my-5">LADIES COMFORT 🌟</h2>
    <div class="grid grid-cols-3 md:grid-cols-4 mt-6">
            <div class="bg-pink-200 rounded-3xl shadow-md w-3/4 shadow-slate-600 p-2 transform rotate-[6deg]">
              <img src="/images/product/image00002.jpeg" class="object-cover w-full h-full rounded-full" alt="">
            </div>
            <div class="bg-pink-200 rounded-full shadow-md w-3/4 shadow-slate-600 p-2 transform rotate-[-6deg]">
              <img src="/images/product/image00006.jpeg" class="object-cover w-full h-full rounded-full" alt="">
            </div>

            <div class="bg-pink-200 rounded-3xl shadow-md w-3/4 shadow-slate-600 p-2 transform rotate-[3deg]">
              <img src="/images/product/image00003.jpeg" class="object-cover w-full h-full rounded-full" alt="">
            </div>

            <div class="bg-pink-200 rounded-full shadow-md w-3/4 shadow-slate-600 p-2 transform rotate-[-3deg]">
              <img src="/images/product/image00004.jpeg" class="object-cover  w-full h-full rounded-full" alt="">
            </div>        
    </div>

    <div class="flex justify-center items-center mt-12">
      <button class=" w-1/6 bg-slate-950 shadow-xl shadow-red-300 p-4 rounded-full text-xs  text-gray-50 hover:text-gray-950 hover:bg-slate-50 " type="button">VIEW MORE</button>
    </div>
  </div>
</section>

<section class="h-[1000px] bg-rose-100">
    <div class="flex flex-col mx-12  gap-8 w-1/3">
      <div class="mx-12 mt-12">
        <h2 class="text-gray-900 text-balance text-justify text-3xl">POPULAR LADIES SETS</h2>
      </div>
      <div>
        <div class="mx-12 flex gap-4">
         
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

    }
  }
}
</script>


