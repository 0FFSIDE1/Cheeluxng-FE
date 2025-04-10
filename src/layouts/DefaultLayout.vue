<template>
  <div class="min-h-screen w-full bg-gray-200 text-gray-800">
    <Navbar />
    <main class="">
      <slot />
    </main>
    
  </div>
  <Footer />
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>
