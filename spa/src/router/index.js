import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/List'
import article from '@/components/Article'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list/:tag?',
      alias: '/',
      component: list
    },
    {
      path: '/article/:id',
      component: article
    }
  ]
})
