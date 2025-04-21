<template>
  <nav class="bg-white shadow p-4 h-32 flex justify-between gap-4 items-center">
    <!-- Hamburger for mobile -->
    <div class="md:hidden">
      <button @click="menuOpen = !menuOpen" class="text-gray-900 focus:outline-none">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="!menuOpen"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div class="flex items-center gap-8 h-24 md:min-w-300">
      <img class="object-cover h-32 md:w-full" src="../assets/blacklogo.png" alt="logo" >
      <div class="hidden lg:block space-x-4">
        <router-link to="/" class="text-gray-900 hover:underline">HOME</router-link>
        <router-link to="/men" class="text-gray-900 hover:underline">MEN</router-link>
        <router-link to="/women" class="text-gray-900 hover:underline">WOMEN</router-link>
        <router-link to="/accessories" class="text-gray-900 hover:underline">ACCESSORIES</router-link>
        <router-link to="/explore" class="text-gray-900 hover:underline">EXPLORE</router-link>
      </div>
    </div>

    <div class="flex items-center gap-5 md:mr-12 ">
      <div class="hidden md:flex  items-center w-96"><input type="text" class=" outline outline-gray-100 rounded-full p-3 w-full shadow-xl text-gray-950" placeholder="What are you looking for?"></div>
      <div class="flex items-center cursor-pointer" @click="toggleCart"><img src="../assets/cheeluxCartLogo.png" alt="" class="w-4 h-4"></div>
    </div>


    <!-- Mobile dropdown menu -->
    <div
      v-if="menuOpen"
      class="absolute top-28 left-0 w-full bg-white z-50 flex flex-col p-4 shadow-md md:hidden"
    >
      <router-link to="/" class="text-gray-900 hover:underline">HOME</router-link>
      <router-link to="/men" class="py-2 text-gray-900 hover:underline">MEN</router-link>
      <router-link to="/women" class="py-2 text-gray-900 hover:underline">WOMEN</router-link>
      <router-link to="/accessories" class="py-2 text-gray-900 hover:underline">ACCESSORIES</router-link>
      <router-link to="/explore" class="py-2 text-gray-900 hover:underline">EXPLORE</router-link>
    </div>
  </nav>
  <CartSidebar v-model="cartOpen" />
</template>
<script setup>
import { ref } from 'vue'
import CartSidebar from './CartSideBar.vue'

const cartOpen = ref(false)
const menuOpen = ref(false)

const toggleCart = () => {
  cartOpen.value = !cartOpen.value
}
</script>