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
      isDarkMode: false
    }
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
html,
body,
#app {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}
</style>
