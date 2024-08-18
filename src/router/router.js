import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import ProductView from '../components/Product/ProductView.vue';
import Login from '../pages/Login.vue';
import Wishlist from '../pages/Wishlist.vue';
import Cart from '../pages/Cart.vue';
import Cardview from '../components/Card/Cardview.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
      { path: '/', component: Home },
      { path: '/products/:id', component: ProductView },
      { path: '/login', component: Login},
      { path: '/wishlist', component: Wishlist},
      { path: '/cart', component: Cart},
      { path: '/products', component: Cardview}

  ]
});

export default router;
