import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function route (path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: () => import('../pages' + file)
  }
}

export default new Router({
  routes: [
    route("/login","/Login"),
    {
      path: '/',
      component: () => import('../pages/Layout'),
      children: [
        route("/goods/category","/goods/Category","Category"),
        route("/goods/brand","/goods/Brand","Brand")
      ]
    }
  ]
})
