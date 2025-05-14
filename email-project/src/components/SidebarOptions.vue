<template>
  <div>
    <!-- Botão para abrir a sidebar em dispositivos móveis -->
    <div class="lg:hidden flex justify-between items-center p-4">
      <button @click="toggleSidebar" class="text-green-600 dark:text-green-400">
        <i class="fas fa-bars fa-lg"></i>
      </button>
    </div>

    <!-- Sidebar (Desktop) -->
    <div class="w-64 h-full bg-white dark:bg-gray-900 border-r dark:border-gray-700 pt-12 hidden lg:block">
      <ul class="text-green-700 dark:text-green-400">

        <li class="mb-2">
          <button
            class="w-60 block mx-auto p-3 bg-green-600 text-white dark:bg-green-700 rounded font-semibold text-md hover:bg-green-700 dark:hover:bg-green-600 transition duration-200">
            <i class="fas fa-plus-circle mr-2"></i>
            Novo E-mail
          </button>
        </li>


        <li>
          <button
            class="w-full p-2 bg-green-100 dark:bg-green-900 rounded pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-200 dark:hover:bg-green-800">
            <i class="ml-2 fas fa-inbox mr-2"></i>
            <span class="font-semibold pl-4 text-md">Caixa de entrada (1)</span>
          </button>
        </li>
        <li>
          <button
            class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
            <i class="ml-2 fas fa-star mr-2"></i>
            <span class="pl-4 text-md">Favoritas</span>
          </button>
        </li>
        <li>
          <button
            class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
            <i class="ml-2 fas fa-folder mr-2"></i>
            <span class="pl-4 text-md">Arquivadas</span>
          </button>
        </li>
        <li>
          <button
            class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
            <i class="ml-2 fas fa-paper-plane mr-2"></i>
            <span class="pl-4 text-md">Enviadas</span>
          </button>
        </li>

        <li>
          <button
            class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
            <i class="ml-2 fas fa-trash mr-2"></i>
            <span class="pl-4 text-md">Excluídas</span>
          </button>
        </li>
        <br />
        <hr class="mb-4 border-gray-300 dark:border-gray-600" />
        <li>
          <button
            class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
            <i class="ml-2 fas fa-question-circle mr-2"></i>
            <span class="pl-4 text-md">Ajuda</span>
          </button>
        </li>
        <li>
          <button
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
        <button @click="toggleSidebar" class="absolute top-4 right-4 text-green-600 dark:text-green-400 text-2xl">
          <i class="fas fa-times"></i>
        </button>
        <br /><br /><br />
        <hr class="border-gray-300 dark:border-gray-600" />
        <br /><br />

        <ul class="text-green-700 dark:text-green-400">
          <li>
            <button
              class="w-full p-2 bg-green-100 dark:bg-green-900 rounded pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-200 dark:hover:bg-green-800">
              <i class="ml-2 fas fa-inbox mr-2"></i>
              <span class="font-semibold pl-4 text-md">Caixa de entrada (1)</span>
            </button>
          </li>
          <li>
            <button
              class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
              <i class="ml-2 fas fa-star mr-2"></i>
              <span class="pl-4 text-md">Favoritas</span>
            </button>
          </li>
          <li>
            <button
              class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
              <i class="ml-2 fas fa-folder mr-2"></i>
              <span class="pl-4 text-md">Arquivadas</span>
            </button>
          </li>
          <li>
            <button
              class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
              <i class="ml-2 fas fa-trash mr-2"></i>
              <span class="pl-4 text-md">Excluídas</span>
            </button>
          </li>
          <br />
          <hr class="mb-4 border-gray-300 dark:border-gray-600" />
          <li>
            <button
              class="w-full p-2 pt-4 pb-4 flex items-center transition duration-200 hover:bg-green-100 dark:hover:bg-green-800">
              <i class="ml-2 fas fa-question-circle mr-2"></i>
              <span class="pl-4 text-md">Ajuda</span>
            </button>
          </li>
          <li>
            <button
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
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>
