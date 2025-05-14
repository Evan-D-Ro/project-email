import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import InboxView from '../views/InboxView.vue'
import axiosInstance from "../services/axiosInstance.js"

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/inbox',
    name: 'inbox',
    component: InboxView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach(async (to, from, next) => {
  try {
    // Faz uma requisição para checar se o usuário está autenticado
    await axiosInstance.get('/api/inbox', { withCredentials: true });

    // Se a rota for "/", redireciona para inbox
    if (to.path === '/') {
      return next('/inbox');
    }

    // Está autenticado, pode seguir
    return next();

  } catch (error) {
    // Não está autenticado
    if (to.path === '/inbox') {
      return next('/');
    }

    // Permitido continuar (ex: rota de login)
    return next();
  }
});

export default router
