import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器 - 添加token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// 简历相关接口
export const getResumeStatus = () => api.get('/user/resume-status')
export const submitResume = (resume) => api.post('/user/resume', resume)
export const getResume = () => api.get('/user/resume')

// 面试相关接口
export const startInterview = () => api.post('/interview/start')
export const sendMessage = (message) => api.post('/interview/message', { message })
export const getInterviewHistory = () => api.get('/interview/history')
export const endInterview = () => api.post('/interview/end')

// 用户认证接口
export const login = (credentials) => api.post('/auth/login', credentials)
export const register = (userData) => api.post('/auth/register', userData)
export const logout = () => api.post('/auth/logout')

export default api 