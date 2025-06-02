<template>
  <div
    class="p-6 bg-white dark:bg-gray-800 rounded shadow text-gray-900 dark:text-gray-100 flex flex-1 flex-col h-full justify-center">
    <h2 class="text-2xl mb-4 font-bold text-green-600 dark:text-green-400">Novo Email</h2>
    <form @submit.prevent="handleSend">
      <div class="mb-4">
        <label class="block mb-1">Para:</label>
        <div
          class="flex flex-wrap items-center gap-2 border p-2 rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
          <!-- Chips de e-mails -->
          <span v-for="(email, index) in emails" :key="index"
            class="bg-green-200 text-green-800 px-2 py-1 rounded flex items-center">
            {{ email }}
            <button @click="removeEmail(index)" class="ml-2 text-red-600 font-bold">×</button>
          </span>

          <!-- Campo de entrada -->
          <input v-model="emailInput" @keydown="handleKeydown" type="text"
            placeholder="Digite um e-mail e pressione Enter"
            class="flex-grow border-none outline-none bg-transparent dark:text-white" />
        </div>
      </div>
      <div class="mb-4">
        <label class="block mb-1">Assunto:</label>
        <input v-model="assunto" type="text"
          class="w-full p-2 border rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">Mensagem:</label>
        <textarea v-model="mensagem"
          class="w-full p-2 border rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          rows="6"></textarea>
      </div>
      <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
        Enviar
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'NewEmailForm',
  data() {
    return {
      emails: [],
      emailInput: '',
      assunto: '',
      mensagem: '',
    };
  },
  methods: {
    addEmail() {
      const email = this.emailInput.trim().toLowerCase();
      const isValidEmail = email.includes('@') && email.includes('.com');

      if (email && isValidEmail && !this.emails.includes(email)) {
        this.emails.push(email);
        this.emailInput = '';
      }
    },
    removeEmail(index) {
      this.emails.splice(index, 1);
    },
    handleKeydown(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.addEmail();
      } else if (e.key === 'Backspace' && this.emailInput === '') {
        this.emails.pop();
      }
    },
    async handleSend() {
      // Validate inputs
      if (!this.emails.length) {
        await Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Adicione pelo menos um destinatário.',
        });
        return;
      }
      if (!this.assunto.trim()) {
        await Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'O assunto é obrigatório.',
        });
        return;
      }
      if (!this.mensagem.trim()) {
        await Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'A mensagem é obrigatória.',
        });
        return;
      }
      try {
        // Send POST request
        const response = await axios.post(
          'http://localhost:3000/api/mensagens/enviar-mensagem',
          {
            destinatarios: this.emails,
            assunto: this.assunto,
            mensagem: this.mensagem,
          },
          {
            withCredentials: true, // Include CookieAuth
          }
        );
        if (response) {
          console.log("ok");
        }
        // Show success alert and redirect
        await Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Mensagem enviada com sucesso!',
        });
        this.$router.push('/inbox');
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        // Extract the error message from the API response, if available
        const errorMessage = error.response?.data?.message || 'Erro ao enviar mensagem. Tente novamente.';
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