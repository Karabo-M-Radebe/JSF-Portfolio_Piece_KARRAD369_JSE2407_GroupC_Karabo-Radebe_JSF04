<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { jwtDecode } from 'jwt-decode';
  
  const username = ref('')
  const password = ref('')
  const showPassword = ref(false)
  const isLoading = ref(false)
  const router = useRouter()
  const errorMessage = ref('')

  
  function validateInputs() {
    if (!username.value || !password.value) {
        errorMessage.value = 'Please enter both username and password'
                return false
          }
          errorMessage.value = ''
          return true;
  }

  function togglePasswordVisibility() {
    showPassword.value =!showPassword.value
  }

  function login() {
    isLoading.value = true
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST', // the method is defined so that the default 'GET method' isn't used. POST methods are used to send data
      headers: { 'Content-Type': 'application/json' }, //the headers simply provide additional information such as the type of content, which in this case is json
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then(res => res.json())
      .then(json => console.log(json)) //okay you console logged the token, but what do you want to do with it? set it to your local storage 
      .then(json => {
        if (json.token) {
            const decodedToken = jwtDecode(json.token)
            localStorage.setItem('token', json.token) // set the token in local storage
            const redirectTo = router.currentRoute.value.query.redirect || '/'
            router.push(redirectTo) // redirect to the page you wanted to go to

            username.value = ''
            password.value = ''
            errorMessage.value = ''
        } else {
            throw new Error ('Login failed. Please check your credentials.')
        }
      })
      .catch(err => {
        errorMessage.value = err.message || 'An error occurred during login'
      })
      .finally(() => isLoading.value = false) // always hide the loading state after the request
  }

  function logout() {
    localStorage.removeItem('token')
        router.push('/') // redirect to home page after logout
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
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
          >
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </form>
      </div>
    </div>
</template>

<style scoped></style>  