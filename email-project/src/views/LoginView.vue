<template>
  <div class="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm
  }
};
</script>