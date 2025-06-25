import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
import Home from '../components/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      title: '首页'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：检查认证状态
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 智能面试辅助系统`
  }
  
  // 如果访问需要认证的路由但没有token，重定向到登录页
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }
  
  // 如果已登录用户访问登录或注册页，重定向到首页
  if ((to.path === '/login' || to.path === '/register') && token) {
    return next('/home')
  }
  
  next()
})

export default router 