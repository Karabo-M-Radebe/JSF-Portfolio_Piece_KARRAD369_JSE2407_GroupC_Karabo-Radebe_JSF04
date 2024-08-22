import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import ProductView from '../components/Product/ProductView.vue';
import Login from '../pages/Login.vue';
import Wishlist from '../pages/Wishlist.vue';
import Cart from '../pages/Cart.vue';
import Cardview from '../components/Card/Cardview.vue';
import Comparison from '../pages/Comparison.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/products/:id', component: ProductView },
  { path: '/login', component: Login },
  {
    path: '/wishlist',
    component: Wishlist,
    meta: { requiresAuth: true }, // Protect Wishlist
  },
  {
    path: '/cart',
    component: Cart,
    meta: { requiresAuth: true }, // Protect Cart
  },
  {
    path: '/comparison',
    component: Comparison,
    meta: { requiresAuth: true }, // Protect Comparison
  },
  { path: '/products', component: Cardview },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Protected Routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwtToken'); // Check if the token exists

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login'); // Redirect to login page if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
