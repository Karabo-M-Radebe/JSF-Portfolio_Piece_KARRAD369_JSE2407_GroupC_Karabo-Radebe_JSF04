<script setup>
import { computed } from 'vue';
import { useProductStore } from '../stores/productStore';

const productStore = useProductStore();

// Computed property to get compare products from the store
const compareProducts = computed(() => productStore.compareProducts);

// Function to remove a product from comparison
const removeProduct = (productId) => {
  productStore.removeFromCompare(productId);
};

// Function to clear all products from comparison
const clearComparison = () => {
  productStore.compareProducts = [];
  productStore.updateLocalStorage('compareProducts', productStore.compareProducts);
};
</script>

<template>
  <div class="container mx-auto mt-5 p-5">
    <h1 class="text-2xl font-bold text-center mb-5">Product Comparison</h1>
    <button @click="$router.go(-1)" class="bg-gray-500 text-white py-2 px-4 rounded-md mb-4">Back</button>
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
            <td class="py-2 px-4 border-b font-bold">Ratings</td>
            <td v-for="product in compareProducts" :key="product.id + '-category'" class="py-2 px-4 border-b">
              {{ product.rating.rate }} / 5
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
