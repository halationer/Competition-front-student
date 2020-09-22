import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: ()=>import('@/components'),
      children: [
          {
            path: '/competitions',
            name: 'Competitions',
            component: () => import('@/components/views/competitions')
          },
          {
            path: '/detail',
            name: 'Detail',
            component: () => import('@/components/views/detail-competition')
          }
          ,
          {
            path: "/form",
            name: "Form",
            component: () => import('@/components/views/form-competition')
          },
          {
            path: "/my-comp",
            name: "MyComp",
            component: () => import('@/components/views/mycomp')
          },
          {
            path: "/my-info",
            name: "MyInfo",
            component: () => import('@/components/views/myinfo')
          },
          {
            path: "/verify",
            name: "Verify",
            component: () => import('@/components/views/verify/pages/1')
          },
          {
            path: "/verify-success",
            name: "ChangeSuccess",
            component: () => import('@/components/views/verify/pages/success')
          }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/views/login')
    }
  ]
})
