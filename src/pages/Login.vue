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
    <h1>Login page</h1>
</template>

<style scoped></style>  