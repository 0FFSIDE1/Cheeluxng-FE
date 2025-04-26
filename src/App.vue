<template>
  <div>
    <Preloader v-if="loading"/>
    <DefaultLayout v-else>
      <router-view />
      <ScrollToTop />
    </DefaultLayout>
  </div>
</template>

<script setup>
import DefaultLayout from './layouts/DefaultLayout.vue'
import Preloader from './components/Preloader.vue';
import { ref, onMounted} from 'vue';
import ScrollToTop from './components/ScrollToTopBtn.vue';

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false; 
  }, 4000);
});
</script>
