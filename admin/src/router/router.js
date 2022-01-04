import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import BookEdit from '../views/BookEdit.vue'
import BookList from '../views/BookList.vue'
import UserEdit from '../views/UserEdit.vue'
import UserList from '../views/UserList.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryLIst from '../views/CategoryList.vue'
import Login from '../views/Login.vue'
import MyCollect from '../views/MyCollect.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/books/create', component: BookEdit },
      { path: '/books/edit/:id', component: BookEdit, props: true },
      { path: '/books/list', component: BookList },

      { path: '/users/create', component: UserEdit },
      { path: '/users/edit/:id', component: UserEdit, props: true },
      { path: '/users/list', component: UserList },

      { path: '/category/create', component: CategoryEdit },
      { path: '/category/edit/:id', component: CategoryEdit, props: true },
      { path: '/category/list', component: CategoryLIst },

      { path: '/mycollect', component: MyCollect },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
