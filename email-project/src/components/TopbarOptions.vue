<template>
    <div class="flex flex-wrap justify-between items-center mb-4">
      <!-- Left Side: Checkbox and Icons -->
      <div class="flex items-center space-x-8 flex-wrap sm:space-x-8 mb-2 sm:mb-0">
        <input type="checkbox" class="h-6 w-6 text-green-600" />
        <button class="text-green-600 hover:text-green-600" aria-label="Favoritar">
          <i class="far fa-star fa-md"></i>
        </button>
        <button class="text-green-600 hover:text-green-600">
          <i class="fas fa-archive fa-md"></i>
        </button>
        <button class="text-green-600 hover:text-green-600">
          <i class="fas fa-trash fa-md"></i>
        </button>
        <button class="text-green-600 hover:text-green-600">
          <i class="fas fa-envelope fa-md"></i>
        </button>
      </div>
  

    </div>
  </template>
  
  <script>
  export default {
    name: "TopbarOptions",
  };
  </script>
  
  <style scoped>
  /* Adicionando um pouco de estilo para garantir que o layout se adapte bem no celular */
  @media (max-width: 640px) {
    .sm\:space-x-4 {
      space-x: 2px; /* Reduzir o espaçamento em dispositivos móveis */
    }
  }
  </style>
  