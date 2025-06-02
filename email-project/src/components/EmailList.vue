<script>
import axios from 'axios';

export default {
  name: 'EmailList',
  props: {
    todosSelecionados: {
      type: Boolean,
      default: false,
    },
    filtro: {
      type: String,
      default: '',
    },
    page: {
      type: String,
      default: 'recebidas',
    },
  },
  data() {
    return {
      emails: [],
      mensagensSelecionadas: [],
      loading: false,
      error: null,
    };
  },
  computed: {
    emailsFiltrados() {
      const filtroLower = this.filtro.toLowerCase();
      return this.emails.filter(
        (email) =>
          email.assunto.toLowerCase().includes(filtroLower) ||
          (email.remetente.nome || email.remetente.email)
            .toLowerCase()
            .includes(filtroLower)
      );
    },
  },
  watch: {
    mensagensSelecionadas(newValue) {
      this.$emit('selecionadas', newValue);
    },
    todosSelecionados(newValue) {
      if (newValue) {
        this.mensagensSelecionadas = this.emailsFiltrados.map(email => email.id);
      } else {
        this.mensagensSelecionadas = [];
      }
    },
  },
  methods: {
    async fetchEmails() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/mensagens/${this.page}`,
          {
            withCredentials: true, // Envia cookies HttpOnly automaticamente
          }
        );
        this.emails = response.data;
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        this.error = 'Erro ao carregar mensagens. Tente novamente mais tarde.';
      } finally {
        this.loading = false;
      }
    },
    formatarData(data) {
      const date = new Date(data);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    viewEmail(id) {
      this.$router.push({ name: 'inboxMessage', params: { id } });
    },
  },
  mounted() {
    this.fetchEmails();
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  .grid-cols-12 {
    grid-template-columns: repeat(12, 1fr);
  }

  .col-span-4,
  .col-span-5,
  .col-span-3 {
    grid-column: span 12;
  }

  .p-4 {
    padding: 1rem;
  }

  .hidden.md\\:grid {
    display: none;
  }

  .font-semibold {
    font-weight: 600;
  }
}
</style>

<template>
  <div>
    <!-- Indicador de carregamento -->
    <div v-if="loading" class="text-center p-4 text-gray-600 dark:text-gray-300">
      Carregando mensagens...
    </div>
    <div v-else-if="error" class="text-center p-4 text-red-600 dark:text-red-400">
      {{ error }}
    </div>
    <div v-else-if="emails.length === 0" class="text-center p-4 text-gray-600 dark:text-gray-300">
      Nenhum email encontrado.
    </div>
    <div v-else>
      <!-- Cabeçalhos -->
      <div
        class="grid grid-cols-12 gap-4 pt-4 pb-4 pl-2 border-t border-b border-gray-300 dark:border-gray-700 font-semibold text-gray-600 dark:text-gray-300 hidden md:grid bg-white dark:bg-gray-900">
        <div class="col-span-4 flex items-center space-x-2">
          <div class="w-4"></div>
          <button class="hover:text-green-600 pl-2" aria-label="Remetente">
            <span>
              Remetente
              <i class="fas fa-sort ml-1 text-green-600 text-xs"></i>
            </span>
          </button>
        </div>
        <div class="col-span-5">Assunto</div>
        <div class="col-span-3 text-right pr-4">
          <button class="hover:text-green-600" aria-label="Data da Mensagem">
            <span>
              Data da mensagem
              <i class="fas fa-chevron-down ml-1 text-green-600 text-xs"></i>
            </span>
          </button>
        </div>
      </div>

      <div v-for="email in emailsFiltrados" :key="email.id"
        class="grid grid-cols-12 gap-4 pt-4 pb-4 pl-2 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200"
        @click="viewEmail(email.id)">
        <!-- Remetente -->
        <div class="col-span-4 flex items-center space-x-2 justify-between">
          <div class="flex items-center space-x-2">
            <input type="checkbox" class="h-6 w-6 text-green-600" :value="email.id" v-model="mensagensSelecionadas"
              @click.stop />
            <span :class="{
              'font-semibold': !email.lida,
              'font-normal': email.lida,
              'text-green-700': !email.lida,
            }">
              {{ email.remetente.nome || email.remetente.email }}
            </span>
          </div>
        </div>

        <!-- Assunto -->
        <div class="col-span-5">
          <div :class="{
            'font-semibold': !email.lida,
            'font-normal': email.lida,
            'text-green-700': !email.lida,
          }">
            {{ email.assunto }}
          </div>
        </div>

        <!-- Data -->
        <div class="text-sm col-span-3 text-right pr-4" :class="{
          'font-semibold': !email.lida,
          'font-normal': email.lida,
          'text-green-700': !email.lida,
        }">
          {{ formatarData(email.dataEnvio) }}
        </div>
      </div>
    </div>
  </div>
</template>
