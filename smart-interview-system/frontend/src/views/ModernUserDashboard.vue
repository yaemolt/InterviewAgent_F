<template>
  <div class="modern-dashboard" ref="dashboardPage" @mousemove="onMouseMove">
    <!-- 动态背景系统 -->
    <div class="dynamic-background">
      <div class="bubble-layer" :style="bubbleTransform"></div>
      <div class="parallax-layer" :style="parallaxTransform"></div>
      <div class="light-scatter" :style="lightTransform"></div>
    </div>

    <!-- 侧边栏 -->
    <div class="sidebar" :style="sidebarTransform">
      <div class="sidebar-header">
        <div class="logo-item">
          <div class="brain-icon" v-html="colorfulIcons.brain"></div>
          <span class="label">面试助手</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-item active">
          <div class="icon" v-html="colorfulIcons.home"></div>
          <span class="label">我的学习</span>
        </div>
        <div class="nav-item">
          <div class="icon" v-html="colorfulIcons.progress"></div>
          <span class="label">学习进度</span>
        </div>
        <div class="nav-item">
          <div class="icon" v-html="colorfulIcons.message"></div>
          <span class="label">消息中心</span>
        </div>
        <div class="nav-item">
          <div class="icon" v-html="colorfulIcons.courses"></div>
          <span class="label">全部课程</span>
        </div>
        <div class="nav-item" @click="logout">
          <div class="icon" v-html="colorfulIcons.logout"></div>
          <span class="label">退出登录</span>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="download-item">
          <div class="icon" v-html="colorfulIcons.download"></div>
          <span class="label">下载应用</span>
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 顶部欢迎区域 -->
      <div class="welcome-section">
        <div class="welcome-text">
          <h1 class="welcome-title">欢迎回来, {{ userStore.displayName }}!</h1>
          <p class="welcome-subtitle">您这周表现很棒，继续保持！</p>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="您想学习什么？" />
          <div class="search-icon">🔍</div>
        </div>
        <div class="user-avatar" @click="openAvatarSelector">
          <img :src="userAvatar" :alt="userStore.displayName" />
          <div class="avatar-hover-overlay">
            <span>点击编辑</span>
          </div>
        </div>
      </div>

      <!-- 统计卡片区域 -->
      <div class="stats-section">
        <h2 class="section-title">统计数据</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">{{ stats.completedCourses }}</div>
            <div class="stat-label">已完成课程</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ stats.inProgressCourses }}</div>
            <div class="stat-label">进行中课程</div>
          </div>
          <div class="stat-card">
            <div class="stat-chart">
              <div class="chart-line">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="rgba(144, 238, 144, 0.8)"
                    stroke-width="2"
                    points="0,40 20,25 40,30 60,15 80,20 100,10"
                  />
                </svg>
              </div>
              <div class="stat-number">{{ stats.weeklyHours }}</div>
              <div class="stat-label">本周学习时长</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 继续观看区域 -->
      <div class="continue-section">
        <div class="section-header">
          <h2 class="section-title">继续观看</h2>
          <div class="nav-arrows">
            <button class="nav-arrow" @click="scrollContinue('left')">‹</button>
            <button class="nav-arrow" @click="scrollContinue('right')">›</button>
          </div>
        </div>
        <div class="continue-scroll" ref="continueContainer">
          <div class="continue-card media-design">
            <div class="play-button">▶</div>
            <div class="continue-content">
              <h3>界面设计原型</h3>
              <p>35分钟</p>
            </div>
          </div>
          <div class="continue-card style-guide">
            <div class="play-button">▶</div>
            <div class="continue-content">
              <h3>找到你的风格</h3>
              <p>24分钟</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程区域 -->
      <div class="courses-section">
        <div class="section-header">
          <h2 class="section-title">您的课程</h2>
          <div class="nav-arrows">
            <button class="nav-arrow" @click="scrollCourses('left')">‹</button>
            <button class="nav-arrow" @click="scrollCourses('right')">›</button>
          </div>
        </div>
        <div class="courses-scroll" ref="coursesContainer">
          <div class="course-card mobile-design">
            <div class="course-image">
              <div class="course-icon">📱</div>
            </div>
            <div class="course-content">
              <h3>移动应用设计</h3>
              <p class="course-author">by Simple Studio</p>
              <div class="course-progress">
                <div class="progress-circle">
                  <svg viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="2"/>
                    <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(106, 90, 205, 0.8)" stroke-width="2"
                            stroke-dasharray="28.3" stroke-dashoffset="20" stroke-linecap="round"/>
                  </svg>
                  <span class="progress-text">26%</span>
                </div>
                <div class="course-stats">
                  <div>12/45 课程</div>
                  <div>4/15 任务</div>
                </div>
              </div>
            </div>
          </div>

          <div class="course-card illustration">
            <div class="course-image">
              <div class="course-icon">🎨</div>
            </div>
            <div class="course-content">
              <h3>插画设计</h3>
              <p class="course-author">by Mia Anderson</p>
              <div class="course-progress">
                <div class="progress-circle">
                  <svg viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="2"/>
                    <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(72, 187, 120, 0.8)" stroke-width="2"
                            stroke-dasharray="73.3" stroke-dashoffset="25.6" stroke-linecap="round"/>
                  </svg>
                  <span class="progress-text">65%</span>
                </div>
                <div class="course-stats">
                  <div>24/37 课程</div>
                  <div>8/12 任务</div>
                </div>
              </div>
            </div>
          </div>

          <div class="course-card ux-design">
            <div class="course-image">
              <div class="course-icon">💻</div>
            </div>
            <div class="course-content">
              <h3>UX/UI 设计</h3>
              <p class="course-author">by Horizon</p>
              <div class="course-progress">
                <div class="progress-circle">
                  <svg viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="2"/>
                    <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(56, 178, 172, 0.8)" stroke-width="2"
                            stroke-dasharray="113" stroke-dashoffset="0" stroke-linecap="round"/>
                  </svg>
                  <span class="progress-text">100%</span>
                </div>
                <div class="course-stats">
                  <div>51/51 课程</div>
                  <div>完成</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 头像选择器 -->
    <AvatarSelector 
      :isVisible="showAvatarSelector" 
      @close="closeAvatarSelector"
      @save="onAvatarSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useUserStore } from '../store/userStore'
import { useRouter } from 'vue-router'
import AvatarSelector from '../components/AvatarSelector.vue'
import { colorfulIcons } from '../assets/colorful-icons.js'

const userStore = useUserStore()
const router = useRouter()

// 数据
const stats = ref({
  completedCourses: 2,
  inProgressCourses: 4,
  weeklyHours: 7.5
})

// 用户头像
const userAvatar = computed(() => {
  // 如果用户有自定义头像，使用自定义头像
  if (userStore.avatar) {
    return userStore.avatar
  }
  // 否则使用默认生成的头像
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(userStore.displayName)}&background=6A5ACD&color=fff&size=64`
})

// 头像选择器状态
const showAvatarSelector = ref(false)

// 打开头像选择器
const openAvatarSelector = () => {
  showAvatarSelector.value = true
}

// 关闭头像选择器
const closeAvatarSelector = () => {
  showAvatarSelector.value = false
}

// 头像保存完成回调
const onAvatarSave = (profileData) => {
  console.log('头像保存完成:', profileData)
  // 这里可以添加额外的处理逻辑，比如显示成功提示
}

// 动态效果状态
const dashboardPage = ref(null)
const continueContainer = ref(null)
const coursesContainer = ref(null)
const time = ref(0)
const mousePos = ref({ x: 0.5, y: 0.5 })
let animationFrame = null

// 退出登录
const logout = () => {
  userStore.clearUser()
  router.push('/login')
}

// 鼠标跟随效果
const onMouseMove = (e) => {
  if (!dashboardPage.value) return
  
  const rect = dashboardPage.value.getBoundingClientRect()
  mousePos.x = (e.clientX - rect.left) / rect.width
  mousePos.y = (e.clientY - rect.top) / rect.height
}

// 动态变换计算
const bubbleTransform = ref({
  transform: `translate3d(0px, 0px, 0px)`,
  filter: `blur(8px) hue-rotate(0deg)`
})

const parallaxTransform = ref({
  transform: `translate3d(0px, 0px, 0px) scale(1.01)`,
  opacity: 0.6
})

const lightTransform = ref({
  transform: `translate3d(0px, 0px, 0px) rotate(0deg)`,
  opacity: 0.4
})

const sidebarTransform = ref({
  transform: `perspective(800px) rotateY(0deg)`,
  backdropFilter: `blur(15px) saturate(1.1)`
})

// 动画循环
const animate = () => {
  time.value += 0.012
  
  const parallaxX = (mousePos.x - 0.5) * 15
  const parallaxY = (mousePos.y - 0.5) * 15
  
  bubbleTransform.value = {
    transform: `translate3d(${parallaxX * 0.2}px, ${parallaxY * 0.2 + Math.sin(time.value * 0.4) * 2}px, 0px)`,
    filter: `blur(${8 + Math.sin(time.value * 0.3) * 1}px) hue-rotate(${Math.sin(time.value * 0.1) * 15}deg)`
  }
  
  parallaxTransform.value = {
    transform: `translate3d(${parallaxX * 0.4}px, ${parallaxY * 0.4}px, 0px) scale(${1.01 + Math.sin(time.value * 0.3) * 0.005})`,
    opacity: 0.6 + Math.sin(time.value * 0.5) * 0.1
  }
  
  lightTransform.value = {
    transform: `translate3d(${parallaxX * 0.6}px, ${parallaxY * 0.6}px, 0px) rotate(${time.value * 3}deg)`,
    opacity: 0.4 + Math.sin(time.value * 0.7) * 0.1
  }
  
  sidebarTransform.value = {
    transform: `perspective(800px) rotateY(${(mousePos.x - 0.5) * 2}deg)`,
    backdropFilter: `blur(${15 + Math.sin(time.value * 0.3) * 2}px) saturate(${1.1 + Math.sin(time.value * 0.4) * 0.1})`
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

// 滑动功能
const scrollContinue = (direction) => {
  const container = continueContainer.value
  if (!container) return
  
  const scrollAmount = 320
  const currentScroll = container.scrollLeft
  const targetScroll = direction === 'left' 
    ? Math.max(0, currentScroll - scrollAmount)
    : currentScroll + scrollAmount
  
  container.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  })
}

const scrollCourses = (direction) => {
  const container = coursesContainer.value
  if (!container) return
  
  const scrollAmount = 350
  const currentScroll = container.scrollLeft
  const targetScroll = direction === 'left' 
    ? Math.max(0, currentScroll - scrollAmount)
    : currentScroll + scrollAmount
  
  container.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
/* 全屏Dashboard容器 */
.modern-dashboard {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
}

/* 动态背景系统 */
.dynamic-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.bubble-layer {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(106, 90, 205, 0.1) 3px, transparent 4px),
    radial-gradient(circle at 80% 70%, rgba(72, 187, 120, 0.08) 2px, transparent 3px),
    radial-gradient(ellipse 8px 6px at 30% 60%, rgba(56, 178, 172, 0.06) 50%, transparent 51%),
    radial-gradient(ellipse 6px 8px at 70% 40%, rgba(139, 69, 19, 0.04) 50%, transparent 51%);
  background-size: 150px 150px, 120px 120px, 100px 100px, 80px 80px;
  animation: dashboardBubbleFlow 25s linear infinite;
}

.parallax-layer {
  position: absolute;
  inset: 0;
  background: 
    conic-gradient(from 0deg at 25% 25%, transparent 60deg, rgba(106, 90, 205, 0.05) 120deg, transparent 180deg),
    conic-gradient(from 180deg at 75% 75%, transparent 60deg, rgba(72, 187, 120, 0.04) 120deg, transparent 180deg);
  background-size: 300px 300px, 200px 200px;
  animation: parallaxFlow 30s linear infinite;
}

.light-scatter {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 15% 15%, rgba(255, 182, 193, 0.08) 1px, transparent 2px),
    radial-gradient(circle at 85% 85%, rgba(173, 216, 230, 0.06) 1px, transparent 2px),
    radial-gradient(circle at 50% 20%, rgba(238, 130, 238, 0.04) 1px, transparent 2px);
  background-size: 180px 180px, 220px 220px, 160px 160px;
  animation: lightScatter 35s linear infinite;
}

/* 侧边栏 - 收缩式设计 */
.sidebar {
  position: relative;
  z-index: 10;
  width: 60px;
  background: linear-gradient(135deg, 
    rgba(106, 90, 205, 0.45) 0%, 
    rgba(72, 187, 120, 0.4) 50%,
    rgba(106, 90, 205, 0.42) 100%);
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);
  overflow: visible;
}

.sidebar-header {
  margin-bottom: 2rem;
  padding: 0 1rem;
}

/* Logo项目样式 */
.logo-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 60px;
  height: 50px;
  padding: 0 8px;
  margin-bottom: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: width 0.3s ease;
}

.logo-item .brain-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  filter: brightness(1.2) contrast(1.2);
}

.logo-item .label {
  margin-left: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s 0.1s;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 700;
  font-size: 15px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1;
}

.logo-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px) saturate(2);
  -webkit-backdrop-filter: blur(12px) saturate(2);
  transform-origin: left center;
  transform: skewX(-20deg) scaleX(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.logo-item:hover {
  width: 180px;
}

.logo-item:hover .label {
  opacity: 1;
}

.logo-item:hover::before {
  transform: skewX(-20deg) scaleX(2.5);
}

/* 导航项目样式 */
.nav-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 60px;
  height: 50px;
  padding: 0 8px;
  margin-bottom: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: width 0.3s ease;
}

.nav-item .icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.nav-item .icon svg {
  width: 24px;
  height: 24px;
  filter: brightness(1.3) contrast(1.2);
  transition: filter 0.3s ease;
}

.nav-item .label {
  margin-left: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s 0.1s;
  color: rgba(255, 255, 255, 0.95);
  font-size: 14px;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1;
}

.nav-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px) saturate(2);
  -webkit-backdrop-filter: blur(12px) saturate(2);
  transform-origin: left center;
  transform: skewX(-20deg) scaleX(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.nav-item:hover {
  width: 180px;
}

.nav-item:hover .label {
  opacity: 1;
}

.nav-item:hover::before {
  transform: skewX(-20deg) scaleX(2.5);
}

.nav-item:hover .icon svg {
  filter: brightness(1.5) contrast(1.3);
}

/* 添加激活状态样式 */
.nav-item.active::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 70%;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* 优化背景动画 */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.sidebar {
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
}

.sidebar-footer {
  margin-top: 2rem;
  padding: 0 1rem;
}

/* 下载项目样式 */
.download-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 50px;
  width: 50px;
  padding: 0 13px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
}

.download-item .icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.download-item .icon svg {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
}

.download-item .label {
  white-space: nowrap;
  margin-left: 12px;
  opacity: 0;
  visibility: hidden;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-10px);
}

.download-item:hover {
  width: 200px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15);
  transform: translateX(5px);
}

.download-item:hover .label {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.download-item:hover .icon {
  transform: scale(1.1);
}

.download-item:hover .icon svg {
  filter: brightness(1.2) saturate(1.3);
}

.download-arrow {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
}

/* 主内容区域 */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
}

/* 顶部欢迎区域 */
.welcome-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.welcome-text h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
}

.welcome-text p {
  margin: 0;
  color: #718096;
  font-size: 1rem;
}

.search-bar {
  position: relative;
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;
}

.search-bar input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-size: 0.95rem;
  color: #2d3748;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.search-bar input::placeholder {
  color: #a0aec0;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 1.1rem;
}

.user-avatar {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid rgba(255, 255, 255, 0.4);
}

.user-avatar:hover {
  border-color: rgba(144, 238, 144, 0.8);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(144, 238, 144, 0.3);
}

.user-avatar:hover .avatar-hover-overlay {
  opacity: 1;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 0.7rem;
  font-weight: 600;
  text-align: center;
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', cursive, sans-serif;
}

/* 统计区域 */
.stats-section {
  margin-bottom: 2.5rem;
}

.section-title {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #718096;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-chart {
  position: relative;
}

.chart-line {
  height: 60px;
  margin-bottom: 1rem;
}

.chart-line svg {
  width: 100%;
  height: 100%;
}

/* 继续观看和课程区域 */
.continue-section,
.courses-section {
  margin-bottom: 2.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.nav-arrows {
  display: flex;
  gap: 0.5rem;
}

.nav-arrow {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #4a5568;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-arrow:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.continue-scroll,
.courses-scroll {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.continue-scroll::-webkit-scrollbar,
.courses-scroll::-webkit-scrollbar {
  display: none;
}

/* 继续观看卡片 */
.continue-card {
  min-width: 300px;
  height: 180px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.continue-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.continue-card.media-design {
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
}

.continue-card.style-guide {
  background: linear-gradient(135deg, #48cae4 0%, #0077b6 100%);
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #2d3748;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.continue-content {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  color: white;
}

.continue-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.continue-content p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

/* 课程卡片 */
.course-card {
  min-width: 320px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.course-image {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.course-card.mobile-design .course-image {
  background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
}

.course-card.illustration .course-image {
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
}

.course-card.ux-design .course-image {
  background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
}

.course-icon {
  font-size: 3rem;
}

.course-content {
  padding: 1.5rem;
}

.course-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
}

.course-author {
  margin: 0 0 1rem 0;
  color: #718096;
  font-size: 0.9rem;
}

.course-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-circle {
  position: relative;
  width: 40px;
  height: 40px;
}

.progress-circle svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: #2d3748;
}

.course-stats {
  flex: 1;
  font-size: 0.85rem;
  color: #718096;
}

.course-stats div {
  margin-bottom: 0.25rem;
}

/* 动画 */
@keyframes dashboardBubbleFlow {
  0% { 
    background-position: 0 100%, 0 100%, 0 100%, 0 100%; 
    opacity: 0.8;
  }
  50% { 
    opacity: 1;
  }
  100% { 
    background-position: 150px -20%, 120px -25%, 100px -30%, 80px -35%; 
    opacity: 0.7;
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
    background-position: 0 0, 0 0, 0 0;
    opacity: 0.5;
  }
  50% { 
    opacity: 0.8;
  }
  100% { 
    background-position: 180px 180px, 220px 220px, 160px 160px;
    opacity: 0.4;
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-content {
    padding: 1.5rem;
  }
  
  .welcome-section {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .search-bar {
    margin: 0;
    max-width: none;
  }
  
  /* 在中等屏幕上，hover展开的宽度稍微小一点 */
  .nav-item:hover,
  .nav-item.active,
  .logo-item:hover,
  .download-item:hover {
    width: 180px;
    transform: translateX(3px);
  }
}

@media (max-width: 768px) {
  .modern-dashboard {
    flex-direction: column;
  }
  
  /* 移动端侧边栏变为水平布局 */
  .sidebar {
    width: 100%;
    height: auto;
    flex-direction: row;
    padding: 1rem;
    overflow-x: auto;
  }
  
  .sidebar-header {
    margin-bottom: 0;
    margin-right: 1rem;
    padding: 0;
  }
  
  /* 移动端Logo */
  .logo-item {
    width: auto;
    height: 40px;
    padding: 0 0.5rem;
    margin-bottom: 0;
  }
  
  .logo-item .label {
    opacity: 1;
    margin-left: 8px;
    font-size: 1rem;
  }
  
  .logo-item:hover {
    width: auto;
  }
  
  /* 移动端导航 */
  .sidebar-nav {
    flex-direction: row;
    flex: 1;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0;
  }
  
  .nav-item {
    min-width: max-content;
    width: auto;
    height: 40px;
    padding: 0 0.75rem;
    margin-bottom: 0;
    overflow: visible;
  }
  
  .nav-item .label {
    opacity: 1;
    margin-left: 8px;
    font-size: 13px;
  }
  
  .nav-item:hover,
  .nav-item.active {
    width: auto;
  }
  
  /* 移动端隐藏下载区域 */
  .sidebar-footer {
    display: none;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  /* 超小屏幕优化 */
  .nav-item .label,
  .logo-item .label {
    font-size: 12px;
  }
  
  .sidebar {
    padding: 0.75rem;
  }
  
  .nav-item {
    padding: 0 0.5rem;
    height: 36px;
  }
  
  .logo-item {
    padding: 0 0.25rem;
    height: 36px;
  }
}
</style>