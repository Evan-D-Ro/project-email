<template>
    <div class="flex h-full bg-gray-100 dark:bg-gray-900 flex-1">
        <!-- Sidebar -->
        <div>
            <SidebarOptions @novo-email="mostrarFormularioEmail" @voltar-caixa="ocultarFormularioEmail"
                :paginaAtual="'inbox'" />
        </div>
        <div class="flex-1 flex flex-col overflow-hidden">
            <div v-if="!mostrarFormulario"
                class="p-6 bg-white dark:bg-gray-800 rounded shadow text-gray-900 dark:text-gray-100 flex flex-1 flex-col">
                <!-- Indicador de carregamento -->
                <div v-if="loading" class="text-center p-4 text-gray-600 dark:text-gray-300">
                    Carregando mensagem...
                </div>
                <!-- Erro -->
                <div v-else-if="error" class="text-center p-4 text-red-600 dark:text-red-400">
                    {{ error }}
                </div>
                <!-- Conteúdo da mensagem -->
                <div v-else-if="email" class="space-y-4">
                    <button @click="$router.push('/inbox')"
                        class="mb-4 text-green-600 hover:text-green-800 flex items-center">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar para Caixa de Entrada
                    </button>
                    <!-- Renderiza EmailItem para resumo -->
                    <email-item :email="email" class="hidden md:block" /> <!-- Conteúdo completo da mensagem -->
                    <div class="border-t border-gray-300 dark:border-gray-700 pt-4">
                        <h2 class="text-xl font-semibold text-green-600 dark:text-green-400">
                            Assunto: {{ email.assunto }}
                        </h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            De: {{ email.remetente.nome || email.remetente.email }} ({{
                                email.remetente.email
                            }})
                        </p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Para:
                            {{email.destinatarios.map((d) => d.nome || d.email).join(', ')}}
                        </p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Data: {{ formatarData(email.dataEnvio) }}
                        </p>
                        <div class="mt-4 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                            {{ email.mensagem }}
                        </div>
                    </div>
                </div>
                <div v-else class="text-center p-4 text-gray-600 dark:text-gray-300">
                    Mensagem não encontrada.
                </div>
            </div>
            <div v-if="mostrarFormulario" class="h-full flex flex-1">
                <NewEmailForm />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import EmailItem from '@/components/EmailItem.vue'; // Adjust path as needed
import SidebarOptions from '@/components/SidebarOptions.vue';
import NewEmailForm from '../components/NewEmailForm.vue';

export default {
    name: 'EmailView',
    components: {
        EmailItem,
        SidebarOptions,
        NewEmailForm,

    },
    data() {
        return {
            email: null,
            loading: false,
            error: null,
            mostrarFormulario: false,

        };
    },
    methods: {
        async fetchEmail() {
            const id = this.$route.params.id;
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/mensagens/${id}`,
                    {
                        withCredentials: true, // Envia cookies HttpOnly
                    }
                );
                this.email = response.data;
            } catch (error) {
                console.error('Erro ao buscar mensagem:', error);
                const errorMessage =
                    error.response?.data?.message || 'Erro ao carregar mensagem.';
                this.error = errorMessage;
                await Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: errorMessage,
                });
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
        mostrarFormularioEmail() {
            this.mostrarFormulario = true;
        },
        ocultarFormularioEmail() {
            this.mostrarFormulario = false;
        },
    },
    mounted() {
        this.fetchEmail();
    },
};
</script>