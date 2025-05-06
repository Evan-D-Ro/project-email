<template>
    <div>
      <!-- Cabeçalhos (somente visíveis em telas médias ou maiores) -->
      <div class="grid grid-cols-12 gap-4 p-4 border-t border-b border-gray-300 dark:border-gray-700 font-semibold text-gray-600 dark:text-gray-300 hidden md:grid bg-white dark:bg-gray-900">
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
  
      <!-- Lista de Emails -->
      <div
        v-for="(email, index) in emails"
        :key="index"
        class="grid grid-cols-12 gap-4 p-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      >
        <!-- Remetente e data -->
        <div class="col-span-4 flex items-center space-x-2 justify-between">
          <div class="flex items-center space-x-2">
            <input type="checkbox" class="h-6 w-6 text-green-600" />
            <span class="font-semibold">{{ email.sender }}</span>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ email.date }}
          </div>
        </div>
  
        <!-- Assunto -->
        <div class="col-span-5">
          <div class="font-semibold">{{ email.subject }}</div>
        </div>
      </div>
  
      <!-- Paginação -->
      <div class="flex items-center space-x-2 p-4 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
        <span class="text-sm">Exibir 10 • 1 até 1 de 1 registros</span>
        <button class="text-green-600 hover:text-green-800">
          <i class="fas fa-chevron-left fa-lg"></i>
        </button>
        <button class="text-green-600 hover:text-green-800">
          <i class="fas fa-chevron-right fa-lg"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "EmailList",
    data() {
      return {
        emails: [
          {
            sender: "Ministério da Gestão",
            subject: "Essa é a sua nova Caixa Postal do GOV.BR",
            date: "22/04/2025",
          },
          {
            sender: "Secretaria de Educação",
            subject: "Novas atualizações sobre o curso",
            date: "21/04/2025",
          },
          {
            sender: "Departamento de TI",
            subject: "Aviso de manutenção programada",
            date: "20/04/2025",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Mantido o estilo responsivo */
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
  