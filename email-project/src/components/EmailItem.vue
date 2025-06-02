<template>
  <div
    class="grid grid-cols-12 gap-4 pt-4 pb-4 pl-2 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <!-- Remetente -->
    <div class="col-span-4 flex items-center space-x-2">
      <span :class="{
        'font-semibold': !email.lida,
        'font-normal': email.lida,
        'text-green-700': !email.lida,
      }">
        Remetente: {{ email.remetente.nome || email.remetente.email }}
      </span>
    </div>
    <!-- Assunto -->
    <div class="col-span-5">
      <div :class="{
        'font-semibold': !email.lida,
        'font-normal': email.lida,
        'text-green-700': !email.lida,
      }">
        Assunto: {{ email.assunto }}
      </div>
    </div>
    <!-- Data -->
    <div class="text-sm col-span-3 text-right pr-4" :class="{
      'font-semibold': !email.lida,
      'font-normal': email.lida,
      'text-green-700': !email.lida,
    }">
      Data: {{ formatarData(email.dataEnvio) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailItem',
  props: {
    email: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
  },
};
</script>