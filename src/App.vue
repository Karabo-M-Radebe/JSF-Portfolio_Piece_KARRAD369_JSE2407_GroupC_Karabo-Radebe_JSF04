<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Cardview from './components/Card/Cardview.vue';
import ProductView from './components/Product/ProductView.vue';
import Home from './pages/Home.vue';
import Wishlist from './pages/Wishlist.vue';
import Cart from './pages/Cart.vue';
import Comparison from './pages/Comparison.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/products/:id', component: ProductView },
  { path: '/wishlist', component: Wishlist },
  { path: '/cart', component: Cart },
  { path: '/products', component: Cardview },
  { path: '/comparison', component: Comparison },
];
</script>

<template>
  <div>
    <Navbar />
    <router-view/>
  </div>
</template>



