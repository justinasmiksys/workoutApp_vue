import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

import ExerciseList from '../views/ExerciseList'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/exerciselist',
    name: 'ExerciseList',
    component: ExerciseList,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
