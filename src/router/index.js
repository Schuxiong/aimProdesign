import { createRouter, createWebHistory } from 'vue-router'
import CustomerGroup from '../views/CustomerGroup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/customer-group'
    },
    {
      path: '/customer-group',
      name: 'customerGroup',
      component: CustomerGroup
    }
    // ... 其他路由
  ]
})

export default router 