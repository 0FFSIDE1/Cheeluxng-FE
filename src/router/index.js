import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/Home.vue') },
  { path: '/:category', name:'ProductsByCategory', component: () => import('../pages/ProductsByCategory.vue'), props: route => ({ category: route.params.category }) },
  { path: '/explore', name:'Explore', component: () => import('../pages/Explore.vue') },
  { path: '/product/:id', component: () => import('../pages/SingleProduct.vue') },

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
