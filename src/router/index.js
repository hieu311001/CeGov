import { createRouter, createWebHistory } from 'vue-router'
import EmulationPage from '@/view/Emulation/EmulationPage.vue';
import HomePage from '@/view/Home/HomePage.vue';

const routes = [
  {
    path: '/',
    name:  'home',
    component: HomePage
  },
  {
    path: '/emulation',
    name: 'emulation',
    component: EmulationPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router