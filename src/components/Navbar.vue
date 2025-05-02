<template>
  <nav class="bg-white shadow-md h-24 w-full sticky top-0 z-50">
    <div class="container mx-auto px-2 flex justify-between items-center h-full">
      <!-- Logo & Hamburger -->
      <div class="flex items-center gap-4">
        <!-- Hamburger (Mobile) -->
        <button
          @click="menuOpen = !menuOpen"
          class=" text-gray-700 lg:hidden focus:outline-none transition-transform duration-300"
        >
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!menuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Logo -->
         <div class="flex justify-center mr-8 items-center h-24">
          <img src="@/assets/blacklogo.png" alt="logo" class="object-contain" />
         </div>
       
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center gap-8 font-medium text-gray-800">
        <router-link to="/" class="hover:underline">HOME</router-link>
        <router-link
          :to="{ name: 'ProductsByCategory', params: { category: 'men' } }"
          :class="navLinkClass('men')"
        >MEN</router-link>
        <router-link
          :to="{ name: 'ProductsByCategory', params: { category: 'women' } }"
          :class="navLinkClass('women')"
        >WOMEN</router-link>
        <router-link
          :to="{ name: 'ProductsByCategory', params: { category: 'accessories' } }"
          :class="navLinkClass('accessories')"
        >ACCESSORIES</router-link>
        <router-link to="/explore" class="hover:underline">EXPLORE</router-link>
      </div>

      <!-- Search & Cart -->
      <div class="flex items-center gap-4">
        <div class="hidden  lg:ml-8 xl:block w-80">
          <input
            v-model="searchQuery"
            @keyup.enter="goToSearch"
            type="text"
            placeholder="Search..."
            class="form-input rounded-full px-5 py-2 w-full shadow-sm focus:ring-2 focus:ring-black"
          />
        </div>
        <button @click="toggleCart" class="relative">
          <img src="@/assets/cheeluxCartLogo.png" alt="cart" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="fade-slide">
      <div
        v-if="menuOpen"
        class="lg:hidden flex flex-col bg-white px-6 py-4 border-t shadow-md animate-in fade-in slide-in-from-top-2 duration-300"
      >
        <router-link to="/" class="py-2 text-gray-800 hover:underline">HOME</router-link>
        <router-link
          :to="{ name: 'ProductsByCategory', params: { category: 'men' } }"
          :class="mobileNavLinkClass('men')"
        >MEN</router-link>
        <router-link
          :to="{ name: 'ProductsByCategory', params: { category: 'women' } }"
          :class="mobileNavLinkClass('women')"
        >WOMEN</router-link>
        <router-link
          :to="{ name: 'ProductsByCategory', params: { category: 'accessories' } }"
          :class="mobileNavLinkClass('accessories')"
        >ACCESSORIES</router-link>
        <router-link to="/explore" class="py-2 text-gray-800 ">EXPLORE</router-link>
      </div>
    </transition>

    <CartSidebar v-model="cartOpen" />
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CartSidebar from './CartSideBar.vue';

const menuOpen = ref(false);
const cartOpen = ref(false);
const searchQuery = ref('');
const route = useRoute();
const router = useRouter();

const toggleCart = () => {
  cartOpen.value = !cartOpen.value;
};

const goToSearch = () => {
  if (!searchQuery.value.trim()) return;
  const currentCategory = route.params.category || 'men';
  router.push({
    name: 'ProductsByCategory',
    params: { category: currentCategory },
    query: { search: searchQuery.value.trim() },
  });
  searchQuery.value = '';
};

const navLinkClass = (cat) => {
  return `hover:underline ${
    route.params.category === cat ? 'font-bold underline text-black' : ''
  }`;
};

const mobileNavLinkClass = (cat) => {
  return `py-2 text-gray-800 hover:underline ${
    route.params.category === cat ? 'font-bold underline' : ''
  }`;
};
</script>

<style scoped>
.fade-slide-enter-active {
  transition: all 0.3s ease;
}
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
