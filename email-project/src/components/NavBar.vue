<script>
import axiosInstance from "../services/axiosInstance.js"

export default {
    name: "NavBar",
    props: {
        isDarkMode: Boolean,
        mostrarUsuario: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isDropdownOpen: false,
            usuario: null  // Aqui vai guardar o objeto do usuário
        };
    },

    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        async logout() {
            this.isDropdownOpen = false;
            try {
                await axiosInstance.post('/api/logout', {}, {
                    withCredentials: true // permite o envio de cookies
                });
                this.usuario = null; // limpa dados no logout
                this.$router.push("/");
            } catch (error) {
                console.error("Erro ao fazer logout:", error);
            }
        },
        async buscarUsuario() {
            try {
                const res = await axiosInstance.get('/api/usuario', { withCredentials: true });
                this.usuario = res.data;
            } catch (error) {
                console.log("Usuário não autenticado");
                this.usuario = null;
            }
        }
    },
    mounted() {
        this.buscarUsuario();
    }
};
</script>
<template>
    <nav
        :class="['flex items-center p-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700', mostrarUsuario ? 'justify-between' : 'justify-center']">
        <!-- Logo -->
        <div class="flex items-center">
            <img src="@/assets/logo.png" alt="Logo" class="h-12" />
            <span class="text-green-600 dark:text-green-400 font-semibold">VUE MAIL</span>
        </div>

        <!-- Centro opcional -->
        <div>
            <span class="text-green-600 font-semibold hidden">LINGUAGENS DE PROGRAMAÇÃO II</span>
        </div>

        <!-- Perfil do usuário, visível apenas se mostrarUsuario for true e usuário existir -->
        <div class="flex items-center space-x-4 mr-2" v-if="mostrarUsuario && usuario">
            <div class="relative">
                <button @click="toggleDropdown" class="flex items-center space-x-2 focus:outline-none">
                    <div class="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                        <span class="text-sm">{{ usuario.nome.charAt(0).toUpperCase() }}</span>
                    </div>
                    <span class="text-gray-700 dark:text-gray-200">Olá,</span>
                    <span class="text-green-600 dark:text-green-400 font-semibold">
                        {{ usuario.nome.split(' ')[0].toUpperCase() }} <i class="fas fa-caret-down"
                            aria-hidden="true"></i>
                    </span>
                </button>

                <!-- Dropdown -->
                <div v-if="isDropdownOpen"
                    class="absolute mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
                    <button @click="$emit('toggle-dark-mode')"
                        class="block w-full text-left px-4 py-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span>{{ isDarkMode ? 'Modo Claro ( ' : 'Modo Noturno ( ' }}</span>
                        <i class="fas" :class="isDarkMode ? 'fa-sun' : 'fa-moon'"></i>
                        <span> )</span>
                    </button>
                    <button @click="logout"
                        class="block w-full text-left px-4 py-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Sair
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>
