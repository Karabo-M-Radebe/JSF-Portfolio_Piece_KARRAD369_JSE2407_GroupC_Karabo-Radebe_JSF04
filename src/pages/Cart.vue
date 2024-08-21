<script setup>
import { computed } from 'vue';
import { useProductStore } from '../stores/productStore';

// Access the store
const productStore = useProductStore();

// Use store's cart state
const cartProducts = computed(() => productStore.cart);

// Calculate the total cost of the cart using store's state
const cartTotal = computed(() => {
  return cartProducts.value.reduce((total, product) => total + product.price * product.quantity, 0);
});

// Increase product quantity by using store's action
const increaseQuantity = (product) => {
  productStore.addToCart(product); // Reusing the addToCart method to increase quantity
};

// Decrease product quantity using store's action
const decreaseQuantity = (product) => {
  if (product.quantity > 1) {
    product.quantity -= 1;
    productStore.updateLocalStorage('cart', cartProducts.value); // Update local storage via store
  }
};

// Remove product from cart using store's action
const removeFromCart = (product) => {
  productStore.removeFromCart(product.id);
};

// Clear the entire cart
const clearCart = () => {
  productStore.cart = [];
  productStore.updateLocalStorage('cart', productStore.cart); // Clear cart in local storage
};
</script>

<template>
  <div class="container mx-auto mt-5 p-5">
    <h1 class="text-2xl font-bold text-center mb-5">Your Shopping Cart</h1>
    <button @click="$router.go(-1)" class="bg-gray-500 text-white py-2 px-4 rounded-md mb-4">Back</button>
    <div v-if="cartProducts.length === 0" class="text-center">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Image</th>
            <th class="py-2 px-4 border-b">Title</th>
            <th class="py-2 px-4 border-b">Price</th>
            <th class="py-2 px-4 border-b">Quantity</th>
            <th class="py-2 px-4 border-b">Total</th>
            <th class="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cartProducts" :key="product.id">
            <td class="py-2 px-4 border-b">
              <img :src="product.image" alt="product.title" class="h-16 object-contain"/>
            </td>
            <td class="py-2 px-4 border-b">{{ product.title }}</td>
            <td class="py-2 px-4 border-b">${{ product.price }}</td>
            <td class="py-2 px-4 border-b">
              <div class="flex items-center space-x-2">
                <button @click="decreaseQuantity(product)" class="px-2 py-1 bg-red-500 text-white rounded">-</button>
                <span>{{ product.quantity }}</span>
                <button @click="increaseQuantity(product)" class="px-2 py-1 bg-green-500 text-white rounded">+</button>
              </div>
            </td>
            <td class="py-2 px-4 border-b">${{ product.price * product.quantity }}</td>
            <td class="py-2 px-4 border-b">
              <button @click="removeFromCart(product)" class="px-2 py-1 bg-red-600 text-white rounded">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right mt-4">
        <h2 class="text-xl font-bold">Total: ${{ cartTotal }}</h2>
        <button @click="clearCart" class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800">
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
