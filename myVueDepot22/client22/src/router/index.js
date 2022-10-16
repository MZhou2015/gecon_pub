import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/about'
import webAccount from '@/components/webaccount/webaccount'
import generalEntry from '@/components/webaccount/generalentry'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {path: '/about', component: About},
    {path: '/webacc', component: webAccount},
    {path: '/generalentry', component: generalEntry}
  ]
})
