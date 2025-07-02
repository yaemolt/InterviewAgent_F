<template>
  <div class="user-dashboard">
    <header class="dashboard-header">
      <h1>面试系统 - 用户中心</h1>
      <div class="user-info">
        <span>欢迎, {{ userStore.displayName }}</span>
        <button @click="logout" class="logout-btn">退出登录</button>
      </div>
    </header>

    <div class="dashboard-content">
      <div class="welcome-section">
        <h2>👋 欢迎回来，{{ userStore.displayName }}！</h2>
        <p>准备好开始你的面试练习了吗？</p>
      </div>

      <div class="quick-actions">
        <div class="action-card primary">
          <h3>🎯 开始面试</h3>
          <p>进行模拟面试，提升你的面试技能</p>
          <button class="action-btn">立即开始</button>
        </div>
        
        <div class="action-card">
          <h3>📝 完善简历</h3>
          <p>更新你的个人信息和简历内容</p>
          <button class="action-btn">编辑简历</button>
        </div>
        
        <div class="action-card">
          <h3>📊 查看报告</h3>
          <p>查看你的面试历史和分析报告</p>
          <button class="action-btn">查看报告</button>
        </div>
      </div>

      <div class="user-sections">
        <div class="section">
          <h2>我的面试记录</h2>
          <div class="interview-list">
            <div class="interview-item">
              <div class="interview-info">
                <h4>技术面试 - JavaScript</h4>
                <span class="interview-date">2025-01-15</span>
              </div>
              <div class="interview-score">
                <span class="score">85分</span>
                <span class="status completed">已完成</span>
              </div>
            </div>
            
            <div class="interview-item">
              <div class="interview-info">
                <h4>行为面试 - 团队协作</h4>
                <span class="interview-date">2025-01-10</span>
              </div>
              <div class="interview-score">
                <span class="score">78分</span>
                <span class="status completed">已完成</span>
              </div>
            </div>
            
            <div class="interview-item">
              <div class="interview-info">
                <h4>技术面试 - React</h4>
                <span class="interview-date">2025-01-08</span>
              </div>
              <div class="interview-score">
                <span class="score">92分</span>
                <span class="status completed">已完成</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>推荐练习</h2>
          <div class="recommendations">
            <div class="recommendation-item">
              <h4>🔥 前端开发面试题</h4>
              <p>涵盖HTML、CSS、JavaScript等核心知识点</p>
              <button class="recommendation-btn">开始练习</button>
            </div>
            
            <div class="recommendation-item">
              <h4>💼 职场沟通技巧</h4>
              <p>提升你的沟通能力和表达技巧</p>
              <button class="recommendation-btn">开始练习</button>
            </div>
            
            <div class="recommendation-item">
              <h4>🧠 算法与数据结构</h4>
              <p>常见算法问题和解题思路</p>
              <button class="recommendation-btn">开始练习</button>
            </div>
          </div>
        </div>
      </div>

      <div class="progress-section">
        <h2>学习进度</h2>
        <div class="progress-stats">
          <div class="progress-item">
            <span class="progress-label">面试完成数</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 60%"></div>
            </div>
            <span class="progress-value">12/20</span>
          </div>
          
          <div class="progress-item">
            <span class="progress-label">平均分数</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 85%"></div>
            </div>
            <span class="progress-value">85分</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../store/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function logout() {
  userStore.clearUser()
  router.push('/login')
}
</script>

<style scoped>
.user-dashboard {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.dashboard-header {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.dashboard-header h1 {
  margin: 0;
  font-size: 1.8rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background: rgba(255,255,255,0.3);
}

.dashboard-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  text-align: center;
}

.welcome-section h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.5rem;
}

.welcome-section p {
  margin: 0;
  color: #666;
  font-size: 1.1rem;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.action-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s;
}

.action-card:hover {
  transform: translateY(-2px);
}

.action-card.primary {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
}

.action-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.action-card p {
  margin: 0 0 1rem 0;
  opacity: 0.8;
}

.action-btn {
  background: rgba(255,255,255,0.2);
  color: inherit;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-card:not(.primary) .action-btn {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.action-btn:hover {
  background: rgba(255,255,255,0.3);
}

.action-card:not(.primary) .action-btn:hover {
  background: #45a049;
}

.user-sections {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section h2 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.2rem;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 0.5rem;
}

.interview-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.interview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.interview-item:hover {
  border-color: #4CAF50;
}

.interview-info h4 {
  margin: 0 0 0.25rem 0;
  color: #333;
}

.interview-date {
  color: #666;
  font-size: 0.9rem;
}

.interview-score {
  text-align: right;
}

.score {
  display: block;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 0.25rem;
}

.status {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
}

.status.completed {
  background: #d4edda;
  color: #155724;
}

.recommendations {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recommendation-item {
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 4px;
}

.recommendation-item h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.recommendation-item p {
  margin: 0 0 0.75rem 0;
  color: #666;
  font-size: 0.9rem;
}

.recommendation-btn {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.recommendation-btn:hover {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.progress-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.progress-section h2 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.2rem;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 0.5rem;
}

.progress-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-label {
  min-width: 100px;
  color: #666;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s;
}

.progress-value {
  min-width: 60px;
  text-align: right;
  font-weight: bold;
  color: #4CAF50;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .dashboard-content {
    padding: 1rem;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
  }
  
  .user-sections {
    grid-template-columns: 1fr;
  }
  
  .progress-item {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .progress-value {
    text-align: left;
  }
}
</style> 