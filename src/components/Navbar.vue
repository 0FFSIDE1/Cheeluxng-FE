<template>
  <nav class="bg-white shadow p-4 h-32 w-full flex justify-between items-center">
    <div class="flex items-center gap-8 h-24 min-w-300 ml-12">
      <img class="object-cover w-full h-72" src="../assets/blacklogo.png" alt="logo" >
      <div class="hidden md:block space-x-4">
        <router-link to="/" class="text-blue-500 hover:underline">Home</router-link>
        <router-link to="/about" class="text-blue-500 hover:underline">About</router-link>
        <router-link to="/contact" class="text-blue-500 hover:underline">Contact</router-link>
        <router-link to="/services" class="text-blue-500 hover:underline">Services</router-link>
        <router-link to="/blog" class="text-blue-500 hover:underline">Blog</router-link>
      </div>
    </div>

    <div class="flex items-center mr-12">
      <div class="flex items-center">Search</div>
      <div class="flex items-center cursor-pointer" @click="toggleCart">🛒</div>
    </div>
  
    <CartSidebar v-model="cartOpen" />
  </nav>
</template>
<script setup>
import { ref } from 'vue'
import CartSidebar from './CartSideBar.vue'

const cartOpen = ref(false)

const toggleCart = () => {
  cartOpen.value = !cartOpen.value
}
</script>