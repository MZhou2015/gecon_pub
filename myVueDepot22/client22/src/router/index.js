import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/about'
import Test from '@/components/test'
import webAccount from '@/components/webaccount/webaccount'
import balance from '@/components/webaccount/finreport'
import generals from '@/components/webaccount/generaledgers'
import orderlist from '@/components/product/orderlist'
import product from '@/components/product/product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {path: '/about', component: About},
    {path: '/test', component: Test},
    {path: '/webacc', component: webAccount},
    {path: '/generals', component: generals},
    {path: '/generals/:pid', component: generals},
    {path: '/finreport', component: balance},
    {path: '/orderlist', component: orderlist},
    {path: '/product', component: product}
  ]
})
