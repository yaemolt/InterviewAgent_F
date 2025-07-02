import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    name: '',
    role: '',
    token: '',
    isLoggedIn: false
  }),
  
  getters: {
    // 获取用户是否已登录
    isAuthenticated: (state) => state.isLoggedIn && !!state.token,
    // 获取用户显示名称
    displayName: (state) => state.name || state.username || '用户',
    // 判断是否为管理员
    isAdmin: (state) => state.role === 'admin',
    // 判断是否为普通用户
    isUser: (state) => state.role === 'user'
  },
  
  actions: {
    // 设置用户信息
    setUser(userData) {
      this.username = userData.username
      this.name = userData.displayName || userData.name || userData.username
      this.role = userData.role
      this.token = userData.token || 'fake-jwt-token'
      this.isLoggedIn = true
      
      // 保存到本地存储
      localStorage.setItem('user', JSON.stringify({
        username: this.username,
        name: this.name,
        role: this.role
      }))
      localStorage.setItem('token', this.token)
      
      console.log('用户信息已保存:', {
        username: this.username,
        name: this.name,
        role: this.role,
        token: this.token
      })
    },
    
    // 清除用户信息
    clearUser() {
      this.username = ''
      this.name = ''
      this.role = ''
      this.token = ''
      this.isLoggedIn = false
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    
    // 初始化用户状态（用于页面刷新时恢复登录状态）
    initializeUser() {
      const userStr = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      
      if (userStr && token) {
        try {
          const userData = JSON.parse(userStr)
          this.setUser({
            username: userData.username,
            name: userData.name,
            role: userData.role,
            token: token
          })
        } catch (error) {
          console.error('解析用户信息失败:', error)
          this.clearUser()
        }
      }
    }
  }
}) 