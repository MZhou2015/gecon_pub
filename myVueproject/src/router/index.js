import Vue from 'vue'
import Router from 'vue-router'
import catalog from '@/components/catalog'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: catalog
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
