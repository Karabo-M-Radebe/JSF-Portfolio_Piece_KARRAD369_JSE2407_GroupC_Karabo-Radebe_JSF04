<script setup>
import { RouterView, createRouter, createWebHistory } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Cardview from './components/Card/Cardview.vue';
import ProductView from './components/Product/ProductView.vue';
import Home from './pages/Home.vue';
import Wishlist from './pages/Wishlist.vue';
import Cart from './pages/Cart.vue';
import Comparison from './pages/Comparison.vue';
import Notification from './components/Notification.vue';
import Login from './pages/Login.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/products/:id', component: ProductView },
  { path: '/wishlist', component: Wishlist, meta: { requiresAuth: true } },
  { path: '/cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/products', component: Cardview },
  { path: '/comparison', component: Comparison, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Authentication Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('jwt');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});
</script>

<template>
  <div>
    <Navbar />
    <Notification />
    <router-view/>
  </div>
</template>



