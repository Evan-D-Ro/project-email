<script>
import SidebarOptions from '@/components/SidebarOptions.vue';
import TopbarOptions from '@/components/TopbarOptions.vue';
import SearchBar from '@/components/SearchBar.vue';
import EmailList from '@/components/EmailList.vue';
import NewEmailForm from '../components/NewEmailForm.vue';

export default {
  components: {
    SidebarOptions,
    TopbarOptions,
    SearchBar,
    EmailList,
    NewEmailForm,
  },
  data() {
    return {
      mostrarFormulario: false,
      todosSelecionados: false,
      textoBusca: "",
      page: "enviadas" // <-- aqui
    };
  },
  methods: {
    mostrarFormularioEmail() {
      this.mostrarFormulario = true;
    },
    ocultarFormularioEmail() {
      this.mostrarFormulario = false;
    },
    selecionarTodos(valor) {
      this.todosSelecionados = valor;
    },
    atualizarBusca(valor) {
      this.textoBusca = valor;
    },
  },
};
</script>


<template>
  <div
    class="flex flex-1 h-full flex-col lg:flex-row bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
    <SidebarOptions @novo-email="mostrarFormularioEmail" @voltar-caixa="ocultarFormularioEmail"
      :paginaAtual="'enviadas'" />
    <div class="flex flex-col flex-1 justify-around">
      <div class="pl-2">
        <div class="pl-4 pr-5">
          <h1 v-if="!mostrarFormulario" class="text-4xl font-bold text-green-600 dark:text-green-400 pt-5 pb-5">
            Enviados
          </h1>
        </div>

        <div class="pl-4 pr-5">
          <SearchBar v-if="!mostrarFormulario" @buscar="atualizarBusca" />
        </div>
      </div>
      <div class="flex-1 flex flex-col overflow-hidden justify-start">

        <div class="pl-4 pr-5">
          <TopbarOptions v-if="!mostrarFormulario" @selecionar-todos="selecionarTodos" />
          <EmailList v-if="!mostrarFormulario" :todosSelecionados="todosSelecionados" :filtro="textoBusca"
            :page="page" />
        </div>
        <div class="h-full">
          <NewEmailForm v-if="mostrarFormulario" />
        </div>
      </div>
    </div>
  </div>
</template>
