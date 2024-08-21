import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useProductStore = defineStore('productStore', {
  state: () => {
    return {
      products: [],
      cart: [],
      wishlist: [],
      compareProducts: [],
      isAuthenticated: false,
      isNavbarVisible: false,
      jwtToken: localStorage.getItem('jwtToken') || null,
      currentSort: localStorage.getItem('currentSort') || 'default',
      category: null,
      sortOrder: 'asc',
    };
  },

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
          localStorage.setItem('jwtToken', data.token);
          this.isAuthenticated = true;
          const router = useRouter();
          router.push('/');
        } else {
          throw new Error('Login failed.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.isAuthenticated = false;
      }
    },

    logout() {
      this.jwtToken = null;
      localStorage.removeItem('jwtToken');
      this.isAuthenticated = false;
      const router = useRouter();
      router.push('/login');
    },

    async fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        this.products = await response.json();
      } catch (error) {
        console.error('Error fetching products:', error);
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
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      this.updateLocalStorage('cart', this.cart);
    },

    addToWishlist(product) {
      if (!this.wishlist.some(item => item.id === product.id)) {
        this.wishlist.push(product);
        this.updateLocalStorage('wishlist', this.wishlist);
      }
    },

    removeFromWishlist(productId) {
      this.wishlist = this.wishlist.filter(item => item.id !== productId);
      this.updateLocalStorage('wishlist', this.wishlist);
    },

    addToCompare(product) {
      if (!this.compareProducts.some(item => item.id === product.id) && this.compareProducts.length < 5) {
        this.compareProducts.push(product);
        this.updateLocalStorage('compareProducts', this.compareProducts);
      }
    },

    removeFromCompare(productId) {
      this.compareProducts = this.compareProducts.filter(item => item.id !== productId);
      this.updateLocalStorage('compareProducts', this.compareProducts);
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
  },

  getters: {
    cartItemCount: (state) => 
      state.cart.reduce((total, item) => total + item.quantity, 0),

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

// import { defineStore } from 'pinia';
// import { useRouter } from 'vue-router';


// const router = useRouter();

// export const useProductStore = defineStore('productStore', {
//   state: () => {
//     return {
//       products : [],
//       cart : [],
//       wishlist : [],
//       compareProducts : [],
//       isAuthenticated : false,
//       isNavbarVisible : false,
//       jwtToken : localStorage.getItem('jwtToken') || null
//       };
//   },

//   actions: {
//       toggleNavbar() {
//         isNavbarVisible = !isNavbarVisible;
//       },
    
//       async  login(username, password) {
//         try {
//           const response = await fetch('https://fakestoreapi.com/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//           });
    
//           const data = await response.json();
//           if (data.token) {
//             jwtToken = data.token;
//             localStorage.setItem('jwtToken', data.token);
//             isAuthenticated = true;
//             router.push('/');
//           } else {
//             throw new Error('Login failed.');
//           }
//         } catch (error) {
//           console.error('Error during login:', error);
//           isAuthenticated = false;
//         }
//       },
    
//        logout() {
//         jwtToken = null;
//         localStorage.removeItem('jwtToken');
//         isAuthenticated = false;
//         router.push('/login');
//       },
    
//       async fetchProducts() {
//         try {
//           const response = await fetch('https://fakestoreapi.com/products');
//           products = await response.json();
//         } catch (error) {
//           console.error('Error fetching products:', error);
//         }
//       },
    
//      addToCart(product) {
//         const existingProduct = cart.find(item => item.id === product.id);
//         if (existingProduct) {
//           existingProduct.quantity += 1;
//         } else {
//           cart.push({ ...product, quantity: 1 });
//         }
//         updateLocalStorage('cart', cart);
//       },
    
//       removeFromCart(productId) {
//         cart = cart.filter(item => item.id !== productId);
//         updateLocalStorage('cart', cart);
//       },
    
//       addToWishlist(product) {
//         if (!this.wishlist.some(item => item.id === product.id)) {
//           this.wishlist.push(product);
//           updateLocalStorage('wishlist', this.wishlist);
//         }
//       },
    
//       removeFromWishlist(productId) {
//         this.wishlist = wishlist.filter(item => item.id !== productId);
//         updateLocalStorage('wishlist', wishlist);
//       },
    
//       addToCompare(product) {
//         if (!compareProducts.some(item => item.id === product.id) && compareProducts.length < 5) {
//           compareProducts.push(product);
//           updateLocalStorage('compareProducts', compareProducts);
//         }
//       },
    
//       removeFromCompare(productId) {
//         compareProducts = compareProducts.filter(item => item.id !== productId);
//         updateLocalStorage('compareProducts', compareProducts);
//       },
    
//       setSortOption(option) {
//         currentSort = option;
//         localStorage.setItem('currentSort', option);
//       },
    
//       // Utility function to update local storage
//       updateLocalStorage(key, value) {
//         localStorage.setItem(key, JSON.stringify(value));
//       },
    
//       // Load initial state from localStorage
//       loadInitialState() {
//         const storedCart = JSON.parse(localStorage.getItem('cart'));
//         if (storedCart) cart = storedCart;
    
//         const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
//         if (storedWishlist) wishlist = storedWishlist;
    
//         const storedCompareProducts = JSON.parse(localStorage.getItem('compareProducts'));
//         if (storedCompareProducts) compareProducts = storedCompareProducts;
//       }, 
       
//     },

// getters:{
//  cartItemCount: (state) => 
//     state.cart.reduce((total, item) => total + item.quantity, 0),

//  wishlistItemCount: (state) => state.wishlist.length,

//  comparisonItemCount: (state) =>  state.compareProducts.length,

//  getCurrentSort: (state) => state.currentSort,

//  filteredProducts: (state) => {
//     let filtered = state.products;

//     if (state.category) {
//       filtered = filtered.filter(product => product.category === state.category);
//     }

//     if (state.sortOrder === 'asc') {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (state.sortOrder === 'desc') {
//       filtered.sort((a, b) => b.price - a.price);
//     }

//     return filtered;
//   },
// }
// })
// //  

// //   // State variables
  
  
// //   // Sorting and Filtering States
// //   const currentSort = ref(localStorage.getItem('currentSort') || 'default');
// //   const category = ref(null);
// //   const sortOrder = ref('asc');

//   // Getters
  

//   // Actions
  

//   // Load initial state when the store is created
// //   loadInitialState();

// //   return {
// //     // State
// //     products,
// //     cart,
// //     wishlist,
// //     compareProducts,
// //     isAuthenticated,
// //     isNavbarVisible,
// //     jwtToken,
// //     currentSort,
// //     category,
// //     sortOrder,

// //     // Getters
// //     cartItemCount,
// //     wishlistItemCount,
// //     comparisonItemCount,
// //     getCurrentSort,
// //     filteredProducts,

// //     // Actions
// //     toggleNavbar,
// //     login,
// //     logout,
// //     fetchProducts,
// //     addToCart,
// //     removeFromCart,
// //     addToWishlist,
// //     removeFromWishlist,
// //     addToCompare,
// //     removeFromCompare,
// //     setSortOption,
// //   };
// // });
