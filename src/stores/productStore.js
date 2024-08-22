// Store file: productStore.js
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    cart: [],
    wishlist: [],
    compareProducts: [],
    isAuthenticated: false,
    isNavbarVisible: false,
    jwtToken: localStorage.getItem('jwtToken') || "",
    user: {},
    currentSort: localStorage.getItem('currentSort') || 'default',
    category: null,
    sortOrder: 'asc',
    notification: "", // State to hold the notification message
  }),

  actions: {
    toggleNavbar() {
      this.isNavbarVisible = !this.isNavbarVisible;
    },

    async login(username, password) {
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
        if (data.token) {
          this.jwtToken = data.token;
          localStorage.setItem('jwtToken', this.jwtToken); 

          const decodedToken = jwtDecode(this.jwtToken)
          this.user = decodedToken;
          this.isAuthenticated = true;

          this.triggerNotification('Login successful!');
    
          const router = useRouter()
          const redirectTo = this.router.currentRoute.value.query.redirect || '/';
          router.push(redirectTo); // Redirect to the intended page or home
        } else {
          throw new Error('Login failed.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.isAuthenticated = false;
        this.triggerNotification('Login failed. Please check your credentials.');
      }
    },

    logout() {
      this.jwtToken = "";
      this.user = {};
      localStorage.removeItem('jwtToken');
      this.isAuthenticated = false;
      this.triggerNotification('You have logged out.');
      const router = useRouter();
      router.push('/login');
    },

    async fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        this.products = await response.json();
      } catch (error) {
        console.error('Error fetching products:', error);
        this.triggerNotification('Error fetching products. Please try again later.');
      }
    },

    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.updateLocalStorage('cart', this.cart);
      this.triggerNotification('Product added to cart.');
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      this.updateLocalStorage('cart', this.cart);
      this.triggerNotification('Product removed from cart.');
    },

    addToWishlist(product) {
      if (!this.wishlist.some(item => item.id === product.id)) {
        this.wishlist.push(product);
        this.updateLocalStorage('wishlist', this.wishlist);
        this.triggerNotification('Product added to wishlist.');
      }
    },

    removeFromWishlist(productId) {
      this.wishlist = this.wishlist.filter(item => item.id !== productId);
      this.updateLocalStorage('wishlist', this.wishlist);
      this.triggerNotification('Product removed from wishlist.');
    },

    addToCompare(product) {
      if (!this.compareProducts.some(item => item.id === product.id) && this.compareProducts.length < 5) {
        this.compareProducts.push(product);
        this.updateLocalStorage('compareProducts', this.compareProducts);
        this.triggerNotification('Product added to comparison.');
      }
    },

    removeFromCompare(productId) {
      this.compareProducts = this.compareProducts.filter(item => item.id !== productId);
      this.updateLocalStorage('compareProducts', this.compareProducts);
      this.triggerNotification('Product removed from comparison.');
    },

    setSortOption(option) {
      this.currentSort = option;
      localStorage.setItem('currentSort', option);
    },

    // Utility function to update local storage
    updateLocalStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },

    // Load initial state from localStorage
    loadInitialState() {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      if (storedCart) this.cart = storedCart;

      const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
      if (storedWishlist) this.wishlist = storedWishlist;

      const storedCompareProducts = JSON.parse(localStorage.getItem('compareProducts'));
      if (storedCompareProducts) this.compareProducts = storedCompareProducts;
    },

    // Trigger a notification
    triggerNotification(message) {
      this.notification = message;
      setTimeout(() => {
        this.notification = "";
      }, 2000); // Notification disappears after 2 seconds
    }
  },

  getters: {
     cartItemCount: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),

     wishlistItemCount: (state) => state.wishlist.length,

     comparisonItemCount: (state) =>  state.compareProducts.length,

     getCurrentSort: (state) => state.currentSort,

     filteredProducts: (state) => {
      let filtered = state.products;

      if (state.category) {
        filtered = filtered.filter(product => product.category === state.category);
      }

      if (state.sortOrder === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (state.sortOrder === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
      }

      return filtered;
    },
  }
});