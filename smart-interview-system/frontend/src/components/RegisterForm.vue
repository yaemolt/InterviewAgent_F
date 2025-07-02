<template>
  <div class="login-page" ref="loginPage" @mousemove="onMouseMove">
    <!-- 动态背景系统 -->
    <div class="dynamic-background">
      <!-- 流动面试符号层 -->
      <div class="bubble-layer" :style="bubbleTransform"></div>
      
      <!-- 视差背景层 -->
      <div class="parallax-layer" :style="parallaxTransform"></div>
      
      <!-- 光线散射层 -->
      <div class="light-scatter" :style="lightTransform"></div>
    </div>
    
    <!-- 登录卡片 -->
    <div class="glass-card" :style="cardTransform">
      <!-- 内容区域 -->
      <div class="card-content">
        <div class="brand-header">
          <!-- 大脑图标 -->
          <div class="brain-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5 7.5C19.5 6.5 18.5 5.5 17.5 5.5C16.5 5.5 15.5 6.5 15.5 7.5V8.5C15.5 9.5 16.5 10.5 17.5 10.5C18.5 10.5 19.5 9.5 19.5 8.5V7.5Z" stroke="currentColor" stroke-width="1.5" fill="rgba(144, 238, 144, 0.3)"/>
              <path d="M4.5 7.5C4.5 6.5 5.5 5.5 6.5 5.5C7.5 5.5 8.5 6.5 8.5 7.5V8.5C8.5 9.5 7.5 10.5 6.5 10.5C5.5 10.5 4.5 9.5 4.5 8.5V7.5Z" stroke="currentColor" stroke-width="1.5" fill="rgba(144, 238, 144, 0.3)"/>
              <path d="M12 3C8.5 3 6 5.5 6 9C6 11 7 12.5 8.5 13.5C9 14 9.5 14.5 9.5 15.5C9.5 16.5 10.5 17.5 11.5 17.5H12.5C13.5 17.5 14.5 16.5 14.5 15.5C14.5 14.5 15 14 15.5 13.5C17 12.5 18 11 18 9C18 5.5 15.5 3 12 3Z" stroke="currentColor" stroke-width="1.5" fill="rgba(50, 205, 50, 0.2)"/>
              <path d="M10 6.5C10 7 10.5 7.5 11 7.5C11.5 7.5 12 7 12 6.5C12 6 11.5 5.5 11 5.5C10.5 5.5 10 6 10 6.5Z" fill="currentColor"/>
              <path d="M13 6.5C13 7 13.5 7.5 14 7.5C14.5 7.5 15 7 15 6.5C15 6 14.5 5.5 14 5.5C13.5 5.5 13 6 13 6.5Z" fill="currentColor"/>
              <path d="M10.5 9.5C10.5 10 11 10.5 11.5 10.5C12 10.5 12.5 10 12.5 9.5C12.5 9 12 8.5 11.5 8.5C11 8.5 10.5 9 10.5 9.5Z" fill="rgba(144, 238, 144, 0.8)"/>
              <path d="M13.5 9.5C13.5 10 14 10.5 14.5 10.5C15 10.5 15.5 10 15.5 9.5C15.5 9 15 8.5 14.5 8.5C14 8.5 13.5 9 13.5 9.5Z" fill="rgba(144, 238, 144, 0.8)"/>
            </svg>
          </div>
          <div class="brand-text">
            <h1 class="brand-name">用户注册</h1>
            <p class="brand-subtitle">AI Interview Assistant</p>
          </div>
        </div>
        
        <form @submit.prevent="onRegister" class="login-form">
          <div class="input-group">
            <div class="glass-input" :class="{ focused: usernameFocused }">
              <input
                v-model="username"
                type="text"
                placeholder="用户名"
                required
                @focus="usernameFocused = true"
                @blur="usernameFocused = false"
              />
            </div>
          </div>
          
          <div class="input-group">
            <div class="glass-input" :class="{ focused: passwordFocused }">
              <input
                v-model="password"
                type="password"
                placeholder="密码"
                required
                @focus="passwordFocused = true"
                @blur="passwordFocused = false"
              />
            </div>
          </div>

          <div class="input-group">
            <div class="glass-input" :class="{ focused: confirmPasswordFocused }">
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="确认密码"
                required
                @focus="confirmPasswordFocused = true"
                @blur="confirmPasswordFocused = false"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            class="glass-button" 
            :disabled="loading"
            :class="{ loading: loading }"
          >
            <span class="button-content">
              {{ loading ? '注册中...' : '注册' }}
            </span>
            <div class="button-reflection"></div>
          </button>
          
          <div v-if="error" class="error-message">{{ error }}</div>
          <div v-if="success" class="success-message">{{ success }}</div>
        </form>
        
        <div class="form-footer">
          <router-link to="/login" class="switch-form">
            已有账号？立即登录
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const usernameFocused = ref(false)
const passwordFocused = ref(false)
const confirmPasswordFocused = ref(false)
const error = ref('')
const success = ref('')
const loading = ref(false)
const router = useRouter()

// 动态效果状态
const loginPage = ref(null)
const time = ref(0)
const mousePos = ref({ x: 0.5, y: 0.5 })
let animationFrame = null

// 鼠标跟随效果
const onMouseMove = (e) => {
  if (!loginPage.value) return
  
  const rect = loginPage.value.getBoundingClientRect()
  mousePos.x = (e.clientX - rect.left) / rect.width
  mousePos.y = (e.clientY - rect.top) / rect.height
}

// 动态变换计算
const bubbleTransform = ref({
  transform: `translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)`,
  filter: `blur(12px) hue-rotate(0deg)`
})

const parallaxTransform = ref({
  transform: `translate3d(0px, 0px, 0px) scale(1.02)`,
  opacity: 0.8
})

const lightTransform = ref({
  transform: `translate3d(0px, 0px, 0px) rotate(0deg)`,
  opacity: 0.6
})

const cardTransform = ref({
  transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
  backdropFilter: `blur(20px) saturate(1.2) brightness(1.1)`
})

// 动画循环
const animate = () => {
  time.value += 0.016 // 约60fps
  
  // 鼠标视差效果
  const parallaxX = (mousePos.x - 0.5) * 30
  const parallaxY = (mousePos.y - 0.5) * 30
  
  // 气泡层动态效果
  bubbleTransform.value = {
    transform: `translate3d(${parallaxX * 0.5}px, ${parallaxY * 0.5 + Math.sin(time.value * 0.5) * 5}px, 0px) 
                rotateX(${(mousePos.y - 0.5) * 10}deg) 
                rotateY(${(mousePos.x - 0.5) * 10}deg)`,
    filter: `blur(${12 + Math.sin(time.value * 0.3) * 2}px) 
             hue-rotate(${Math.sin(time.value * 0.2) * 30}deg)`
  }
  
  // 视差背景层
  parallaxTransform.value = {
    transform: `translate3d(${parallaxX * 0.8}px, ${parallaxY * 0.8}px, 0px) 
                scale(${1.02 + Math.sin(time.value * 0.4) * 0.01})`,
    opacity: 0.8 + Math.sin(time.value * 0.6) * 0.1
  }
  
  // 光线散射
  lightTransform.value = {
    transform: `translate3d(${parallaxX * 1.2}px, ${parallaxY * 1.2}px, 0px) 
                rotate(${time.value * 10}deg)`,
    opacity: 0.4 + Math.sin(time.value * 0.8) * 0.2
  }
  
  // 主卡片3D效果
  const rotateX = (mousePos.y - 0.5) * 8
  const rotateY = (mousePos.x - 0.5) * 8
  const translateZ = Math.sin(time.value * 0.3) * 5
  
  cardTransform.value = {
    transform: `perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(${translateZ}px)`,
    backdropFilter: `blur(${18 + Math.sin(time.value * 0.4) * 4}px) 
                     saturate(${1.2 + Math.sin(time.value * 0.5) * 0.3}) 
                     brightness(${1.1 + Math.sin(time.value * 0.3) * 0.1})`
  }
  
  animationFrame = requestAnimationFrame(animate)
}

// 生命周期
onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

const onRegister = async () => {
  if (!username.value || !password.value || !confirmPassword.value) {
    error.value = '请填写所有字段'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = '两次输入的密码不一致'
    return
  }

  if (password.value.length < 6) {
    error.value = '密码长度不能少于6位'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    console.log('尝试注册:', { username: username.value, password: password.value })
    
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await response.json()
    console.log('注册响应:', data)

    if (response.ok) {
      success.value = '注册成功！即将跳转到登录页面...'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      error.value = data.message || data.error || '注册失败'
    }
  } catch (err) {
    console.error('注册请求错误:', err)
    
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      error.value = '网络连接失败，请检查网络或联系管理员'
    } else if (err.message.includes('Failed to fetch')) {
      error.value = '无法连接到服务器，请确保后端服务正在运行'
    } else {
      error.value = err.message || '网络错误，请稍后重试'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 全屏登录页面容器 */
.login-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: 
    radial-gradient(ellipse at top, rgba(34, 139, 34, 0.3) 0%, transparent 70%),
    radial-gradient(ellipse at bottom, rgba(0, 100, 0, 0.2) 0%, transparent 70%),
    linear-gradient(135deg, #0a1f0a 0%, #1a2e1a 30%, #0f2a0f 70%, #1a3a1a 100%);
  perspective: 1000px;
  cursor: crosshair;
}

/* 动态背景系统 */
.dynamic-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* 流动面试符号层 */
.bubble-layer {
  position: absolute;
  inset: 0;
  background: 
    /* 问号符号 */
    radial-gradient(circle at 15% 30%, rgba(144, 238, 144, 0.4) 2px, transparent 3px),
    radial-gradient(circle at 85% 70%, rgba(50, 205, 50, 0.3) 2px, transparent 3px),
    /* 对话气泡 */
    radial-gradient(ellipse 8px 6px at 25% 60%, rgba(144, 238, 144, 0.3) 50%, transparent 51%),
    radial-gradient(ellipse 6px 8px at 75% 40%, rgba(50, 205, 50, 0.25) 50%, transparent 51%),
    /* 简历/文档符号 */
    linear-gradient(0deg, transparent 45%, rgba(34, 139, 34, 0.3) 48%, rgba(34, 139, 34, 0.3) 52%, transparent 55%),
    linear-gradient(90deg, transparent 45%, rgba(0, 128, 0, 0.2) 48%, rgba(0, 128, 0, 0.2) 52%, transparent 55%),
    /* 星星符号（评分） */
    conic-gradient(from 0deg at 35% 20%, transparent 30deg, rgba(144, 238, 144, 0.4) 36deg, transparent 42deg, rgba(144, 238, 144, 0.4) 48deg, transparent 54deg),
    conic-gradient(from 180deg at 65% 80%, transparent 30deg, rgba(50, 205, 50, 0.3) 36deg, transparent 42deg, rgba(50, 205, 50, 0.3) 48deg, transparent 54deg);
  background-size: 80px 80px, 100px 100px, 120px 120px, 90px 90px, 110px 110px, 130px 130px, 60px 60px, 70px 70px;
  animation: interviewSymbolsFlow 25s linear infinite;
  will-change: transform, filter;
}

/* 视差背景层 */
.parallax-layer {
  position: absolute;
  inset: 0;
  background: 
    conic-gradient(from 0deg at 30% 30%, transparent 60deg, rgba(144, 238, 144, 0.1) 120deg, transparent 180deg),
    conic-gradient(from 180deg at 70% 70%, transparent 60deg, rgba(50, 205, 50, 0.08) 120deg, transparent 180deg);
  background-size: 300px 300px, 200px 200px;
  animation: parallaxFlow 30s linear infinite;
  opacity: 0.8;
  will-change: transform, opacity;
}

/* 光线散射层 */
.light-scatter {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(144, 238, 144, 0.15) 1px, transparent 2px),
    radial-gradient(circle at 80% 80%, rgba(50, 205, 50, 0.12) 1px, transparent 2px),
    radial-gradient(circle at 60% 30%, rgba(34, 139, 34, 0.1) 1px, transparent 2px),
    radial-gradient(circle at 40% 70%, rgba(0, 128, 0, 0.08) 1px, transparent 2px);
  background-size: 150px 150px, 200px 200px, 180px 180px, 220px 220px;
  animation: lightScatter 35s linear infinite;
  opacity: 0.6;
  will-change: transform, opacity;
}

/* 毛玻璃卡片 */
.glass-card {
  position: relative;
  z-index: 10;
  width: 90%;
  max-width: 420px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(144, 238, 144, 0.05) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(50, 205, 50, 0.03) 75%,
    rgba(255, 255, 255, 0.12) 100%);
  backdrop-filter: blur(20px) saturate(1.2) brightness(1.1);
  -webkit-backdrop-filter: blur(20px) saturate(1.2) brightness(1.1);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  will-change: transform, backdrop-filter;
  transition: all 0.1s ease-out;
}

/* 卡片内容 */
.card-content {
  position: relative;
  z-index: 1;
}

/* 品牌头部 - 名片样式 */
.brand-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  padding: 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(144, 238, 144, 0.05) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* 大脑图标 */
.brain-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  color: rgba(144, 238, 144, 0.9);
  animation: brainPulse 3s ease-in-out infinite;
}

.brain-icon svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 8px rgba(50, 205, 50, 0.3));
}

/* 品牌文字区域 */
.brand-text {
  text-align: left;
}

/* 品牌标题 */
.brand-name {
  margin: 0 0 0.25rem 0;
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, rgba(144, 238, 144, 0.9) 50%, #fff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  animation: titleGlow 4s ease-in-out infinite;
}

.brand-subtitle {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 300;
  opacity: 0.9;
}

/* 登录表单 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 输入组 */
.input-group {
  position: relative;
}

/* 毛玻璃输入框 */
.glass-input {
  position: relative;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05) 0%,
    rgba(144, 238, 144, 0.03) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.glass-input::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(144, 238, 144, 0.5) 50%, 
    transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.glass-input.focused {
  border-color: rgba(144, 238, 144, 0.3);
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%,
    rgba(144, 238, 144, 0.05) 100%);
  transform: translateY(-2px);
  box-shadow: 
    0 8px 25px rgba(50, 205, 50, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-input.focused::before {
  opacity: 1;
}

.glass-input input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.5px;
}

.glass-input input::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
}

/* 毛玻璃按钮 */
.glass-button {
  position: relative;
  background: linear-gradient(135deg, 
    rgba(144, 238, 144, 0.2) 0%,
    rgba(50, 205, 50, 0.15) 100%);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(144, 238, 144, 0.3);
  border-radius: 12px;
  padding: 1rem 2rem;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.glass-button:hover:not(:disabled) {
  transform: translateY(-3px);
  background: linear-gradient(135deg, 
    rgba(144, 238, 144, 0.25) 0%,
    rgba(50, 205, 50, 0.2) 100%);
  border-color: rgba(144, 238, 144, 0.4);
  box-shadow: 
    0 15px 35px rgba(50, 205, 50, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-button:active {
  transform: translateY(-1px);
}

.glass-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.button-content {
  position: relative;
  z-index: 2;
}

.button-reflection {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.2) 50%, 
    transparent 100%);
  transition: left 0.6s ease;
}

.glass-button:hover:not(:disabled) .button-reflection {
  left: 100%;
}

/* 错误和成功消息 */
.error-message, .success-message {
  text-align: center;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.error-message {
  background: linear-gradient(135deg, rgba(255, 99, 99, 0.15) 0%, rgba(255, 77, 77, 0.1) 100%);
  border: 1px solid rgba(255, 99, 99, 0.2);
  color: rgba(255, 200, 200, 0.9);
}

.success-message {
  background: linear-gradient(135deg, rgba(144, 238, 144, 0.15) 0%, rgba(50, 205, 50, 0.1) 100%);
  border: 1px solid rgba(144, 238, 144, 0.2);
  color: rgba(200, 255, 200, 0.9);
}

/* 表单底部 */
.form-footer {
  text-align: center;
  margin-top: 1.5rem;
}

.switch-form {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 6px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.switch-form:hover {
  color: rgba(144, 238, 144, 0.9);
  background: rgba(255, 255, 255, 0.05);
  text-shadow: 0 0 10px rgba(144, 238, 144, 0.3);
}

/* 面试符号流动动画 */
@keyframes interviewSymbolsFlow {
  0% { 
    background-position: 0 100%, 0 100%, 0 100%, 0 100%, 0 100%, 0 100%, 0 100%, 0 100%; 
    opacity: 0.7;
  }
  25% { 
    opacity: 0.9; 
  }
  50% { 
    opacity: 1;
    background-position: 40px 80%, 50px 75%, 60px 70%, 45px 73%, 55px 77%, 65px 72%, 30px 78%, 35px 74%;
  }
  75% { 
    opacity: 0.8; 
  }
  100% { 
    background-position: 80px -20%, 100px -25%, 120px -30%, 90px -35%, 110px -28%, 130px -32%, 60px -22%, 70px -26%; 
    opacity: 0.6;
  }
}

@keyframes parallaxFlow {
  0% { 
    background-position: 0 0, 0 0;
    transform: rotate(0deg);
  }
  100% { 
    background-position: 300px 300px, 200px 200px;
    transform: rotate(360deg);
  }
}

@keyframes lightScatter {
  0% { 
    background-position: 0 0, 0 0, 0 0, 0 0;
    opacity: 0.4;
  }
  50% { 
    opacity: 0.8;
  }
  100% { 
    background-position: 150px 150px, 200px 200px, 180px 180px, 220px 220px;
    opacity: 0.4;
  }
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
  50% {
    text-shadow: 
      0 4px 15px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(144, 238, 144, 0.5),
      0 0 50px rgba(50, 205, 50, 0.3);
  }
}

@keyframes brainPulse {
  0%, 100% {
    transform: scale(1);
    color: rgba(144, 238, 144, 0.9);
    filter: drop-shadow(0 2px 8px rgba(50, 205, 50, 0.3));
  }
  50% {
    transform: scale(1.05);
    color: rgba(50, 205, 50, 1);
    filter: drop-shadow(0 4px 12px rgba(50, 205, 50, 0.5));
  }
}
</style> 