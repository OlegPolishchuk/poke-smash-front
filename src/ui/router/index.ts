import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../views/StatisticView.vue'),
      redirect: { name: 'all' },
      children: [
        {
          path: 'all',
          name: 'all',
          component: () => import('../components/pokemon-lists/pokemon-list-all.vue'),
        },
        {
          path: 'top-ten',
          name: 'top-ten',
          component: () => import('../components/pokemon-lists/pokemon-list-top-ten.vue'),
        },
      ],
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: () => import('../views/PokemonView.vue'),
    },
  ],
});

export default router;
