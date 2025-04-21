<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import api from './services/axios'
import Cookies from 'js-cookie'

onMounted(async () => {
  const token = Cookies.get('csrftoken')

  if (!token) {
    try {
      await api.get('/get-csrf-token')
      console.info('[CSRF] Token retrieved successfully.')
    } catch (err) {
      console.error('[CSRF] Failed to fetch token:', err)
    }
  } else {
    console.info('[CSRF] Token already present in cookies.')
  }
})
</script>
