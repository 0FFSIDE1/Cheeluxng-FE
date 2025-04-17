import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/Home.vue') },
  { path: '/men', component: () => import('../pages/Products.vue') },
  { path: '/women', component: () => import('../pages/Products.vue') },
  { path: '/accessories', component: () => import('../pages/Products.vue') },
  { path: '/explore', component: () => import('../pages/Products.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
