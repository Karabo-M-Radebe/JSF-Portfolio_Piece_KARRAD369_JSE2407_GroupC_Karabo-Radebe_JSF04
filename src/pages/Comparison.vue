<script setup>
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
  </style>
  