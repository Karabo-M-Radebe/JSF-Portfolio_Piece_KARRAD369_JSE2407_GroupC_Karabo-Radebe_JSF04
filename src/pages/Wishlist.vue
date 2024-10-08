<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import Filter from '../components/Filter.vue';
import Sort from '../components/Sort.vue';

const productStore = useProductStore();
const router = useRouter();

const selectedCategory = ref('');
const selectedSortOption = ref('default');

// Computed property to get filtered and sorted wishlist products from the store
const wishlistProducts = computed(() => {
  let products = productStore.wishlist;

  // Filter by selected category
  if (selectedCategory.value) {
    products = products.filter(product => product.category === selectedCategory.value);
  }

  // Sort by selected option
  if (selectedSortOption.value === 'lowToHigh') {
    products.sort((a, b) => a.price - b.price);
  } else if (selectedSortOption.value === 'highToLow') {
    products.sort((a, b) => b.price - a.price);
  }

  return products;
});

// Function to handle category change
const handleCategoryChange = (category) => {
  selectedCategory.value = category;
};

// Function to handle sort option change
const handleSortChange = (option) => {
  selectedSortOption.value = option;
};

// Function to remove from wishlist
const removeFromWishlist = (id) => {
  productStore.removeFromWishlist(id);
};

// Function to clear entire wishlist
const clearWishlist = () => {
  productStore.wishlist = [];
  productStore.updateLocalStorage('wishlist', productStore.wishlist);
};

// Function to add product to cart
const addToCart = (product) => {
  productStore.addToCart(product);
};

// Function to view product details
const viewDetails = (id) => {
  router.push(`/product/${id}`);
};
</script>

<template>
  <div>
    <div class="container relative justify-center flex items-center space-x-4">
      <button @click="$router.go(-1)" class="bg-gray-500 text-white py-2 px-4 rounded-md">Back</button>
      <Filter
        :categories="productStore.categories"
        :selectedCategory="selectedCategory"
        @categoryChange="handleCategoryChange"
      />
      <Sort 
        :sortOptions="['default', 'lowToHigh', 'highToLow']"
        :selectedSortOption="selectedSortOption"
        @sortOptionChange="handleSortChange"
      />
    </div>

    <div v-if="wishlistProducts.length === 0" class="text-center mt-4">
      <p>No products in the wishlist.</p>
    </div>

    <div v-else class="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4">
      <div
        v-for="product in wishlistProducts"
        :key="product.id"
        class="relative flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
      >
        <div class="absolute top-4 right-2">
          <button>
            <svg
              class="me-1.5 h-5 w-5 fill-red-500"
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
            <template v-if="product.rating">
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
                :key="index + 'empty'"
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
            </template>
            <template v-else>
              <span>No ratings available</span>
            </template>
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
              @click="addToCart(product)"
              class="flex rounded-lg justify-center bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
            >
              Add To Cart
            </button>
            <button
            @click="removeFromWishlist(product.id)" aria-label="Remove from Favourites"
              class="flex rounded-lg justify-center bg-green-500 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
            >
              Remove from wishlist 
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
    <div class="text-center mt-4">
      <button
        @click="clearWishlist"
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800"
      >
        Clear Wishlist
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
</style>
