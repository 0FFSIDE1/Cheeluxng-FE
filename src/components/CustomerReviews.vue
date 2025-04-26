<!-- src/components/CustomerFeedback.vue -->
<template>
    <section class="bg-gradient-to-r from-gray-400 to-blue-200 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <h2 class="text-3xl text-gray-950 mb-8 text-center">What Our Customers Say about Us! 🌟</h2>
        <div
          class="overflow-hidden"
          role="marquee"
          aria-label="Customer feedback carousel"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
          @focusin="isPaused = true"
          @focusout="isPaused = false"
        >
          <div class="flex" :class="{ 'animate-marquee': !isPaused, 'paused': isPaused }">
            <!-- Original Reviews -->
            <div
              v-for="review in reviews"
              :key="`original-${review.id}`"
              class="min-w-[20rem] mx-3 bg-white rounded-3xl shadow-md p-6 flex flex-col items-center text-center"
            >
              <p class="text-lg font-semibold text-gray-950">{{ review.name }}</p>
              <p class="text-sm text-gray-700 mt-1">Purchased: {{ review.product }}</p>
              <div class="flex mt-2" :aria-label="`${review.rating} out of 5 stars`">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="text-yellow-400 text-xl"
                  :class="{ 'opacity-30': star > review.rating }"
                >
                  ★
                </span>
              </div>
              <p class="text-base text-gray-700 mt-4 flex-1">{{ review.remarks }}</p>
            </div>
  
            <!-- Duplicated Reviews for Seamless Loop -->
            <div
              v-for="review in reviews"
              :key="`duplicate-${review.id}`"
              class="min-w-[20rem] mx-3 bg-white rounded-3xl shadow-md p-6 flex flex-col items-center text-center"
              aria-hidden="true"
            >
              <p class="text-lg font-semibold text-gray-950">{{ review.name }}</p>
              <p class="text-sm text-gray-700 mt-1">Purchased: {{ review.product }}</p>
              <div class="flex mt-2" :aria-label="`${review.rating} out of 5 stars`">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="text-yellow-400 text-xl"
                  :class="{ 'opacity-30': star > review.rating }"
                >
                  ★
                </span>
              </div>
              <p class="text-base text-gray-700 mt-4 flex-1">{{ review.remarks }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from '../services/axios';
  import { useToast } from 'vue-toastification';
  
  const reviews = ref([]); 
  const isPaused = ref(false);
  const toast = useToast();
  
  onMounted(async () => {
    try {
      const response = await api.get('reviews'); // Replace with your actual endpoint
      console.log(response)
      reviews.value = response.data.map((r) => ({
        id: r.id,
        name: r.name,
        product: r.product,
        rating: r.rating,
        remarks: r.remarks,
      }));
    } catch (error) {
        console.error('Failed to fetch customer reviews:', error)
      toast.error('Failed to fetch customer reviews:', error);
    }
  });
  </script>
  
  <style scoped>
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
  .paused {
    animation-play-state: paused;
  }
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  </style>
  