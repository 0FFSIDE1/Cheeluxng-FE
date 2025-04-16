<template>
    <Teleport to="body">
      <transition name="slide">
        <div v-if="model" class="fixed w-72 top-0 right-0 md:w-[700px] h-full bg-white shadow-lg z-[1000]">
          <div class="p-4 border-b flex justify-between items-center mx-3">
            <h2 class="text-lg font-bold text-gray-950">Your Cart</h2>
            <button @click="model = false" class="text-gray-950 hover:text-black">✕</button>
          </div>
          <div class="p-4">
            <!-- Replace with real cart content later -->
            <p>Your cart is empty.</p>
          </div>
        </div>
      </transition>
    </Teleport>
  </template>
  
  <script setup>
  const model = defineModel({ type: Boolean })
  </script>
  
  <style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
  </style>
  