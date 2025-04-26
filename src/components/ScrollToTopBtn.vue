<template>
    <transition name="fade">
      <button
        v-if="isVisible"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-50 p-4 rounded-[100%] bg-gray-900 text-white shadow-lg hover:bg-gray-700 active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        aria-label="Scroll to top"
      >
      ↑
      </button>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'ScrollToTop',
    data() {
      return {
        isVisible: false,
      };
    },
    mounted() {
      window.addEventListener('scroll', this.toggleVisibility);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.toggleVisibility);
    },
    methods: {
      toggleVisibility() {
        this.isVisible = window.pageYOffset > 300;
      },
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  