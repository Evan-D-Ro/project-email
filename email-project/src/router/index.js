import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import ArquivadasView from '../views/ArquivadasView.vue'
import EnviadasView from '../views/EnviadasView.vue'
import ExcluidasView from '../views/ExcluidasView.vue'
import FavoritasView from '../views/FavoritasView.vue'
import InboxView from '../views/InboxView.vue'
import EmailView from '../views/EmailView.vue'
import ConfigView from '../views/ConfigView.vue'
import AjudaView from '../views/AjudaView.vue'

import axiosInstance from "../services/axiosInstance.js"

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Entrar - VueMail',
      public: true
    }
  },
  {
    path: '/config',
    name: 'config',
    component: ConfigView,
    meta: {
      title: 'Configurações',
      public: false
    }
  },
  {
    path: '/ajuda',
    name: 'ajuda',
    component: AjudaView,
    meta: {
      title: 'Ajuda',
      public: false
    }
  },
  {
    path: '/inbox',
    name: 'inbox',
    component: InboxView,
    meta: {
      title: 'Caixa de Entrada',
      public: false
    }
  },
  {
    path: '/inbox/mensagem/:id',
    name: 'inboxMessage',
    component: EmailView,
    meta: { title: 'Visualização - Email', public: false },
  },
  {
    path: '/inbox/favoritos',
    name: 'favoritos',
    component: FavoritasView,
    meta: {
      title: 'Favoritos',
      public: false
    }
  },
  {
    path: '/inbox/arquivados',
    name: 'arquivados',
    component: ArquivadasView,
    meta: {
      title: 'Arquivados',
      public: false
    }
  },
  {
    path: '/inbox/enviados',
    name: 'enviados',
    component: EnviadasView,
    meta: {
      title: 'Enviados',
      public: false
    }
  },
  {
    path: '/inbox/excluidos',
    name: 'excluidos',
    component: ExcluidasView,
    meta: {
      title: 'Excluídos',
      public: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'VueMail';

  const isPublicRoute = to.meta.public === true;

  try {
    // Verifica se está autenticado
    await axiosInstance.get('/api/inbox', { withCredentials: true });

    // Se está autenticado e indo para login, redireciona para inbox
    if (isPublicRoute && to.path === '/') {
      return next('/inbox');
    }

    return next();
  } catch (error) {
    // Se não autenticado e tentando acessar rota protegida, volta para login
    if (!isPublicRoute) {
      console.warn('Usuário não autenticado');
      return next('/');
    }

    // Se for pública, segue
    return next();
  }
});

export default router
