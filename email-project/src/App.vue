<template>
<div id="app" :class="{ dark: isDarkMode }">
  <!-- Navigation Bar -->
    <nav class="flex justify-around items-center p-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
    <!-- Logo -->
      <div class="flex items-center">
        <img src="@/assets/logo.png" alt="Logo" class="h-12" />
        <span class="text-green-600 dark:text-green-400 font-semibold">VUE MAIL</span>
      </div>
      <div>
        <span class="text-green-600 font-semibold hidden">LINGUAGENS DE PROGRAMAÇÃO II</span>
      </div>
      <!-- Right Side: User Profile with Dropdown -->
      <div class="flex items-center space-x-4 mr-2">
  <div class="relative">
    <!-- User Profile Button -->
    <button @click="toggleDropdown" class="flex items-center space-x-2 focus:outline-none">
      <div class="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
        <span class="text-sm">O</span>
      </div>
      <span class="text-gray-700 dark:text-gray-200">Olá,</span>
      <span class="text-green-600 dark:text-green-400 font-semibold">
        EVANDRO <i class="fas fa-caret-down" aria-hidden="true"></i>
      </span>
    </button>

          <!-- Dropdown Menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10"
          >
            <button
              @click="toggleDarkMode"
              class="block w-full text-left px-4 py-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span>{{ isDarkMode ? 'Modo Claro ( ' : 'Modo Noturno ( ' }}</span>
              <i class="fas" :class="isDarkMode ? 'fa-sun' : 'fa-moon'"></i>
              <span> )</span>
            </button>
            <button
              @click="logout"
              class="block w-full text-left px-4 py-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

    </nav>
    <router-view />
    <footer class="flex flex-col justify-around items-center p-6 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <span class="font-semibold text-green-600">VUE.JS + TAILWIND + EXPRESS.JS</span>
      <span class="dark:text-gray-200">Evandro Acorsi Filho | Jorge Mateus de Souza Santos</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isDropdownOpen: false,
      isDarkMode: false, // 👈 adiciona isso
    };
  },

  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    logout() {
      // Add logout logic here (e.g., clear user session, redirect to login)
      this.isDropdownOpen = false;
      console.log("User logged out");
      // Example: Redirect to login page
      this.$router.push("/login");
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #1e40af;
}
</style>