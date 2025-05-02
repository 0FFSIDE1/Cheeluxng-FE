<template>
  <div>
    <Preloader v-if="loading" />
    <DefaultLayout v-else>
      <router-view v-slot="{ Component }">
        <keep-alive v-if="$route.meta.keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component v-else :is="Component" />
      </router-view>

      <ScrollToTop />
    </DefaultLayout>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import Preloader from './components/Preloader.vue';
import { ref, onMounted} from 'vue';
import ScrollToTop from './components/ScrollToTopBtn.vue';

const loading = ref(true);
const route = useRoute()


onMounted(() => {
  setTimeout(() => {
    loading.value = false; 
  }, 4000);
});
</script>
