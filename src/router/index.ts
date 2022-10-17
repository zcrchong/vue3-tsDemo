import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },{
    path: '/index',
    name: 'index',
    component: () => import('../views/IndexView.vue'),
    redirect:'index/goods',
    children:[
      {
        path: 'goods',
        name: 'goods',
        meta:{
          isShow:true,
          title:"商品列表"
        },
        component: () => import('../views/GoodsView.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta:{
          isShow:true,
          title:'用户列表'
        },
        component: () => import('../views/UserView.vue')
      },
      {
        path: 'role',
        name: 'role',
        meta:{
          isShow:true,
          title:'角色列表'
        },
        props:true,
        component: () => import('../views/RoleView.vue')
      },
      {
        path: 'authority',
        name: 'authority',
        meta:{
          isShow:false,
          title:'权限列表'
        },
        component: () => import('../views/AuthorityView.vue')
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//路由守卫
router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem('token')
  if (!token && to.path !== '/login'){
    next('/login')

  }else{
    next()
  }
}
)
export default router
