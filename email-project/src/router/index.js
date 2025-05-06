import { createRouter, createWebHashHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import InboxView from '../views/InboxView.vue'
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
  history: createWebHashHistory(),
  routes
})

export default router
