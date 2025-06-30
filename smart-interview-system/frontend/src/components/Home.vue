<template>
  <div class="home-container">
    <div class="home-content">
      <header class="home-header">
        <h1>智能面试辅助系统</h1>
        <div class="user-info">
          <span class="welcome-text">欢迎, {{ username }}</span>
          <button @click="logout" class="logout-btn">登出</button>
        </div>
      </header>
      
      <!-- 简历状态卡片 -->
      <div class="resume-status-card" v-if="resumeInfo">
        <div class="resume-content">
          <h3>📄 您的简历信息</h3>
          <div class="resume-summary">
            <p><strong>姓名：</strong>{{ resumeInfo.name }}</p>
            <p><strong>期望职位：</strong>{{ resumeInfo.target_position }}</p>
            <p><strong>学历：</strong>{{ resumeInfo.education }}</p>
          </div>
        </div>
        <div class="resume-actions">
          <button @click="editResume" class="edit-resume-btn">编辑简历</button>
        </div>
      </div>
      
      <main class="main-content">
        <div class="feature-grid">
          <div class="feature-card">
            <h3>🎯 开始面试</h3>
            <p>进入智能面试环节，体验AI驱动的面试流程</p>
            <button @click="startInterview" class="feature-btn">开始面试</button>
          </div>
          
          <div class="feature-card">
            <h3>📊 面试记录</h3>
            <p>查看您的历史面试记录和详细分析报告</p>
            <button class="feature-btn">查看记录</button>
          </div>
          
          <div class="feature-card">
            <h3>⚙️ 个人设置</h3>
            <p>编辑个人信息和面试偏好设置</p>
            <button @click="editResume" class="feature-btn">编辑简历</button>
          </div>
          
          <div class="feature-card">
            <h3>📚 学习中心</h3>
            <p>获取面试技巧和求职指导资源</p>
            <button class="feature-btn">学习</button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '../store/userStore'
import { useRouter } from 'vue-router'
import { getResume } from '../api/chat'

const userStore = useUserStore()
const username = computed(() => userStore.username || '用户')
const router = useRouter()
const resumeInfo = ref(null)

onMounted(async () => {
  try {
    const response = await getResume()
    if (response.data.success) {
      resumeInfo.value = response.data.data
    }
  } catch (error) {
    console.error('获取简历信息失败:', error)
  }
})

function logout() {
  if (confirm('确定要登出吗？')) {
    userStore.clearUser()
    localStorage.removeItem('token')
    router.push('/login')
  }
}

function editResume() {
  router.push('/resume')
}

function startInterview() {
  if (resumeInfo.value) {
    // 这里可以添加开始面试的逻辑
    alert('面试功能开发中，敬请期待！')
  } else {
    alert('请先完善您的简历信息')
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.home-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin: 0;
  font-size: 2rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.welcome-text {
  font-size: 1.1rem;
  color: #555;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background: #c0392b;
}

.resume-status-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid #667eea;
}

.resume-content h3 {
  color: #333;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
}

.resume-summary {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.resume-summary p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.resume-actions {
  flex-shrink: 0;
}

.edit-resume-btn {
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.edit-resume-btn:hover {
  background: #5a6fd8;
}

.main-content {
  margin-top: 2rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.feature-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.feature-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.feature-btn:hover {
  background: #5a6fd8;
}

@media (max-width: 768px) {
  .home-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style> 