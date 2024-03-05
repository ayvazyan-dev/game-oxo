import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'gameOXO',
      component: () => import('@/views/GameOXO.vue')
    },
  ]
})

export default router
