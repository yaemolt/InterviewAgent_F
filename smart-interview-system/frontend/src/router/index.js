import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
import Home from '../components/Home.vue'
import ResumeForm from '../components/ResumeForm.vue'

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
    path: '/resume',
    name: 'Resume',
    component: ResumeForm,
    meta: {
      requiresAuth: true,
      title: '完善简历'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      requiresResume: true,
      title: '首页'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：检查认证状态和简历状态
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 智能面试辅助系统`
  }
  
  // 如果访问需要认证的路由但没有token，重定向到登录页
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }
  
  // 如果已登录用户访问登录或注册页，需要检查简历状态后决定跳转
  if ((to.path === '/login' || to.path === '/register') && token) {
    try {
      // 动态导入API方法以避免循环依赖
      const { getResumeStatus } = await import('../api/chat')
      const response = await getResumeStatus()
      
      if (response.data.status === 'missing') {
        // 用户没有简历，跳转到简历填写页面
        return next('/resume')
      } else {
        // 用户已有简历，跳转到首页
        return next('/home')
      }
    } catch (error) {
      console.error('检查简历状态失败:', error)
      // 如果检查失败，为安全起见跳转到简历页面
      return next('/resume')
    }
  }
  
  // 检查是否需要简历（访问首页时）
  if (to.meta.requiresResume && token) {
    try {
      const { getResumeStatus } = await import('../api/chat')
      const response = await getResumeStatus()
      
      if (response.data.status === 'missing') {
        // 用户没有简历，跳转到简历填写页面
        return next('/resume')
      }
    } catch (error) {
      console.error('检查简历状态失败:', error)
      // 如果检查失败，为安全起见跳转到简历页面
      return next('/resume')
    }
  }
  
  next()
})

export default router 