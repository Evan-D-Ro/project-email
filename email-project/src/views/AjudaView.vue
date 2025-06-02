<template>
    <div
        class="flex flex-1 h-full flex-col lg:flex-row bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
        <SidebarOptions :paginaAtual="'ajuda'" />
        <div class="flex flex-col flex-1 p-6 overflow-y-auto">
            <h1 class="text-4xl font-bold text-green-600 dark:text-green-400 pt-5 pb-5">
                Ajuda e Suporte
            </h1>
            <div class="space-y-8">
                <!-- Sobre o Projeto -->
                <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <i class="fas fa-info-circle mr-2 text-green-600"></i>
                        Sobre o Projeto
                    </h2>
                    <p class="text-gray-700 dark:text-gray-300">
                        Bem-vindo ao <strong>Sistema de E-mail Interno</strong>! Nosso projeto é uma plataforma de
                        comunicação, projetada para facilitar a troca de mensagens dentro da sua
                        organização. Com uma interface intuitiva, você pode enviar e receber e-mails, organizar sua
                        caixa de entrada e gerenciar suas configurações de conta com facilidade.
                    </p>
                </div>

                <!-- Funcionalidades Principais -->
                <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <i class="fas fa-list-ul mr-2 text-green-600"></i>
                        Funcionalidades Principais
                    </h2>
                    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li><strong>Caixa de Entrada:</strong> Visualize e gerencie seus e-mails recebidos.</li>
                        <li><strong>Enviar E-mails:</strong> Crie e envie mensagens para outros usuários da organização.
                        </li>
                        <li><strong>Favoritos:</strong> Marque e-mails importantes com uma estrela para fácil acesso.
                        </li>
                        <li><strong>Arquivamento:</strong> Organize e-mails movendo-os para a seção de arquivados.</li>
                        <li><strong>Lixeira:</strong> Mova e-mails indesejados para a lixeira ou exclua permanentemente.
                        </li>
                        <li><strong>Configurações:</strong> Redefina sua senha e cadastre um e-mail de recuperação.</li>
                        <li><strong>Busca:</strong> Encontre e-mails rapidamente com a barra de pesquisa.</li>
                    </ul>
                </div>

                <!-- Como Usar -->
                <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <i class="fas fa-question-circle mr-2 text-green-600"></i>
                        Como Usar
                    </h2>
                    <div class="space-y-4 text-gray-700 dark:text-gray-300">
                        <div>
                            <h3 class="text-lg font-medium">Navegando pelo Sistema</h3>
                            <p>
                                Use a barra lateral à esquerda para acessar a <strong>Caixa de Entrada</strong>,
                                <strong>Favoritos</strong>, <strong>Arquivados</strong>,
                                <strong>Lixeira</strong>, <strong>Configurações</strong> ou esta página de
                                <strong>Ajuda</strong>. Clique em "Novo E-mail" para começar a escrever uma mensagem.
                            </p>
                        </div>
                        <div>
                            <h3 class="text-lg font-medium">Gerenciando E-mails</h3>
                            <p>
                                Na Caixa de Entrada, selecione e-mails usando os checkboxes. Use a barra superior para
                                marcar como favorito (<i class="far fa-star"></i>), arquivar (<i
                                    class="fas fa-archive"></i>), ou mover para a lixeira (<i
                                    class="fas fa-trash"></i>). Na Lixeira, você pode restaurar (<i
                                    class="fas fa-undo"></i>) ou excluir permanentemente.
                            </p>
                        </div>
                        <div>
                            <h3 class="text-lg font-medium">Configurações de Conta</h3>
                            <p>
                                Acesse a página de Configurações para redefinir sua senha ou cadastrar um e-mail de
                                recuperação. Certifique-se de usar uma senha forte e um e-mail válido para recuperação.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Suporte -->
                <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <i class="fas fa-headset mr-2 text-green-600"></i>
                        Suporte
                    </h2>
                    <p class="text-gray-700 dark:text-gray-300">
                        Encontrou um problema ou tem dúvidas? Entre em contato com nossa equipe de suporte pelo e-mail
                        <span class="text-green-600 hover:underline">
                            evandro.acorsi@vuemail.com</span>
                        <span> | </span>
                        <span class="text-green-600 hover:underline">
                            jorge.mateus@vuemail.com</span>.
                        Estamos aqui para ajudar!
                    </p>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarOptions from '@/components/SidebarOptions.vue';

export default {
    name: 'AjudaView',
    components: {
        SidebarOptions,
    },
};
</script>

<style scoped>
@media (max-width: 640px) {
    .p-6 {
        padding: 1rem;
    }
}
</style>