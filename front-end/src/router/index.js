import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '导航', icon: 'dashboard' }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/manage',
    name: 'Manage',
    component: Layout,
    redirect: '/manage/movie',
    meta: {
      title: '影院管理',
      icon: 'manage',
      roles: ['admin']
    },
    children: [
      {
        path: 'movie',
        name: 'ManageMovie',
        component: () => import('@/views/manage/movie/index'),
        meta: { title: '电影管理', icon: 'movie', affix: true }
      },
      {
        path: 'schedule',
        name: 'ManageSchedule',
        component: () => import('@/views/manage/schedule/index'),
        meta: { title: '排片管理', icon: 'schedule', affix: true }
      }
    ]
  },

  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/index',
    children: [
      {
        path: 'index',
        name: 'Statistics',
        component: () => import('@/views/statistics/index'),
        meta: { title: '信息统计', icon: 'statistics', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/movie',
    component: Layout,
    redirect: '/movie/index',
    children: [
      {
        path: 'index',
        name: 'Movie',
        component: () => import('@/views/movie/index'),
        meta: { title: '电影信息', icon: 'movie', roles: ['editor'] }
      }
    ]
  },

  {
    path: '/ticket',
    component: Layout,
    redirect: '/ticket/index',
    children: [
      {
        path: 'index',
        name: 'Ticket',
        component: () => import('@/views/ticket/index'),
        meta: { title: '我的电影票', icon: 'ticket', roles: ['editor'] }
      }
    ]
  },

  {
    path: '/member',
    component: Layout,
    redirect: '/member/index',
    children: [
      {
        path: 'index',
        name: 'Member',
        component: () => import('@/views/member/index'),
        meta: { title: '我的卡包', icon: 'member', roles: ['editor'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
