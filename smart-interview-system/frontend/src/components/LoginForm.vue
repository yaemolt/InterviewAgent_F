<template>
  <div class="login-page" @mousemove="handleMouseMove" ref="loginPage">
    <!-- 动态背景层 -->
    <div class="dynamic-background">
      <!-- 流动气泡层 -->
      <div class="bubble-layer" :style="bubbleTransform"></div>
      <!-- 视差背景层 -->
      <div class="parallax-layer" :style="parallaxTransform"></div>
      <!-- 散射光线层 -->
      <div class="light-scatter" :style="lightTransform"></div>
    </div>

    <!-- 高级毛玻璃登录卡片 -->
    <div class="advanced-glass-card" :style="cardTransform">
      <!-- 玻璃折射层 */
      <div class="glass-refraction"></div>
      <!-- 边缘光晕 -->
      <div class="glass-edge-glow"></div>
      <!-- 微光散射 -->
      <div class="micro-light-scatter"></div>
      
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
            <h1 class="brand-name">智能面试系统</h1>
            <p class="brand-subtitle">AI Interview Assistant</p>
          </div>
        </div>
        
        <form @submit.prevent="onLogin" class="login-form">
          <div class="form-group">
            <div class="input-glass-wrapper">
              <input 
                v-model="username" 
                type="text" 
                placeholder="用户名" 
                required
                class="form-input"
              />
              <div class="input-glass-effect"></div>
            </div>
          </div>
          
          <div class="form-group">
            <div class="input-glass-wrapper">
              <input 
                v-model="password" 
                type="password" 
                placeholder="密码" 
                required
                class="form-input"
              />
              <div class="input-glass-effect"></div>
            </div>
          </div>
          
          <button type="submit" class="glass-btn" :disabled="loading">
            <span class="btn-text">{{ loading ? '登录中...' : '登录' }}</span>
            <div class="btn-glass-effect"></div>
          </button>
          
          <p v-if="error" class="error-message">{{ error }}</p>
        </form>
        
        <div class="register-link">
          <p>还没有账号？<router-link to="/register">立即注册</router-link></p>
        </div>

        <!-- 账号提示 -->
        <div class="account-hints">
          <div class="hint-title">测试账号</div>
          <div class="hint-item">
            <span class="hint-role">管理员:</span>
            <span class="hint-accounts">JHR, SJL, SCX</span>
          </div>
          <div class="hint-item">
            <span class="hint-role">密码:</span>
            <span class="hint-accounts">123456</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStore'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const loginPage = ref(null)

// 动态效果状态
const mousePos = reactive({ x: 0, y: 0 })
const time = ref(0)
let animationFrame = null

// 鼠标移动处理
const handleMouseMove = (e) => {
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

const onLogin = async () => {
  if (!username.value || !password.value) {
    error.value = '请填写用户名和密码'
    return
  }

  loading.value = true
  error.value = ''

  try {
    console.log('尝试登录:', { username: username.value, password: password.value })
    
    // 首先检查后端服务是否可用
    try {
      const healthCheck = await fetch('http://localhost:5000/api/health', {
        method: 'GET',
        timeout: 3000
      })
      
      if (!healthCheck.ok) {
        throw new Error('后端服务不可用')
      }
    } catch (healthError) {
      console.error('健康检查失败:', healthError)
      error.value = '无法连接到服务器，请确保后端服务正在运行'
      return
    }
    
    const response = await fetch('http://localhost:5000/api/login', {
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
    console.log('登录响应:', data)

    if (response.ok) {
      // 保存用户信息到状态管理
      userStore.setUser({
        username: data.username,
        role: data.role,
        displayName: data.name,
        token: data.token
      })
      
      console.log('登录成功，用户角色:', data.role)
      
      // 根据角色跳转到不同页面
      if (data.role === 'admin') {
        console.log('跳转到管理员界面')
        router.push('/admin-dashboard')
      } else {
        console.log('跳转到用户界面')
        router.push('/user-dashboard')
      }
    } else {
      error.value = data.message || data.error || '登录失败'
    }
  } catch (err) {
    console.error('登录请求错误:', err)
    
    // 提供更详细的错误信息
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
  animation: parallaxSpin 30s linear infinite;
  will-change: transform, opacity;
}

/* 散射光线层 */
.light-scatter {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(45deg, transparent 30%, rgba(144, 238, 144, 0.1) 45%, transparent 55%),
    linear-gradient(-45deg, transparent 30%, rgba(50, 205, 50, 0.08) 45%, transparent 55%),
    linear-gradient(135deg, transparent 40%, rgba(34, 139, 34, 0.06) 50%, transparent 60%);
  background-size: 400px 400px, 350px 350px, 450px 450px;
  mix-blend-mode: screen;
  will-change: transform, opacity;
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

@keyframes parallaxSpin {
  0% { 
    transform: rotate(0deg) scale(1);
    opacity: 0.5;
  }
  50% { 
    transform: rotate(180deg) scale(1.05);
    opacity: 0.8;
  }
  100% { 
    transform: rotate(360deg) scale(1);
    opacity: 0.5;
  }
}

/* 高级毛玻璃卡片系统 */
.advanced-glass-card {
  position: relative;
  width: 420px;
  max-width: 90vw;
  padding: 0;
  border-radius: 24px;
  z-index: 100;
  will-change: transform, backdrop-filter;
  transform-style: preserve-3d;
}

/* 玻璃折射层 - 模拟真实玻璃的光线折射 */
.glass-refraction {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 30%),
    linear-gradient(-45deg, transparent 60%, rgba(144, 238, 144, 0.1) 80%, transparent 90%),
    linear-gradient(45deg, transparent 70%, rgba(50, 205, 50, 0.08) 85%, transparent 95%);
  backdrop-filter: blur(20px) saturate(1.8) brightness(1.2);
  -webkit-backdrop-filter: blur(20px) saturate(1.8) brightness(1.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 8px 32px rgba(34, 139, 34, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  animation: glassShimmer 6s ease-in-out infinite;
}

/* 边缘光晕效果 */
.glass-edge-glow {
  position: absolute;
  inset: -2px;
  border-radius: 26px;
  background: conic-gradient(
    from 0deg,
    rgba(144, 238, 144, 0.3) 0deg,
    rgba(50, 205, 50, 0.2) 90deg,
    rgba(34, 139, 34, 0.15) 180deg,
    rgba(0, 128, 0, 0.1) 270deg,
    rgba(144, 238, 144, 0.3) 360deg
  );
  filter: blur(3px);
  opacity: 0.6;
  animation: edgeGlow 8s linear infinite;
  z-index: -1;
}

/* 微光散射 - 模拟光线散射现象 */
.micro-light-scatter {
  position: absolute;
  inset: 10px;
  border-radius: 18px;
  background: 
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.4) 1px, transparent 2px),
    radial-gradient(circle at 80% 30%, rgba(144, 238, 144, 0.3) 1px, transparent 2px),
    radial-gradient(circle at 30% 80%, rgba(50, 205, 50, 0.25) 1px, transparent 2px),
    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2) 1px, transparent 2px);
  background-size: 40px 40px, 60px 60px, 50px 50px, 45px 45px;
  opacity: 0.7;
  animation: microScatter 12s ease-in-out infinite;
  pointer-events: none;
}

/* 卡片内容区域 */
.card-content {
  position: relative;
  padding: 2.5rem;
  z-index: 10;
  text-align: center;
}

/* 高级动画关键帧 */
@keyframes glassShimmer {
  0%, 100% {
    backdrop-filter: blur(18px) saturate(1.6) brightness(1.1);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.25),
      0 8px 32px rgba(34, 139, 34, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
  33% {
    backdrop-filter: blur(22px) saturate(1.9) brightness(1.3);
    box-shadow: 
      0 25px 70px rgba(0, 0, 0, 0.3),
      0 12px 40px rgba(50, 205, 50, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }
  66% {
    backdrop-filter: blur(20px) saturate(1.7) brightness(1.2);
    box-shadow: 
      0 22px 65px rgba(0, 0, 0, 0.28),
      0 10px 36px rgba(144, 238, 144, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
}

@keyframes edgeGlow {
  0% { 
    transform: rotate(0deg); 
    opacity: 0.4; 
  }
  50% { 
    opacity: 0.8; 
  }
  100% { 
    transform: rotate(360deg); 
    opacity: 0.4; 
  }
}

@keyframes microScatter {
  0%, 100% {
    background-position: 0 0, 0 0, 0 0, 0 0;
    opacity: 0.5;
  }
  25% {
    background-position: 10px 5px, -5px 10px, 8px -3px, -7px 8px;
    opacity: 0.7;
  }
  50% {
    background-position: 5px 10px, -10px 5px, -3px 8px, 8px -7px;
    opacity: 0.9;
  }
  75% {
    background-position: -5px 3px, 8px -8px, 10px 5px, -3px -5px;
    opacity: 0.6;
  }
}

/* 额外动画关键帧 */
@keyframes inputShimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
}

@keyframes btnShimmer {
  0% { left: -100%; }
  100% { left: 100%; }
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

/* 高级表单元素样式 */
.login-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
  position: relative;
}

/* 输入框毛玻璃包装器 */
.input-glass-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

.input-glass-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(144, 238, 144, 0.05) 100%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 1;
  pointer-events: none;
}

.form-input {
  position: relative;
  width: 100%;
  padding: 1rem 1.25rem;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  z-index: 2;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

.form-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 10px 30px rgba(34, 139, 34, 0.3),
    0 0 0 2px rgba(50, 205, 50, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* 输入框玻璃效果层 */
.input-glass-effect {
  position: absolute;
  inset: 2px;
  border-radius: 14px;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 3;
}

.input-glass-wrapper:hover .input-glass-effect {
  opacity: 1;
  animation: inputShimmer 2s ease-in-out infinite;
}

/* 高级毛玻璃按钮 */
.glass-btn {
  position: relative;
  width: 100%;
  padding: 1.125rem;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(34, 139, 34, 0.8) 0%, rgba(0, 100, 0, 0.9) 100%);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 25px rgba(34, 139, 34, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  margin-top: 0.75rem;
  overflow: hidden;
  z-index: 1;
}

.glass-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(50, 205, 50, 0.9) 0%, rgba(34, 139, 34, 0.95) 100%);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 
    0 15px 40px rgba(50, 205, 50, 0.5),
    0 8px 25px rgba(34, 139, 34, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.glass-btn:active:not(:disabled) {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 
    0 8px 20px rgba(34, 139, 34, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-btn:disabled {
  background: rgba(255, 255, 255, 0.1);
  cursor: not-allowed;
  transform: none;
  box-shadow: 
    0 4px 10px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  opacity: 0.6;
}

/* 按钮文字 */
.btn-text {
  position: relative;
  z-index: 2;
}

/* 按钮玻璃效果层 */
.btn-glass-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s ease;
  z-index: 1;
}

.glass-btn:hover:not(:disabled) .btn-glass-effect {
  left: 100%;
  animation: btnShimmer 0.6s ease-out;
}

.error-message {
  color: #ff9999;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0;
  font-size: 0.9rem;
  font-weight: 500;
  background: rgba(255, 107, 107, 0.08);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  border: 1px solid rgba(255, 107, 107, 0.2);
  box-shadow: 
    0 4px 15px rgba(255, 107, 107, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: errorPulse 2s ease-in-out infinite;
}

@keyframes errorPulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 1; }
}

/* 注册链接 */
.register-link {
  text-align: center;
  margin-bottom: 1.5rem;
}

.register-link p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.register-link a {
  color: #32CD32;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #228B22;
  text-decoration: underline;
}

/* 账号提示区域 - 高级毛玻璃效果 */
.account-hints {
  position: relative;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1.25rem;
  backdrop-filter: blur(12px) saturate(1.5);
  -webkit-backdrop-filter: blur(12px) saturate(1.5);
  border: 1px solid rgba(144, 238, 144, 0.2);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  overflow: hidden;
}

.account-hints::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(144, 238, 144, 0.05) 0%, transparent 50%);
  border-radius: 16px;
  pointer-events: none;
}

.hint-title {
  position: relative;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  z-index: 2;
}

.hint-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
  z-index: 2;
}

.hint-item:last-child {
  margin-bottom: 0;
}

.hint-role {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}

.hint-accounts {
  color: #4ade80;
  font-weight: 700;
  background: rgba(50, 205, 50, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(50, 205, 50, 0.25);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .advanced-glass-card {
    width: 95%;
    margin: 1rem;
  }
  
  .card-content {
    padding: 2rem 1.5rem;
  }
  
  .brand-name {
    font-size: 1.8rem;
  }
  
  .brand-subtitle {
    font-size: 0.85rem;
    letter-spacing: 2px;
  }
  
  .form-input {
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
  }
  
  .glass-btn {
    padding: 1rem;
    font-size: 1rem;
  }
  
  .account-hints {
    padding: 1rem;
  }
  
  .hint-item {
    font-size: 0.85rem;
  }
}

@media (max-height: 650px) {
  .card-content {
    padding: 1.5rem;
  }
  
  .brand-name {
    font-size: 1.8rem;
    margin-bottom: 0.25rem;
  }
  
  .brand-subtitle {
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .account-hints {
    padding: 1rem;
  }
}

@media (max-width: 320px) {
  .advanced-glass-card {
    width: 98%;
  }
  
  .card-content {
    padding: 1.5rem 1rem;
  }
  
  .brand-name {
    font-size: 1.6rem;
  }
}
</style> 