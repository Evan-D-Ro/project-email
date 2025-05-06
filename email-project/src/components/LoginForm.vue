<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-2">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1" for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1" for="password">Senha</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      alert(`Email: ${this.email}\nSenha: ${this.password}`);
    }
  }
};
</script>
