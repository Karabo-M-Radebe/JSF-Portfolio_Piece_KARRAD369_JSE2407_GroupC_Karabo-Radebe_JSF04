<script setup>
  import { useProductStore } from '../stores/productStore';
  import { computed, onMounted } from 'vue';

  const productStore = useProductStore();

  // Computed properties for item counts
  const wishlistItemCount = computed(() => productStore.wishlistItemCount);
  const comparisonItemCount = computed(() => productStore.comparisonItemCount);
  const cartItemCount = computed(() => productStore.cartItemCount);

  // Computed property for checking authentication
  const isAuthenticated = computed(() => productStore.isAuthenticated);

  // Handle logout
  function handleLogout() {
    productStore.logout();
  }

  // Load initial state on component mount
  onMounted(() => {
    productStore.loadInitialState();
  });
</script>

<template>
  <header class="sticky z-50 top-0">
    <nav class="bg-gray-500 border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/">
          <button class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="../assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
              SwiftCart
            </span>
          </button>
        </a>
        <button
          @click="productStore.toggleNavbar"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-dropdown"
          :aria-expanded="productStore.isNavbarVisible"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          class="w-full md:block md:w-auto"
          id="navbar-dropdown"
          :class="{ hidden: !productStore.isNavbarVisible }"
        >
          <ul class="flex flex-col top-10 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <!-- Wishlist -->
            <li>
              <a
                href="/wishlist"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 relative"
              >
                Wishlist
                <span v-if="wishlistItemCount > 0" class="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {{ wishlistItemCount }}
                </span>
              </a>
            </li>

            <!-- Comparison -->
            <li>
              <a
                href="/comparison"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 relative"
              >
                Comparison
                <span v-if="comparisonItemCount > 0" class="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {{ comparisonItemCount }}
                </span>
              </a>
            </li>

            <!-- Products -->
            <li>
              <a
                href="/products"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Products
              </a>
            </li>

            <!-- Cart -->
            <li>
              <a href="/cart" class="relative block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                Cart
                <span v-if="cartItemCount > 0" class="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {{ cartItemCount }}
                </span>
              </a>
            </li>

            <!-- Login/Logout -->
            <li v-if="isAuthenticated">
              <button
                @click="handleLogout"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Logout
              </button>
            </li>
            <li v-else>
              <a
                href="/login"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  @media (max-width: 768px) {
    .nav-list {
      flex-direction: column;
    }
  }
</style>
