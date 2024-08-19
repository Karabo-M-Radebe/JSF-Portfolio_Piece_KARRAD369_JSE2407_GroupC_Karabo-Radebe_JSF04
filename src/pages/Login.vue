<script setup>
  import { ref } from 'vue'
  
  const username = ref('')
  const password = ref('')
  
  function login() {
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('Error:', err))
  }
  </script>

<template> 
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
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
</template>

<style scoped></style>  