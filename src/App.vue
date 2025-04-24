<template>
  <div>
    <Preloader v-if="loading"/>
    <DefaultLayout v-else>
      <router-view />
    </DefaultLayout>
  </div>
</template>

<script setup>
import DefaultLayout from './layouts/DefaultLayout.vue'
import Preloader from './components/Preloader.vue';
import { ref, onMounted} from 'vue';

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false; 
  }, 3100);
});
</script>
