<script>
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, maxLength } from '@vuelidate/validators'
import axiosInstance from '../services/axiosInstance.js'
import Swal from 'sweetalert2'

export default {
  name: 'LoginForm',
  setup() {
    const emailLogin = ref('')
    const senhaLogin = ref('')
    const showModal = ref(false)

    const nomeCadastro = ref('')
    const emailCadastro = ref('')
    const emailRecuperacao = ref('')
    const senhaCadastro = ref('')
    const confirmacaoSenhaCadastro = ref('')

    const state = {
      nomeCadastro,
      emailCadastro,
      emailRecuperacao,
      senhaCadastro,
      confirmacaoSenhaCadastro
    }


    const emailCorporativo = (value) => {
      return !value || value.endsWith('@vuemail.com')
    }

    const somenteLetras = (value) => {
      return /^[A-Za-zÀ-ú\s]+$/.test(value)
    }

    const senhaForte = value => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(value)
    }


    const rules = {
      nomeCadastro: { required, minLength: minLength(3), maxLength: maxLength(50), somenteLetras },
      emailCadastro: {
        required,
        email,
        maxLength: maxLength(100),
        emailCorporativo // aqui entra a nova validação
      },
      emailRecuperacao: { email, maxLength: maxLength(100), },
      senhaCadastro: { required, minLength: minLength(6), maxLength: maxLength(30), senhaForte },
      confirmacaoSenhaCadastro: {
        required,
        sameAsSenha: sameAs(senhaCadastro)
      }
    }

    const v$ = useVuelidate(rules, state)

    const handleLogin = async () => {
      try {
        await axiosInstance.post(
          '/api/autenticar',
          {
            email: emailLogin.value,
            senha: senhaLogin.value
          },
          {
            withCredentials: true
          }
        )
        window.location.href = '/inbox'
      } catch (error) {
        console.error('Erro ao fazer login:', error)
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Usuário ou senha inválidos',
          confirmButtonColor: '#dc2626',
        })
      }
    }

    const resetForm = () => {
      nomeCadastro.value = ''
      emailCadastro.value = ''
      emailRecuperacao.value = ''
      senhaCadastro.value = ''
      confirmacaoSenhaCadastro.value = ''
      v$.value.$reset()
    }


    const handleCadastro = async () => {
      v$.value.$touch()

      if (!v$.value.$invalid) {
        try {
          await axiosInstance.post('/api/usuarios', {
            nome: nomeCadastro.value,
            email: emailCadastro.value,
            emailRecuperacao: emailRecuperacao.value,
            senha: senhaCadastro.value
          })
          Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado!',
            text: 'Sua conta foi criada com sucesso.',
            confirmButtonColor: '#16a34a', // verde
          })
          resetForm()
          showModal.value = false
        } catch (error) {
          console.error('Erro ao cadastrar:', error)
          Swal.fire({
            icon: 'error',
            title: 'Erro ao cadastrar',
            text: 'Tente novamente.',
            confirmButtonColor: '#dc2626',
          })

        }
      }
    }

    return {
      emailLogin,
      senhaLogin,
      showModal,
      nomeCadastro,
      emailCadastro,
      emailRecuperacao,
      senhaCadastro,
      confirmacaoSenhaCadastro,
      handleLogin,
      handleCadastro,
      v$,
      resetForm
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-900 p-2 w-full max-w-md">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Entrar</h2>
      <h4 class=" text-center text-gray-800 dark:text-white mb-6">Entre com sua conta @vuemail.</h4>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="emailLogin" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input v-model="emailLogin" type="email" id="emailLogin" placeholder="example@vuemail.com"
            class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" required />
        </div>
        <div class="mb-6">
          <label for="senhaLogin" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
          <input v-model="senhaLogin" type="password" id="senhaLogin"
            class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" required />
        </div>
        <button type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200">Entrar</button>
      </form>
      <p class="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
        Não tem uma conta?
        <button @click="showModal = true" class="text-green-600 hover:underline ml-1">Cadastre-se</button>
      </p>
      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md relative">
          <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Criar Conta</h3>
          <form @submit.prevent="handleCadastro">
            <div class="mb-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome:*</label>
              <input v-model="nomeCadastro" type="text"
                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" maxlength="50" />
              <p v-if="v$.nomeCadastro.$error" class="text-red-500 text-sm">
                <span v-if="v$.nomeCadastro.required.$invalid">Campo obrigatório</span>
                <span v-else-if="v$.nomeCadastro.minLength.$invalid">Mínimo 3 caracteres</span>
                <span v-else-if="v$.nomeCadastro.maxLength.$invalid">Máximo 50 caracteres</span>
                <span v-else-if="v$.nomeCadastro.somenteLetras.$invalid">Somente letras e espaços são permitidos</span>
              </p>
            </div>

            <div class="mb-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email:*</label>
              <input v-model="emailCadastro" type="email" placeholder="example@vuemail.com"
                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
              <p v-if="v$.emailCadastro.$error" class="text-red-500 text-sm">
                <span v-if="v$.emailCadastro.required.$invalid">Campo obrigatório</span>
                <span v-else-if="v$.emailCadastro.email.$invalid">Email inválido</span>
                <span v-else-if="v$.emailCadastro.emailCorporativo.$invalid">
                  O e-mail deve terminar com @vuemail.com
                </span>
              </p>
            </div>


            <div class="mb-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email de Recuperação
                (Opcional):</label>
              <input v-model="emailRecuperacao" type="email"
                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
              <p v-if="v$.emailRecuperacao.$error" class="text-red-500 text-sm">
                <span v-if="v$.emailRecuperacao.email.$invalid">Email inválido</span>
              </p>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha:*</label>
              <input v-model="senhaCadastro" type="password"
                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
              <p v-if="v$.senhaCadastro.$error" class="text-red-500 text-sm">
                <span v-if="v$.senhaCadastro.required.$invalid">Campo obrigatório</span>
                <span v-else-if="v$.senhaCadastro.minLength.$invalid">Mínimo 6 caracteres</span>
                <span v-if="v$.senhaCadastro.senhaForte.$invalid">
                  Senha deve conter maiúscula, minúscula, número e caractere especial
                </span>
              </p>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirme sua
                senha:*</label>
              <input v-model="confirmacaoSenhaCadastro" type="password"
                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
              <p v-if="v$.confirmacaoSenhaCadastro.$error" class="text-red-500 text-sm">
                <span v-if="v$.confirmacaoSenhaCadastro.required.$invalid">Campo obrigatório</span>
                <span v-else-if="v$.confirmacaoSenhaCadastro.sameAsSenha.$invalid">As senhas não coincidem</span>
              </p>
            </div>

            <div class="flex justify-between">
              <button type="button" @click="() => { showModal = false; resetForm() }"
                class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Cancelar
              </button>
              <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
