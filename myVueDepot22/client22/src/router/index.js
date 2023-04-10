import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/about'
import Test from '@/components/test'
import webAccount from '@/components/webaccount/webaccount'
import balance from '@/components/webaccount/finreport'
import generals from '@/components/webaccount/generaledgers'
import invmain from '@/components/invest/investmain'
import invbal from '@/components/invest/investbal'
import orderlist from '@/components/product/orderlist'
import product from '@/components/product/product'
import users from '@/components/product/users'
import proEdite from '@/components/product/productEdit'
import OrderDetail from '@/components/product/orderdetail.vue'
import orderEnter from '@/components/product/orderenter'

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
    {path: '/investmain', component: invmain},
    {path: '/investbal', component: invbal},
    {path: '/finreport', component: balance},
    {path: '/orderlist', component: orderlist},
    {path: '/product', component: product},
    {path: '/orderenter', component: orderEnter},
    {path: '/user', component: users},
    {path: '/product/:oid', component: product},
    {path: '/proedit', component: proEdite},
    {path: '/proedit/:ptcode', component: proEdite},
    {path: '/order', component: OrderDetail},
    {path: '/order/:oid', component: OrderDetail}
  ]
})
