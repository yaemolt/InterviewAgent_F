import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    username: '',
    isLoggedIn: false
  }),
  
  getters: {
    // 获取用户是否已登录
    isAuthenticated: (state) => state.isLoggedIn && !!state.id,
    // 获取用户显示名称
    displayName: (state) => state.username || '用户'
  },
  
  actions: {
    // 设置用户信息
    setUser(userData) {
      this.id = userData.id
      this.username = userData.username
      this.isLoggedIn = true
    },
    
    // 清除用户信息
    clearUser() {
      this.id = null
      this.username = ''
      this.isLoggedIn = false
    },
    
    // 初始化用户状态（用于页面刷新时恢复登录状态）
    initializeUser() {
      const token = localStorage.getItem('token')
      if (token) {
        // 如果有token，可以在这里调用API验证token有效性
        // 暂时简单处理，假设token存在即为已登录状态
        this.isLoggedIn = true
      }
    }
  }
}) 