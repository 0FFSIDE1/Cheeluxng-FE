import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/Home.vue') },
  { path: '/:category', name:'ProductsByCategory', component: () => import('../pages/Products.vue'), props: route => ({ category: route.params.category }) },
  { path: '/explore', component: () => import('../pages/Explore.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
