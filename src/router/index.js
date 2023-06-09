import { createRouter, createWebHistory } from 'vue-router'
import EmulationPage from '@/components/view/Emulation/EmulationPage.vue';
import HomePage from '@/components/view/Home/HomePage.vue';

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
  routes,
})

export default router