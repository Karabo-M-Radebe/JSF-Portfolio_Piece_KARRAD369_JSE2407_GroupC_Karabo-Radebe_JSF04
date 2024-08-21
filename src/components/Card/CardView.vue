<template>
    <div>
      <div class="container">
        <Filter
          :categories="categories"
          :selectedCategory="selectedCategory"
          @categoryChange="handleCategoryChange"
        />
        <Sort 
          :sortOptions="sortOptions"
          :selectedSortOption="selectedSortOption"
          @sortOptionChange="handleSortChange"
        />
      </div>
      <div v-if="loading" class="grid justify-center">
        <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
          <CardSkeleton v-for="index in 20" :key="index" />
        </div>
      </div>
      <Error v-else-if="error" :message="error" />
      <div v-else-if="filteredProducts.length > 0" class="grid justify-center">
        <div class="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="relative flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
          >
            <div class="absolute top-4 right-2">
              <button @click="toggleFavourite(product)" aria-label="Add to Favourites">
                <svg
                  :class="{ 'fill-red-500': isFavourite(product.id) }"
                  class="me-1.5 h-5 w-5 hover:fill-red-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  transform="scale(1.6)"
                >
                  <path
                    stroke="currentColor"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
              </button>
            </div>
            <img
              class="object-contain h-48 mt-3"
              :src="product.image"
              :alt="product.title"
            />
            <div class="flex-1 flex flex-col p-6">
              <div class="flex-1">
                <header class="mb-2 flex-2">
                  <h2 class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600">
                    {{ product.title }}
                  </h2>
                </header>
              </div>
              <div class="flex items-left -ml-2 mb-2">
                <svg
                  v-for="index in Math.round(product.rating.rate)"
                  :key="index"
                  class="w-4 h-4 text-yellow-300 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <svg
                  v-for="index in 5 - Math.round(product.rating.rate)"
                  :key="index"
                  class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
              </div>
              <div class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
                <h2>$ {{ product.price }}</h2>
              </div>
              <div class="flex mt-1 space-x-2 my-3">
                <div class="justify-start flex-1">
                  <span
                    class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                  >
                    {{ product.category }}
                  </span>
                </div>
              </div>
              <div class="flex space-x-2 justify-center">
                <button
                  @click="addToCompare(product)"
                  class="flex rounded-lg justify-center bg-green-500 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
                >
                  Compare
                </button>
                <button
                  @click="addToCart(product)"
                  class="flex rounded-lg justify-center bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
                >
                  Add To Cart
                </button>
                <a :href="`/products/${product.id}`">
                  <button class="flex rounded-lg justify-center bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300">
                    View Details
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="grid justify-center">No products found.</p>
    </div>
  </template>
    
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import CardSkeleton from './CardSkeleton.vue';
  import Error from '../Error.vue';
  import Filter from '../Filter.vue';
  import Sort from '../Sort.vue';
  import { useProductStore } from '../../stores/productStore';
  
  const productStore = useProductStore();
  const products = ref([]);
  const filteredProducts = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const categories = ref([]);
  const selectedCategory = ref('');
  const router = useRouter();
  
  // Fetch products data
  const getProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      products.value = await response.json();
      categories.value = [...new Set(products.value.map(product => product.category))];
      filteredProducts.value = [...products.value];
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  // Fetch products by category
  const getProductsByCategory = async category => {
    try {
      loading.value = true;
      error.value = null;
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      products.value = await response.json();
      filteredProducts.value = [...products.value];
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  // Handle category change
  const handleCategoryChange = category => {
    selectedCategory.value = category;
    if (selectedCategory.value) {
      getProductsByCategory(selectedCategory.value);
    } else {
      getProducts();
    }
  };
  
  // Handle sorting
  const handleSortChange = option => {
    productStore.setSortOption(option);
  };
  
  // Add to compare functionality
  const addToCompare = product => {
    // let compareProducts = JSON.parse(localStorage.getItem('compareProducts')) || [];
    // if (!compareProducts.some(item => item.id === product.id) && compareProducts.length < 5) {
    //   compareProducts.push(product);
    //   localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
    // }
    productStore.addToCompare(product);
  };
  
  // Add to cart functionality
  const addToCart = product => {
    // let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    // let existingProduct = cartProducts.find(item => item.id === product.id);
    // if (existingProduct) {
    //   existingProduct.quantity += 1;
    // } else {
    //   cartProducts.push({ ...product, quantity: 1 });
    // }
    // localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    productStore.addToCart(product);
  };
  
  // Toggle favourite
  const toggleFavourite = product => {
    // let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    // const index = wishlist.findIndex(item => item.id === product.id);
    // if (index !== -1) {
    //   wishlist.splice(index, 1); // Remove from wishlist
    // } else {
    //   wishlist.push(product); // Add to wishlist
    // }
    // localStorage.setItem('wishlist', JSON.stringify(wishlist));
    productStore.addToWishlist(product),
    productStore.removeFromWishlist(product)

  };  
  
  // Check if product is in wishlist
  const isFavourite = id => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist.some(item => item.id === id);
  };
  
  // View product details
  const viewDetails = id => {
    getProductDetails()
  };
  
  // Watch for sort changes
  watch(
    () => productStore.getCurrentSort,
    newSortOption => {
      if (newSortOption === 'lowToHigh') {
        filteredProducts.value.sort((a, b) => a.price - b.price);
      } else if (newSortOption === 'highToLow') {
        filteredProducts.value.sort((a, b) => b.price - a.price);
      } else {
        filteredProducts.value = [...products.value];
      }
    }
  );
  
  // Fetch products on component mount
  onMounted(() => {
    getProducts();
  });
  </script>
    
  <style scoped>
  @media (min-width: 1024px) {
    .container {
      display: flex;
      align-items: flex-start;
    }
  }
  </style>
  