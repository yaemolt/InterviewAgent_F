import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
import Home from '../components/Home.vue'
import ResumeForm from '../components/ResumeForm.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import UserDashboard from '../views/UserDashboard.vue'

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
      title: '登录',
      requiresGuest: true // 只允许未登录用户访问
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm,
    meta: {
      title: '注册',
      requiresGuest: true
    }
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      requiresRole: 'admin',
      title: '管理员控制台'
    }
  },
  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: {
      requiresAuth: true,
      requiresRole: 'user',
      title: '用户中心'
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
      title: '首页'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导入用户状态管理
import { useUserStore } from '../store/userStore'

// 路由守卫：检查认证状态和角色权限
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  // 初始化用户状态（如果还没有初始化）
  if (!userStore.isAuthenticated) {
    userStore.initializeUser()
  }
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 智能面试辅助系统`
  }
  
  // 如果路由要求游客访问（登录、注册页），但用户已登录
  if (to.meta.requiresGuest && userStore.isAuthenticated) {
    // 根据用户角色重定向到对应的Dashboard
    if (userStore.isAdmin) {
      return next('/admin-dashboard')
    } else if (userStore.isUser) {
      return next('/user-dashboard')
    } else {
      return next('/home')
    }
  }
  
  // 如果访问需要认证的路由但用户未登录
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next('/login')
  }
  
  // 如果路由需要特定角色
  if (to.meta.requiresRole && userStore.isAuthenticated) {
    const requiredRole = to.meta.requiresRole
    if (userStore.role !== requiredRole) {
      // 用户角色不匹配，重定向到对应的Dashboard
      if (userStore.isAdmin) {
        return next('/admin-dashboard')
      } else if (userStore.isUser) {
        return next('/user-dashboard')
      } else {
        return next('/login')
      }
    }
  }
  
  next()
})

export default router 