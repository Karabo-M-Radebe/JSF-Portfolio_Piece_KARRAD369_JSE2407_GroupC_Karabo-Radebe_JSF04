<!-- <script setup>
import { ref, watch } from 'vue';

// Reactive reference to hold the compared products
const compareProducts = ref(JSON.parse(localStorage.getItem('compareProducts')) || []);

// Watcher to synchronize the compared products with localStorage
watch(compareProducts, (newVal) => {
  localStorage.setItem('compareProducts', JSON.stringify(newVal));
}, { deep: true });

</script>

<template>
    <div class="container mx-auto mt-5 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Product Comparison</h1>
      <div v-if="compareProducts.length === 0" class="text-center">
        <p>No products to compare.</p>
      </div>
      <table v-else class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Image</th>
            <th class="py-2 px-4 border-b">Title</th>
            <th class="py-2 px-4 border-b">Price</th>
            <th class="py-2 px-4 border-b">Category</th>
            <th class="py-2 px-4 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in compareProducts" :key="product.id">
            <td class="py-2 px-4 border-b">
              <img :src="product.image" alt="product.title" class="h-16 object-contain"/>
            </td>
            <td class="py-2 px-4 border-b">{{ product.title }}</td>
            <td class="py-2 px-4 border-b">{{ product.price }}</td>
            <td class="py-2 px-4 border-b">{{ product.category }}</td>
            <td class="py-2 px-4 border-b">{{ product.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style scoped>
  .container {
    max-width: 1000px;
  }
  </style> -->

<script setup>
import { ref, watch } from 'vue';

// Reactive reference to hold the compared products
const compareProducts = ref(JSON.parse(localStorage.getItem('compareProducts')) || []);

// Watcher to synchronize the compared products with localStorage
watch(compareProducts, (newVal) => {
  localStorage.setItem('compareProducts', JSON.stringify(newVal));
}, { deep: true });

// Function to remove a product from comparison
const removeProduct = (productId) => {
  compareProducts.value = compareProducts.value.filter(product => product.id !== productId);
};

// Function to clear all products from comparison
const clearComparison = () => {
  compareProducts.value = [];
};
</script>

<template>
  <div class="container mx-auto mt-5 p-5">
    <h1 class="text-2xl font-bold text-center mb-5">Product Comparison</h1>
    <button @click="$router.go(-1)" class="bg-gray-500 text-white py-2 px-4 rounded-md mb-4">back</button>
    <div v-if="compareProducts.length === 0" class="text-center">
      <p>No products to compare.</p>
    </div>
    <div v-else class="overflow-auto">
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b"></th>
            <th v-for="product in compareProducts" :key="product.id" class="py-2 px-4 border-b relative">
              {{ compareProducts.indexOf(product) + 1 }}
              <button @click="removeProduct(product.id)" class="absolute top-0 right-0 mt-2 mr-2 text-red-600 hover:text-red-800">
                -
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-2 px-4 border-b font-bold">Image</td>
            <td v-for="product in compareProducts" :key="product.id + '-image'" class="py-2 px-4 border-b">
              <img :src="product.image" alt="product.title" class="h-32 object-contain mx-auto"/>
            </td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b font-bold">Title</td>
            <td v-for="product in compareProducts" :key="product.id + '-title'" class="py-2 px-4 border-b">
              {{ product.title }}
            </td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b font-bold">Price</td>
            <td v-for="product in compareProducts" :key="product.id + '-price'" class="py-2 px-4 border-b">
              ${{ product.price }}
            </td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b font-bold">Category</td>
            <td v-for="product in compareProducts" :key="product.id + '-category'" class="py-2 px-4 border-b">
              {{ product.category }}
            </td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b font-bold">Description</td>
            <td v-for="product in compareProducts" :key="product.id + '-description'" class="py-2 px-4 border-b">
              {{ product.description }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center mt-4">
        <button @click="clearComparison" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800">
          Clear Comparison
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
}
</style>

  