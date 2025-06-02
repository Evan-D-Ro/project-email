<template>
  <div class="flex flex-wrap justify-between items-center mb-4 pl-2">
    <!-- Left Side: Checkbox and Icons -->
    <div class="flex items-center space-x-8 flex-wrap sm:space-x-8 mb-2 sm:mb-0">
      <input type="checkbox" class="h-6 w-6 text-green-600" @change="$emit('selecionar-todos', $event.target.checked)"
        title="Selecionar todos" />
      <button class="text-green-600 hover:text-green-800" aria-label="Favoritar" title="Favoritar"
        v-if="page !== 'excluidas'" @click="$emit('favoritar')">
        <i class="far fa-star fa-md"></i>
      </button>
      <button class="text-green-600 hover:text-green-800" title="Arquivar" @click="$emit('arquivar')"
        v-if="page !== 'excluidas'">
        <i class="fas fa-archive fa-md"></i>
      </button>
      <button class="text-green-600 hover:text-green-800"
        :title="page === 'excluidas' ? 'Excluir Permanentemente' : 'Excluir'"
        @click="$emit(page === 'excluidas' ? 'excluir-permanente' : 'excluir')">
        <i class="fas fa-trash fa-md"></i>
      </button>

      <!-- Botão Restaurar (somente se estiver na página de excluídas) -->
      <button v-if="page === 'excluidas'" class="text-green-600 hover:text-green-800" @click="$emit('restaurar')"
        title="Restaurar">
        <i class="fas fa-undo fa-md"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopbarOptions',
  props: {
    page: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  .sm\:space-x-4 {
    space-x: 2px;
  }
}
</style>