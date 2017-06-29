import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        path: '/list/all'
      }
    },
    {
      path: '/list/:type',
      name: 'home',
      component: (resolve) => {
        resolve(require('@/components/home'))
      }
    },
    {
      path: '/article/:articleId',
      name: 'articleDetail',
      component: (resolve) => {
        resolve(require('@/components/articleDetail'))
      }
    },
    {
      path: '/user',
      name: 'user',
      component: (resolve) => {
        resolve(require('@/components/user'))
      }
    },
    {
      path: '/userPage/:id',
      name: 'userPage',
      component: (resolve) => {
        resolve(require('@/components/userPage'))
      }
    }
  ]
})
