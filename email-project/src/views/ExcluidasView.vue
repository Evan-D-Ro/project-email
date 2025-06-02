<script>
import SidebarOptions from '@/components/SidebarOptions.vue';
import TopbarOptions from '@/components/TopbarOptions.vue';
import SearchBar from '@/components/SearchBar.vue';
import EmailList from '@/components/EmailList.vue';
import NewEmailForm from '../components/NewEmailForm.vue';
import Swal from 'sweetalert2';
import axios from 'axios';

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
      page: "excluidas",// <-- aqui
      mensagensSelecionadas: []
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

    atualizarSelecionadas(ids) {
      this.mensagensSelecionadas = ids;
    },
    async executarAcao(acao) {
      if (!this.mensagensSelecionadas.length) {
        await Swal.fire({
          icon: 'warning',
          title: 'Nenhuma mensagem selecionada',
          text: 'Por favor, selecione pelo menos uma mensagem para realizar esta ação.',
        });
        return;
      }

      let url;
      let successMessage;
      switch (acao) {
        case 'favoritar':
          url = 'http://localhost:3000/api/mensagens/marcar-favoritas';
          successMessage = 'Mensagens marcadas como favoritas com sucesso!';
          break;
        case 'arquivar':
          url = 'http://localhost:3000/api/mensagens/marcar-arquivadas';
          successMessage = 'Mensagens arquivadas com sucesso!';
          break;
        case 'excluir':
          url = 'http://localhost:3000/api/mensagens/marcar-excluidas';
          successMessage = 'Mensagens movidas para a lixeira com sucesso!';
          break;
        case 'excluir-permanente':
          url = 'http://localhost:3000/api/mensagens/excluir-mensagens';
          successMessage = 'Mensagens excluídas permanentemente com sucesso!';
          break;
        case 'restaurar':
          url = 'http://localhost:3000/api/mensagens/marcar-excluidas';
          successMessage = 'Mensagens restauradas com sucesso!';
          break;
        default:
          return;
      }

      try {
        const response = await axios.post(
          url,
          { mensagensIds: this.mensagensSelecionadas },
          { withCredentials: true }
        );

        await Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: successMessage,
        });

        if (response) {
          console.log("ok")
        }
        // Limpa seleção e recarrega emails
        this.mensagensSelecionadas = [];
        this.todosSelecionados = false;
        this.$refs.emailList.fetchEmails();
      } catch (error) {
        console.error(`Erro ao ${acao}:`, error);
        const errorMessage =
          error.response?.data?.message || `Erro ao ${acao} mensagens.`;
        await Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: errorMessage,
        });
      }
    },

  },
};
</script>


<template>
  <div
    class="flex flex-1 h-full flex-col lg:flex-row bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
    <SidebarOptions @novo-email="mostrarFormularioEmail" @voltar-caixa="ocultarFormularioEmail"
      :paginaAtual="'excluidas'" />
    <div class="flex flex-col flex-1 justify-around">
      <div class="pl-2">
        <div class="pl-4 pr-5">
          <h1 v-if="!mostrarFormulario" class="text-4xl font-bold text-green-600 dark:text-green-400 pt-5 pb-5">
            Excluídos
          </h1>
        </div>

        <div class="pl-4 pr-5">
          <SearchBar v-if="!mostrarFormulario" @buscar="atualizarBusca" />
        </div>
      </div>
      <div class="flex-1 flex flex-col overflow-hidden justify-start">

        <div class="pl-4 pr-5">
          <TopbarOptions v-if="!mostrarFormulario" :page="page" @selecionar-todos="selecionarTodos"
            @favoritar="executarAcao('favoritar')" @arquivar="executarAcao('arquivar')"
            @excluir="executarAcao('excluir')" @excluir-permanente="executarAcao('excluir-permanente')"
            @restaurar="executarAcao('restaurar')" />
          <EmailList v-if="!mostrarFormulario" ref="emailList" :todosSelecionados="todosSelecionados"
            :filtro="textoBusca" :page="page" @selecionadas="atualizarSelecionadas" />
        </div>
        <div class="h-full">
          <NewEmailForm v-if="mostrarFormulario" />
        </div>
      </div>
    </div>
  </div>
</template>
