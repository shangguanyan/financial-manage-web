import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    route("/login","/Login"),
    {
      path: '/',
      component: () => import('../pages/Layout'),
      children: [

      ]
    }
  ]
})
