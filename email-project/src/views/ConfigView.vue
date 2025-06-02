<template>
    <div
        class="flex flex-1 h-full flex-col lg:flex-row bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
        <SidebarOptions :paginaAtual="'configuracoes'" />
        <div class="flex flex-col flex-1 justify-start p-6">
            <h1 class="text-4xl font-bold text-green-600 dark:text-green-400 pt-5 pb-5">Configurações</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Redefinir Senha -->
                <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Redefinir Senha</h2>
                    <form @submit.prevent="redefinirSenha">
                        <div class="mb-4">
                            <label for="senhaAtual"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha Atual
                                *</label>
                            <input type="password" id="senhaAtual" v-model="formSenha.senhaAtual"
                                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" required />
                        </div>

                        <div class="mb-4">
                            <label for="novaSenha"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nova Senha *</label>
                            <input type="password" id="novaSenha" v-model="formSenha.novaSenha"
                                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" required />
                        </div>

                        <div class="mb-6">
                            <label for="confirmarSenha"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Nova Senha
                                *</label>
                            <input type="password" id="confirmarSenha" v-model="formSenha.confirmarSenha"
                                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" required />
                        </div>

                        <button type="submit"
                            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            :disabled="loadingSenha">
                            {{ loadingSenha ? 'Redefinindo...' : 'Redefinir Senha' }}
                        </button>
                    </form>
                </div>

                <!-- E-mail de Recuperação -->
                <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">E-mail de Recuperação</h2>
                    <form @submit.prevent="atualizarEmailRecuperacao">
                        <div class="mb-6">
                            <label for="emailRecuperacao"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">E-mail de Recuperação
                                *</label>
                            <input type="email" id="emailRecuperacao" v-model="formEmail.emailRecuperacao"
                                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                                placeholder="exemplo@dominio.com" required />
                        </div>

                        <button type="submit"
                            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            :disabled="loadingEmail">
                            {{ loadingEmail ? 'Atualizando...' : 'Atualizar E-mail' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarOptions from '@/components/SidebarOptions.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'ConfigView',
    components: {
        SidebarOptions,
    },
    data() {
        return {
            formSenha: {
                senhaAtual: '',
                novaSenha: '',
                confirmarSenha: '',
            },
            formEmail: {
                emailRecuperacao: '',
            },
            loadingSenha: false,
            loadingEmail: false,
        };
    },
    methods: {
        async redefinirSenha() {
            if (this.formSenha.novaSenha !== this.formSenha.confirmarSenha) {
                await Swal.fire({
                    icon: 'warning',
                    title: 'Senhas não coincidem',
                    text: 'A nova senha e a confirmação não são iguais.',
                });
                return;
            }

            if (this.formSenha.novaSenha.length < 6) {
                await Swal.fire({
                    icon: 'warning',
                    title: 'Senha muito curta',
                    text: 'A nova senha deve ter no mínimo 6 caracteres.',
                });
                return;
            }

            this.loadingSenha = true;
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/usuarios/redefinir-senha',
                    {
                        senhaAtual: this.formSenha.senhaAtual,
                        novaSenha: this.formSenha.novaSenha,
                    },
                    { withCredentials: true }
                );

                await Swal.fire({
                    icon: 'success',
                    title: 'Senha atualizada!',
                    text: response.data.message || 'Sua senha foi redefinida com sucesso.',
                });

                this.formSenha = {
                    senhaAtual: '',
                    novaSenha: '',
                    confirmarSenha: '',
                };
            } catch (error) {
                console.error('Erro ao redefinir senha:', error);
                const errorMessage =
                    error.response?.data?.message || 'Não foi possível redefinir sua senha.';
                await Swal.fire({
                    icon: 'error',
                    title: 'Erro ao redefinir senha',
                    text: errorMessage,
                });
            } finally {
                this.loadingSenha = false;
            }
        },

        async atualizarEmailRecuperacao() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.formEmail.emailRecuperacao)) {
                await Swal.fire({
                    icon: 'warning',
                    title: 'E-mail inválido',
                    text: 'Por favor, insira um e-mail válido.',
                });
                return;
            }

            this.loadingEmail = true;
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/usuarios/atualizar-email-recuperacao',
                    {
                        emailRecuperacao: this.formEmail.emailRecuperacao,
                    },
                    { withCredentials: true }
                );

                await Swal.fire({
                    icon: 'success',
                    title: 'E-mail atualizado!',
                    text: response.data.message || 'Seu e-mail de recuperação foi salvo com sucesso.',
                });

                this.formEmail.emailRecuperacao = '';
            } catch (error) {
                console.error('Erro ao atualizar e-mail de recuperação:', error);
                const errorMessage =
                    error.response?.data?.message || 'Erro ao atualizar o e-mail de recuperação.';
                await Swal.fire({
                    icon: 'error',
                    title: 'Erro na atualização',
                    text: errorMessage,
                });
            } finally {
                this.loadingEmail = false;
            }
        },
    },
};
</script>

<style scoped>
@media (max-width: 640px) {
    .grid-cols-2 {
        grid-template-columns: 1fr;
    }
}
</style>
