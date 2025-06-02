<template>
  <div id="app" :class="{ dark: isDarkMode }">
    <!-- Navbar sempre visível, mas mostrando ou não o perfil -->
    <NavBar :isDarkMode="isDarkMode" :mostrarUsuario="mostrarUsuario" @toggle-dark-mode="toggleDarkMode" />
    <main class="flex-grow overflow-auto">
      <router-view />
    </main>

    <FooterBar />
  </div>
</template>


<script>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

export default {
  name: 'App',
  components: { NavBar, FooterBar },
  data() {
    return {
      isDarkMode: localStorage.getItem('darkMode') === 'true'
    }
  },
  watch: {
      isDarkMode(val) {
          localStorage.setItem('darkMode', val);
          document.documentElement.classList.toggle('dark', val);
      }
  },
  created() {
      // aplica o modo escuro no carregamento
      document.documentElement.classList.toggle('dark', this.isDarkMode);
  },
  computed: {
    mostrarUsuario() {
      // Oculta apenas o perfil do usuário e o footer nas páginas públicas
      return this.$route.path !== '/' && this.$route.path !== '/login'
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
  display: flex; /* Para repassar o flex para a página de login */
  flex-direction: column;
}
</style>
