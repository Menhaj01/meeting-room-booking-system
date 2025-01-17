import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RoomView from '../views/RoomView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: RoomView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
