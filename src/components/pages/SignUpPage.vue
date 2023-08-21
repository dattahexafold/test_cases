<template>
    <div class="login mt-5">
      <h1>SignUp</h1>
      <form @submit.prevent="login">
        <input v-model="form.username" placeholder="Username" />
        <input v-model="form.password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import axios from 'axios';
  // import { useRouter } from 'vue-router';
  // let router=useRouter();
  const form = reactive({
    username: 'eve.holt@reqres.in',
    password: 'cityslicka',
  });
  
  const error = ref('');
  
  async function login() {
    try {
      const response = await axios.post('https://reqres.in/api/register', {
        username: form.username,
        password: form.password,
      });
      console.log(response)
      if(response.status===200){
        // router.push({path:"/dashboard"})
      }
    } catch (Error) {
      error.value = 'Invalid username or password';
    }
  }
  </script>
  
  <style>
  .login {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .login h1 {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .login input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .login button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .login button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  