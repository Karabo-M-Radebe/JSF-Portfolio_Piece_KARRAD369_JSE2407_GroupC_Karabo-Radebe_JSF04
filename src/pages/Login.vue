<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const router = useRouter();
const store = useProductStore();

const validateInputs = () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Please enter both username and password';
    return false;
  }
  errorMessage.value = '';
  return true;
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

const login = async() => {
  if (!validateInputs()) return;
  isLoading.value = true;

  try {
    await store.login(username.value, password.value, router); // Pass the router instance
    if (store.isAuthenticated) {
      const redirectTo = router.currentRoute.value.query.redirect || '/';
      router.push(redirectTo);
      username.value = '';
      password.value = '';
    } else {
      errorMessage.value = 'Login failed. Please try again.';
    }
  } catch (err) {
    errorMessage.value = err.message || 'An error occurred during login';
  } finally {
    isLoading.value = false; // Use isLoading.value instead of isLoading
  }
}
</script>

<template>
  <button @click="$router.go(-1)" class="bg-gray-500 text-white py-2 px-4 rounded-md mb-4">Back</button>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-4 text-center">Login Page</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="username">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="password">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 px-3 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div v-if="errorMessage" class="mb-4 text-red-600 text-sm">
          {{ errorMessage }}
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
        >
          <span v-if="isLoading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
