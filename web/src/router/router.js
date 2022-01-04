import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import Collection from '../views/Collection.vue'
import Book from '../views/Book.vue'
import UploadBook from '../views/UploadBook.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/:id',
    name: 'main',
    component: Main,
    props: true
  },
  {
    path: '/personalcenter/:id',
    component: PersonalCenter,
    props: true
  },
  {
    path: '/collection/:id',
    component: Collection,
    props: true
  },
  {
    path: '/book/:id',
    component: Book,
    props: true
  },
  {
    path: '/uploadbook/:id',
    component: UploadBook,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
