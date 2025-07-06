import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    name: '',
    role: '',
    token: '',
    isLoggedIn: false,
    hasCompletedProfile: false, // 是否已完成个人信息填写
    isNewUser: false, // 是否为新注册用户
    avatar: '', // 用户头像URL
    avatarStyle: '', // 头像风格
    bio: '', // 个人签名
    resumeData: null, // 简历数据
    profileData: null // 原始简历表单数据
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
      this.hasCompletedProfile = userData.hasCompletedProfile || false
      this.isNewUser = userData.isNewUser || false
      this.avatar = userData.avatar || ''
      this.avatarStyle = userData.avatarStyle || ''
      this.bio = userData.bio || ''
      this.resumeData = userData.resumeData || null
      this.profileData = userData.profileData || null
      
      // 保存到本地存储
      localStorage.setItem('user', JSON.stringify({
        username: this.username,
        name: this.name,
        role: this.role,
        hasCompletedProfile: this.hasCompletedProfile,
        isNewUser: this.isNewUser,
        avatar: this.avatar,
        avatarStyle: this.avatarStyle,
        bio: this.bio,
        resumeData: this.resumeData,
        profileData: this.profileData
      }))
      localStorage.setItem('token', this.token)
      
      console.log('用户信息已保存:', {
        username: this.username,
        name: this.name,
        role: this.role,
        token: this.token,
        hasCompletedProfile: this.hasCompletedProfile,
        isNewUser: this.isNewUser,
        avatar: this.avatar,
        bio: this.bio
      })
    },
    
    // 清除用户信息
    clearUser() {
      this.username = ''
      this.name = ''
      this.role = ''
      this.token = ''
      this.isLoggedIn = false
      this.hasCompletedProfile = false
      this.isNewUser = false
      this.avatar = ''
      this.avatarStyle = ''
      this.bio = ''
      this.resumeData = null
      this.profileData = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },

    // 标记用户已完成个人信息填写
    markProfileCompleted() {
      this.hasCompletedProfile = true
      this.isNewUser = false
      
      // 更新本地存储
      const userData = JSON.parse(localStorage.getItem('user') || '{}')
      userData.hasCompletedProfile = true
      userData.isNewUser = false
      localStorage.setItem('user', JSON.stringify(userData))
    },

    // 更新用户个人信息
    updateProfile(profileData) {
      if (profileData.displayName !== undefined) {
        this.name = profileData.displayName
      }
      if (profileData.bio !== undefined) {
        this.bio = profileData.bio
      }
      if (profileData.avatar !== undefined) {
        this.avatar = profileData.avatar
      }
      if (profileData.avatarStyle !== undefined) {
        this.avatarStyle = profileData.avatarStyle
      }
      if (profileData.resumeData !== undefined) {
        this.resumeData = profileData.resumeData
      }
      if (profileData.profileData !== undefined) {
        this.profileData = profileData.profileData
      }
      
      // 更新本地存储
      const userData = JSON.parse(localStorage.getItem('user') || '{}')
      userData.name = this.name
      userData.bio = this.bio
      userData.avatar = this.avatar
      userData.avatarStyle = this.avatarStyle
      userData.resumeData = this.resumeData
      userData.profileData = this.profileData
      localStorage.setItem('user', JSON.stringify(userData))
      
      console.log('个人信息已更新:', {
        name: this.name,
        bio: this.bio,
        avatar: this.avatar,
        avatarStyle: this.avatarStyle
      })
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
            token: token,
            hasCompletedProfile: userData.hasCompletedProfile || false,
            isNewUser: userData.isNewUser || false,
            avatar: userData.avatar || '',
            avatarStyle: userData.avatarStyle || '',
            bio: userData.bio || '',
            resumeData: userData.resumeData || null,
            profileData: userData.profileData || null
          })
        } catch (error) {
          console.error('解析用户信息失败:', error)
          this.clearUser()
        }
      }
    }
  }
}) 