import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/Home.vue'), meta: { keepAlive: true}, },
  { path: '/:category', name:'ProductsByCategory', component: () => import('@/pages/ProductsByCategory.vue'), props: route => ({ category: route.params.category }), meta: { keepAlive: true},  },
  { path: '/explore', name:'Explore', component: () => import('@/pages/Explore.vue'), meta: { keepAlive: true}, },
  { path: '/product/:id', name: 'ProductDetail', component: () => import('@/pages/SingleProduct.vue'), meta: { keepAlive: false},  },
  { path: '/checkout', component: () => import('@/pages/Checkout.vue'), meta: { keepAlive: true}, },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: 'smooth' };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

export default router
