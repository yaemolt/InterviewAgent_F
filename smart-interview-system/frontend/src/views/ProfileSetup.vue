<template>
  <!-- 外层包装器，撑满整个窗口 -->
  <div class="wrapper" ref="setupPage" @mousemove="onMouseMove">
    <!-- 动态背景系统 -->
    <div class="background-container">
      <div class="dynamic-background">
        <!-- 流动面试符号层 -->
        <div class="bubble-layer" :style="bubbleTransform"></div>
        
        <!-- 视差背景层 -->
        <div class="parallax-layer" :style="parallaxTransform"></div>
        
        <!-- 光线散射层 -->
        <div class="light-scatter" :style="lightTransform"></div>
      </div>
    </div>
    
    <!-- 1. 可滚动的内容区 -->
    <main class="content">
      <div class="setup-container" :style="cardTransform">
      <!-- 头部欢迎区域 -->
      <div class="welcome-header">
        <div class="brain-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 7.5C19.5 6.5 18.5 5.5 17.5 5.5C16.5 5.5 15.5 6.5 15.5 7.5V8.5C15.5 9.5 16.5 10.5 17.5 10.5C18.5 10.5 19.5 9.5 19.5 8.5V7.5Z" stroke="currentColor" stroke-width="1.5" fill="rgba(144, 238, 144, 0.3)"/>
            <path d="M4.5 7.5C4.5 6.5 5.5 5.5 6.5 5.5C7.5 5.5 8.5 6.5 8.5 7.5V8.5C8.5 9.5 7.5 10.5 6.5 10.5C5.5 10.5 4.5 9.5 4.5 8.5V7.5Z" stroke="currentColor" stroke-width="1.5" fill="rgba(144, 238, 144, 0.3)"/>
            <path d="M12 3C8.5 3 6 5.5 6 9C6 11 7 12.5 8.5 13.5C9 14 9.5 14.5 9.5 15.5C9.5 16.5 10.5 17.5 11.5 17.5H12.5C13.5 17.5 14.5 16.5 14.5 15.5C14.5 14.5 15 14 15.5 13.5C17 12.5 18 11 18 9C18 5.5 15.5 3 12 3Z" stroke="currentColor" stroke-width="1.5" fill="rgba(50, 205, 50, 0.2)"/>
            <path d="M10 6.5C10 7 10.5 7.5 11 7.5C11.5 7.5 12 7 12 6.5C12 6 11.5 5.5 11 5.5C10.5 5.5 10 6 10 6.5Z" fill="currentColor"/>
            <path d="M13 6.5C13 7 13.5 7.5 14 7.5C14.5 7.5 15 7 15 6.5C15 6 14.5 5.5 14 5.5C13.5 5.5 13 6 13 6.5Z" fill="currentColor"/>
            <path d="M10.5 9.5C10.5 10 11 10.5 11.5 10.5C12 10.5 12.5 10 12.5 9.5C12.5 9 12 8.5 11.5 8.5C11 8.5 10.5 9 10.5 9.5Z" fill="rgba(144, 238, 144, 0.8)"/>
            <path d="M13.5 9.5C13.5 10 14 10.5 14.5 10.5C15 10.5 15.5 10 15.5 9.5C15.5 9 15 8.5 14.5 8.5C14 8.5 13.5 9 13.5 9.5Z" fill="rgba(144, 238, 144, 0.8)"/>
          </svg>
        </div>
        <h1 class="welcome-title">欢迎加入智能面试系统！</h1>
        <p class="welcome-subtitle">让我们先了解一下您的基本信息，为您提供更精准的面试体验</p>
      </div>

      <!-- 进度指示器 -->
      <div class="progress-indicator">
        <div class="progress-step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
          <span class="step-number">1</span>
          <span class="step-label">基本信息</span>
        </div>
        <div class="progress-line" :class="{ active: currentStep > 1 }"></div>
        <div class="progress-step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
          <span class="step-number">2</span>
          <span class="step-label">求职意向</span>
        </div>
        <div class="progress-line" :class="{ active: currentStep > 2 }"></div>
        <div class="progress-step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
          <span class="step-number">3</span>
          <span class="step-label">技能经验</span>
        </div>
      </div>

      <!-- 表单内容 -->
      <div class="form-content">
        <!-- 步骤1：基本信息 -->
        <div v-if="currentStep === 1" class="form-step">
          <div class="glass-card">
            <h2>📝 基本信息</h2>
            <div class="form-grid">
              <div class="glass-input">
                <label>姓名 *</label>
                <input v-model="profile.name" type="text" placeholder="请输入您的姓名" required />
              </div>
              <div class="glass-input">
                <label>年龄</label>
                <input v-model="profile.age" type="number" placeholder="年龄" min="18" max="65" />
              </div>
              <div class="glass-input">
                <label>居住城市</label>
                <input v-model="profile.location" type="text" placeholder="如：北京、上海、深圳" />
              </div>
              <div class="glass-input">
                <label>联系方式</label>
                <input v-model="profile.phone" type="tel" placeholder="手机号码" />
              </div>
            </div>
          </div>
        </div>

        <!-- 步骤2：求职意向 -->
        <div v-if="currentStep === 2" class="form-step">
          <div class="glass-card">
            <h2>🎯 求职意向</h2>
            <div class="form-grid">
              <div class="glass-input">
                <label>期望职位 *</label>
                <input v-model="profile.targetPosition" type="text" placeholder="如：前端开发工程师、产品经理等" required />
              </div>
              <div class="glass-input">
                <label>期望薪资</label>
                <input v-model="profile.expectedSalary" type="text" placeholder="如：8k-12k、面议" />
              </div>
              <div class="glass-input">
                <label>学历 *</label>
                <select v-model="profile.education" required>
                  <option value="">请选择学历</option>
                  <option value="高中">高中</option>
                  <option value="大专">大专</option>
                  <option value="本科">本科</option>
                  <option value="硕士">硕士</option>
                  <option value="博士">博士</option>
                </select>
              </div>
              <div class="glass-input">
                <label>工作年限</label>
                <select v-model="profile.workExperience">
                  <option value="">请选择工作年限</option>
                  <option value="应届毕业生">应届毕业生</option>
                  <option value="1年以下">1年以下</option>
                  <option value="1-3年">1-3年</option>
                  <option value="3-5年">3-5年</option>
                  <option value="5-10年">5-10年</option>
                  <option value="10年以上">10年以上</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- 步骤3：技能经验 -->
        <div v-if="currentStep === 3" class="form-step">
          <div class="glass-card skills-card">
            <h2>🚀 技能经验</h2>
            <div class="form-grid skills-grid">
              <div class="glass-input full-width">
                <label>技术技能</label>
                <textarea v-model="profile.technicalSkills" placeholder="请描述您的技术技能，如：JavaScript、Python、Photoshop等..." rows="4"></textarea>
              </div>
              <div class="glass-input full-width">
                <label>工作经历</label>
                <textarea v-model="profile.workDescription" placeholder="请简要描述您的工作经历、主要职责和成就..." rows="4"></textarea>
              </div>
              <div class="glass-input full-width">
                <label>自我评价</label>
                <textarea v-model="profile.selfEvaluation" placeholder="请简要描述您的个人优势、性格特点等..." rows="4"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

        <!-- 错误信息 -->
        <div v-if="error" class="error-message">{{ error }}</div>
      </div>
    </main>

    <!-- 2. 固定在底部的按钮区 -->
    <footer class="footer">
      <button v-if="currentStep > 1" @click="prevStep" class="btn secondary">
        <span class="button-content">上一步</span>
        <div class="button-reflection"></div>
      </button>
      <button v-if="currentStep < 3" @click="nextStep" class="btn primary">
        <span class="button-content">下一步</span>
        <div class="button-reflection"></div>
      </button>
      <button v-if="currentStep === 3" @click="completeSetup" class="btn primary" :disabled="loading">
        <span class="button-content">
          {{ loading ? '保存中...' : '完成设置' }}
        </span>
        <div class="button-reflection"></div>
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStore'

const router = useRouter()
const userStore = useUserStore()

// 表单数据
const profile = ref({
  name: '',
  age: '',
  location: '',
  phone: '',
  targetPosition: '',
  expectedSalary: '',
  education: '',
  workExperience: '',
  technicalSkills: '',
  workDescription: '',
  selfEvaluation: ''
})

const currentStep = ref(1)
const loading = ref(false)
const error = ref('')

// 动态效果状态
const setupPage = ref(null)
const time = ref(0)
const mousePos = ref({ x: 0.5, y: 0.5 })
let animationFrame = null

// 鼠标跟随效果
const onMouseMove = (e) => {
  if (!setupPage.value) return
  
  const rect = setupPage.value.getBoundingClientRect()
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
  time.value += 0.016
  
  const parallaxX = (mousePos.x - 0.5) * 20
  const parallaxY = (mousePos.y - 0.5) * 20
  
  bubbleTransform.value = {
    transform: `translate3d(${parallaxX * 0.3}px, ${parallaxY * 0.3 + Math.sin(time.value * 0.5) * 3}px, 0px)`,
    filter: `blur(${12 + Math.sin(time.value * 0.3) * 2}px) hue-rotate(${Math.sin(time.value * 0.2) * 20}deg)`
  }
  
  parallaxTransform.value = {
    transform: `translate3d(${parallaxX * 0.5}px, ${parallaxY * 0.5}px, 0px) scale(${1.02 + Math.sin(time.value * 0.4) * 0.01})`,
    opacity: 0.8 + Math.sin(time.value * 0.6) * 0.1
  }
  
  lightTransform.value = {
    transform: `translate3d(${parallaxX * 0.8}px, ${parallaxY * 0.8}px, 0px) rotate(${time.value * 5}deg)`,
    opacity: 0.4 + Math.sin(time.value * 0.8) * 0.2
  }
  
  cardTransform.value = {
    transform: `perspective(1000px) rotateX(${(mousePos.y - 0.5) * 3}deg) rotateY(${(mousePos.x - 0.5) * 3}deg)`,
    backdropFilter: `blur(${18 + Math.sin(time.value * 0.4) * 2}px) saturate(${1.2 + Math.sin(time.value * 0.5) * 0.2})`
  }
  
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

// 步骤控制
const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++
  }
}

const prevStep = () => {
  currentStep.value--
}

const validateCurrentStep = () => {
  error.value = ''
  
  if (currentStep.value === 1) {
    if (!profile.value.name) {
      error.value = '请填写姓名'
      return false
    }
  } else if (currentStep.value === 2) {
    if (!profile.value.targetPosition || !profile.value.education) {
      error.value = '请填写必填字段'
      return false
    }
  }
  
  return true
}

// 完成设置
const completeSetup = async () => {
  if (!validateCurrentStep()) return
  
  loading.value = true
  error.value = ''
  
  try {
    console.log('保存用户信息:', profile.value)
    
    // 构建简历数据格式，映射到头像选择器期待的格式
    const resumeData = {
      name: profile.value.name,
      age: profile.value.age,
      phone: profile.value.phone,
      email: '', // ProfileSetup中没有邮箱字段，设为空
      education: profile.value.education,
      workYears: profile.value.workExperience,
      experience: profile.value.workDescription,
      skills: profile.value.technicalSkills
    }
    
    // 保存用户信息到store，包括简历数据
    userStore.updateProfile({
      displayName: profile.value.name,
      resumeData: resumeData,
      // 保存原始的profile数据以备将来使用
      profileData: profile.value
    })
    
    // 模拟保存
    setTimeout(() => {
      userStore.markProfileCompleted()
      router.push('/user-dashboard')
    }, 1000)
    
  } catch (err) {
    error.value = '保存失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 动态背景系统 */
.dynamic-background {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at top, rgba(34, 139, 34, 0.3) 0%, transparent 70%),
    radial-gradient(ellipse at bottom, rgba(0, 100, 0, 0.2) 0%, transparent 70%),
    linear-gradient(135deg, #0a1f0a 0%, #1a2e1a 30%, #0f2a0f 70%, #1a3a1a 100%);
  z-index: 1;
  pointer-events: none;
}

.bubble-layer {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(144, 238, 144, 0.3) 2px, transparent 3px),
    radial-gradient(circle at 80% 70%, rgba(50, 205, 50, 0.25) 2px, transparent 3px),
    radial-gradient(ellipse 6px 4px at 30% 60%, rgba(144, 238, 144, 0.2) 50%, transparent 51%),
    radial-gradient(ellipse 4px 6px at 70% 40%, rgba(50, 205, 50, 0.15) 50%, transparent 51%);
  background-size: 100px 100px, 120px 120px, 80px 80px, 90px 90px;
  animation: profileBubbleFlow 20s linear infinite;
  will-change: transform, filter;
}

.parallax-layer {
  position: absolute;
  inset: 0;
  background: 
    conic-gradient(from 0deg at 25% 25%, transparent 60deg, rgba(144, 238, 144, 0.08) 120deg, transparent 180deg),
    conic-gradient(from 180deg at 75% 75%, transparent 60deg, rgba(50, 205, 50, 0.06) 120deg, transparent 180deg);
  background-size: 250px 250px, 180px 180px;
  animation: parallaxFlow 25s linear infinite;
  opacity: 0.7;
}

.light-scatter {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 15% 15%, rgba(144, 238, 144, 0.12) 1px, transparent 2px),
    radial-gradient(circle at 85% 85%, rgba(50, 205, 50, 0.1) 1px, transparent 2px),
    radial-gradient(circle at 50% 20%, rgba(34, 139, 34, 0.08) 1px, transparent 2px);
  background-size: 120px 120px, 150px 150px, 130px 130px;
  animation: lightScatter 30s linear infinite;
  opacity: 0.5;
}

/* 页面级样式 */
html, body {
  height: 100%;
  margin: 0;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

/* 外层包装器，撑满整个窗口 */
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100vw;
  overflow-x: hidden;
  perspective: 1000px;
  cursor: crosshair;
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', cursive, sans-serif;
}

/* 背景容器 */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

/* 让内容区撑满剩余空间并且可滚动 */
.content {
  flex: 1;
  overflow-y: auto;
  position: relative;
  z-index: 10;
  /* 给底部留出安全区，防止最后一行被 footer 遮住 */
  padding-bottom: 100px; /* ≥ footer 的高度 */
  scrollbar-width: thin;
  scrollbar-color: rgba(144, 238, 144, 0.5) transparent;
}

/* 内容区滚动条样式 */
.content::-webkit-scrollbar {
  width: 8px;
}

.content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.content::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(144, 238, 144, 0.6) 0%, rgba(50, 205, 50, 0.4) 100%);
  border-radius: 4px;
}

.content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(144, 238, 144, 0.8) 0%, rgba(50, 205, 50, 0.6) 100%);
}

/* 设置容器 */
.setup-container {
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
}



/* 欢迎头部 */
.welcome-header {
  text-align: center;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
}

.brain-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem auto;
  color: rgba(144, 238, 144, 0.9);
  animation: brainPulse 3s ease-in-out infinite;
}

.welcome-title {
  margin: 0 0 0.5rem 0;
  font-size: 2.2rem;
  font-weight: 800;
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', cursive, sans-serif;
  background: linear-gradient(135deg, #fff 0%, rgba(144, 238, 144, 0.9) 50%, #fff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.welcome-subtitle {
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

/* 进度指示器 */
.progress-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
}

.progress-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  transition: all 0.3s ease;
}

.progress-step.active .step-number {
  background: linear-gradient(135deg, rgba(144, 238, 144, 0.3) 0%, rgba(50, 205, 50, 0.2) 100%);
  border-color: rgba(144, 238, 144, 0.5);
  color: rgba(255, 255, 255, 0.95);
}

.progress-step.completed .step-number {
  background: linear-gradient(135deg, rgba(144, 238, 144, 0.4) 0%, rgba(50, 205, 50, 0.3) 100%);
  border-color: rgba(144, 238, 144, 0.7);
  color: rgba(255, 255, 255, 1);
}

.step-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', cursive, sans-serif;
  transition: color 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.progress-step.active .step-label {
  color: rgba(255, 255, 255, 0.95);
}

.progress-line {
  width: 60px;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 1rem;
  transition: background 0.3s ease;
}

.progress-line.active {
  background: linear-gradient(90deg, rgba(144, 238, 144, 0.5) 0%, rgba(50, 205, 50, 0.3) 100%);
}

/* 表单内容 */
.form-content {
  flex: 1;
  min-height: 0;
  overflow: visible;
}

/* 技能经验步骤特殊样式 */
.skills-card {
  min-height: auto !important;
  padding: 1.5rem !important;
  height: auto !important;
  max-height: none !important;
}

.skills-grid {
  gap: 2rem !important;
}

.skills-grid .glass-input textarea {
  min-height: 120px;
  max-height: 200px;
  resize: vertical;
  line-height: 1.6;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(144, 238, 144, 0.5) transparent;
}

.skills-grid .glass-input textarea::-webkit-scrollbar {
  width: 4px;
}

.skills-grid .glass-input textarea::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.skills-grid .glass-input textarea::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(144, 238, 144, 0.6) 0%, rgba(50, 205, 50, 0.4) 100%);
  border-radius: 2px;
}

.skills-grid .glass-input textarea::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(144, 238, 144, 0.8) 0%, rgba(50, 205, 50, 0.6) 100%);
}

.form-step {
  animation: slideIn 0.5s ease-out;
  overflow: visible;
}

.glass-card {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(144, 238, 144, 0.05) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(50, 205, 50, 0.03) 75%,
    rgba(255, 255, 255, 0.12) 100%);
  backdrop-filter: blur(20px) saturate(1.2) brightness(1.1);
  -webkit-backdrop-filter: blur(20px) saturate(1.2) brightness(1.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  min-height: fit-content;
}

.glass-card h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', cursive, sans-serif;
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  letter-spacing: 0.5px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.glass-input {
  position: relative;
}

.glass-input.full-width {
  grid-column: 1 / -1;
}

.glass-input label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', cursive, sans-serif;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.glass-input input,
.glass-input textarea {
  width: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(144, 238, 144, 0.12) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  padding: 0.875rem 1rem;
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.95rem;
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', sans-serif;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  resize: vertical;
}

.glass-input select {
  width: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.85) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  padding: 0.875rem 1rem;
  color: #333;
  font-size: 0.95rem;
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', sans-serif;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 下拉选项样式优化 - 更好的兼容性 */
.glass-input select option {
  color: #000 !important;           /* 设置文字颜色为黑色 */
  background-color: #fff !important; /* 设置背景为白色 */
  padding: 0.75rem 1rem;
  font-weight: 600;
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', sans-serif;
  border: none;
}

.glass-input select option:hover,
.glass-input select option:focus {
  color: #000 !important;           /* 悬停时保持黑色文字 */
  background-color: #f0f8ff !important; /* 悬停时浅蓝背景 */
}

.glass-input select option:checked,
.glass-input select option:selected {
  color: #000 !important;           /* 选中时保持黑色文字 */
  background-color: #e6f3ff !important; /* 选中时浅蓝背景 */
  font-weight: 700;
}

/* 改善select样式兼容性 */
.glass-input select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(0,0,0,0.7)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  padding-right: 3rem;
}

.glass-input select:focus {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(50,205,50,0.8)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
}

.glass-input input::placeholder,
.glass-input textarea::placeholder {
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', cursive, sans-serif;
  font-weight: 400;
  font-style: italic;
}

.glass-input input:focus,
.glass-input textarea:focus {
  outline: none;
  border-color: rgba(144, 238, 144, 0.6);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(144, 238, 144, 0.15) 100%);
  box-shadow: 0 4px 15px rgba(50, 205, 50, 0.4);
  color: rgba(255, 255, 255, 1);
}

.glass-input select:focus {
  outline: none;
  border-color: rgba(144, 238, 144, 0.6);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.9) 100%);
  box-shadow: 0 4px 15px rgba(50, 205, 50, 0.4);
  color: #222;
}

/* footer 固定在视口底部 */
.footer {
  position: fixed;
  bottom: 0;
  left: 0; 
  right: 0;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.8) 0%, 
    rgba(34, 139, 34, 0.6) 50%,
    rgba(0, 0, 0, 0.8) 100%);
  backdrop-filter: blur(20px) saturate(1.5);
  -webkit-backdrop-filter: blur(20px) saturate(1.5);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

/* 示例按钮样式 */
.btn {
  position: relative;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  border: 1px solid;
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', cursive, sans-serif;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.btn.primary {
  background: linear-gradient(135deg, rgba(144, 238, 144, 0.3) 0%, rgba(50, 205, 50, 0.2) 100%);
  border-color: rgba(144, 238, 144, 0.4);
  color: rgba(255, 255, 255, 1);
}

.btn.secondary {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(200, 200, 200, 0.1) 100%);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(50, 205, 50, 0.25);
}

.btn.primary:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(144, 238, 144, 0.4) 0%, rgba(50, 205, 50, 0.3) 100%);
  border-color: rgba(144, 238, 144, 0.5);
}

.btn:disabled {
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
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
  transition: left 0.6s ease;
}

.glass-button:hover:not(:disabled) .button-reflection {
  left: 100%;
}

/* 错误信息 */
.error-message {
  text-align: center;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(255, 99, 99, 0.15) 0%, rgba(255, 77, 77, 0.1) 100%);
  border: 1px solid rgba(255, 99, 99, 0.2);
  color: rgba(255, 200, 200, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* 动画 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes profileBubbleFlow {
  0% { 
    background-position: 0 100%, 0 100%, 0 100%, 0 100%; 
    opacity: 0.6;
  }
  50% { 
    opacity: 0.8;
  }
  100% { 
    background-position: 100px -20%, 120px -25%, 80px -30%, 90px -35%; 
    opacity: 0.5;
  }
}

@keyframes parallaxFlow {
  0% { 
    background-position: 0 0, 0 0;
    transform: rotate(0deg);
  }
  100% { 
    background-position: 250px 250px, 180px 180px;
    transform: rotate(360deg);
  }
}

@keyframes lightScatter {
  0% { 
    background-position: 0 0, 0 0, 0 0;
    opacity: 0.3;
  }
  50% { 
    opacity: 0.7;
  }
  100% { 
    background-position: 120px 120px, 150px 150px, 130px 130px;
    opacity: 0.3;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .content {
    padding-bottom: 90px; /* 移动端为固定按钮留出空间 */
  }
  
  .setup-container {
    padding: 1rem;
    gap: 1rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .skills-grid {
    gap: 1.5rem !important;
  }
  
  .progress-indicator {
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .progress-line {
    width: 2px;
    height: 20px;
    margin: 0;
  }
  
  .footer {
    height: 70px; /* 移动端稍微减小高度 */
    padding: 0.5rem 1rem;
  }
  
  .btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .welcome-header {
    margin-bottom: 1rem;
  }
  
  .skills-card {
    padding: 1rem !important;
  }
  
  .skills-grid .glass-input textarea {
    min-height: 100px;
  }
}
</style>