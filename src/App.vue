<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import CardView from './components/Card/CardView.vue';
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
  { path: '/products', component: CardView },
  { path: '/comparison', component: Comparison },
];
</script>

<template>
  <div>
    <Navbar />
    <router-view/>
  </div>
</template>



