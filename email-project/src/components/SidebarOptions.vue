<template>
  <div>
    <!-- Botão para abrir a sidebar em dispositivos móveis -->
    <div class="lg:hidden flex justify-between items-center p-4">
      <button @click="toggleSidebar" class="text-green-600 dark:text-green-400">
        <i class="fas fa-bars fa-lg"></i>
      </button>
    </div>

    <!-- Sidebar (Desktop) -->
    <div class="w-64 h-full bg-white dark:bg-gray-900 border-r dark:border-gray-700 pt-7 hidden lg:block">
      <ul class="text-green-700 dark:text-green-400">

        <li class="mb-6">
          <button @click="emitNovoEmail"
            class="w-full p-3 bg-green-600 text-white dark:bg-green-700 rounded font-semibold text-md hover:bg-green-700 dark:hover:bg-green-600 transition duration-200 flex items-center justify-center">
            <i class="fas fa-plus-circle mr-2"></i>
            Novo E-mail
          </button>
        </li>

        <li>
          <button @click="goTo('inbox')" :class="[
            'w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800',
            paginaAtual === 'inbox' ? 'bg-green-100 dark:bg-green-900 font-semibold' : ''
          ]">
            <i class="ml-2 fas fa-inbox mr-2"></i>
            <span class="font-semibold pl-4 text-md">Caixa de entrada (...)</span>
          </button>
        </li>
        <li>
          <button @click="goTo('favoritos')" :class="[
            'w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800',
            paginaAtual === 'favoritas' ? 'bg-green-100 dark:bg-green-900 font-semibold' : ''
          ]">
            <i class="ml-2 fas fa-star mr-2"></i>
            <span class="pl-4 text-md">Favoritos</span>
          </button>
        </li>
        <li>
          <button @click="goTo('arquivados')" :class="[
            'w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800',
            paginaAtual === 'arquivadas' ? 'bg-green-100 dark:bg-green-900 font-semibold' : ''
          ]">
            <i class="ml-2 fas fa-folder mr-2"></i>
            <span class="pl-4 text-md">Arquivados</span>
          </button>
        </li>
        <li>
          <button @click="goTo('enviados')" :class="[
            'w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800',
            paginaAtual === 'enviadas' ? 'bg-green-100 dark:bg-green-900 font-semibold' : ''
          ]">
            <i class="ml-2 fas fa-paper-plane mr-2"></i>
            <span class="pl-4 text-md">Enviados</span>
          </button>
        </li>

        <li>
          <button @click="goTo('excluidos')" :class="[
            'w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800',
            paginaAtual === 'excluidas' ? 'bg-green-100 dark:bg-green-900 font-semibold' : ''
          ]">
            <i class="ml-2 fas fa-trash mr-2"></i>
            <span class="pl-4 text-md">Lixeira</span>
          </button>
        </li>
        <br />
        <hr class="mb-4 border-gray-300 dark:border-gray-600" />
        <li>
          <button @click="goTo('ajuda')"
            class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
            <i class="ml-2 fas fa-question-circle mr-2"></i>
            <span class="pl-4 text-md">Ajuda</span>
          </button>
        </li>
        <li>
          <button @click="goTo('config')"
            class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
            <i class="ml-2 fas fa-cogs mr-2"></i>
            <span class="pl-4 text-md">Configurações</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Sidebar para dispositivos móveis -->
    <div v-if="isSidebarOpen" class="lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
      @click="toggleSidebar">
      <div @click.stop class="w-64 h-full bg-white dark:bg-gray-900 relative">
        <!-- Ícone de Fechar "X" -->
        <div class="w-full relative flex justify-center items-center">
          <!-- Título centralizado -->
          <h2 class="text-lg font-bold text-green-600 dark:text-green-400">VUE MAIL</h2>
          <button @click="toggleSidebar" class="absolute top-4 right-4 text-green-600 dark:text-green-400 text-2xl">
            <i class="fas fa-times"></i>
          </button>
          <br /><br /><br />
          <hr class="border-gray-300 dark:border-gray-600" />
          <br /><br />
        </div>
        <ul class="text-green-700 dark:text-green-400">
          <li class="mb-6">
            <button @click="emitNovoEmail"
              class="w-full p-3 bg-green-600 text-white dark:bg-green-700 rounded font-semibold text-md hover:bg-green-700 dark:hover:bg-green-600 transition duration-200 flex items-center justify-center">
              <i class="fas fa-plus-circle mr-2"></i>
              Novo E-mail
            </button>
          </li>

          <li>
            <button @click="goTo('inbox')" :class="[
              'w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800',
              paginaAtual === 'inbox' ? 'bg-green-100 dark:bg-green-900 font-semibold' : ''
            ]">
              <i class="ml-2 fas fa-inbox mr-2"></i>
              <span class="font-semibold pl-4 text-md">Caixa de entrada (...)</span>
            </button>
          </li>
          <li>
            <button @click="goTo('favoritos')" :class="[
              'w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800',
              paginaAtual === 'favoritas' ? 'bg-green-100 dark:bg-green-900 font-semibold' : ''
            ]">
              <i class="ml-2 fas fa-star mr-2"></i>
              <span class="pl-4 text-md">Favoritos</span>
            </button>
          </li>
          <li>
            <button @click="goTo('arquivados')" :class="[
              'w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800',
              paginaAtual === 'arquivadas' ? 'bg-green-100 dark:bg-green-900 font-semibold' : ''
            ]">
              <i class="ml-2 fas fa-folder mr-2"></i>
              <span class="pl-4 text-md">Arquivados</span>
            </button>
          </li>
          <li>
            <button @click="goTo('enviados')" :class="[
              'w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800',
              paginaAtual === 'enviadas' ? 'bg-green-100 dark:bg-green-900 font-semibold' : ''
            ]">
              <i class="ml-2 fas fa-paper-plane mr-2"></i>
              <span class="pl-4 text-md">Enviados</span>
            </button>
          </li>
          <li>
            <button @click="goTo('excluidos')" :class="[
              'w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800',
              paginaAtual === 'excluidas' ? 'bg-green-100 dark:bg-green-900 font-semibold' : ''
            ]">
              <i class="ml-2 fas fa-trash mr-2"></i>
              <span class="pl-4 text-md">Excluídos</span>
            </button>
          </li>
          <br />
          <hr class="mb-4 border-gray-300 dark:border-gray-600" />
          <li>
            <button @click="goTo('ajuda')"
              class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
              <i class="ml-2 fas fa-question-circle mr-2"></i>
              <span class="pl-4 text-md">Ajuda</span>
            </button>
          </li>
          <li>
            <button @click="goTo('config')"
              class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
              <i class="ml-2 fas fa-cogs mr-2"></i>
              <span class="pl-4 text-md">Configurações</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paginaAtual: {
      type: String,
      default: 'inbox'
    }
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    emitNovoEmail() {
      this.$emit('novo-email');
    },
    goTo(routeName) {
      if (this.$route.name === routeName) {
        this.$emit('voltar-caixa');
      }
      this.$router.push({ name: routeName });
      this.isSidebarOpen = false; // fecha sidebar no mobile após redirecionar
    }
  },
};
</script>
