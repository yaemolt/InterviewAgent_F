<template>
  <div class="admin-dashboard">
    <header class="dashboard-header">
      <h1>管理员控制台</h1>
      <div class="user-info">
        <span>欢迎, {{ userStore.displayName }}</span>
        <button @click="showProfileModal" class="profile-btn">个人信息</button>
        <button @click="logout" class="logout-btn">退出登录</button>
      </div>
    </header>

    <div class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>普通用户</h3>
          <p class="stat-number">{{ stats.total_users }}</p>
        </div>
        <div class="stat-card">
          <h3>管理员</h3>
          <p class="stat-number">{{ stats.total_admins }}</p>
        </div>
        <div class="stat-card">
          <h3>面试总数</h3>
          <p class="stat-number">{{ stats.total_interviews }}</p>
        </div>
        <div class="stat-card">
          <h3>已完成面试</h3>
          <p class="stat-number">{{ stats.completed_interviews }}</p>
        </div>
        <div class="stat-card">
          <h3>待审核</h3>
          <p class="stat-number">{{ stats.pending_reviews }}</p>
        </div>
        <div class="stat-card">
          <h3>成功率</h3>
          <p class="stat-number">{{ stats.success_rate }}</p>
        </div>
        <div class="stat-card">
          <h3>系统状态</h3>
          <p class="stat-number status-text">{{ stats.system_status }}</p>
        </div>
      </div>

      <div class="admin-sections">
        <div class="section">
          <h2>用户管理</h2>
          <div class="section-content">
            <button class="action-btn">查看所有用户</button>
            <button class="action-btn">添加新用户</button>
            <button class="action-btn">用户权限管理</button>
          </div>
        </div>

        <div class="section">
          <h2>面试管理</h2>
          <div class="section-content">
            <button class="action-btn">面试题库管理</button>
            <button class="action-btn">面试配置</button>
            <button class="action-btn">面试记录查看</button>
          </div>
        </div>

        <div class="section">
          <h2>系统设置</h2>
          <div class="section-content">
            <button class="action-btn">系统配置</button>
            <button class="action-btn">数据备份</button>
            <button class="action-btn">日志查看</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 个人信息修改模态框 -->
    <div v-if="showProfile" class="modal-overlay" @click="closeProfileModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>个人信息修改</h3>
          <button @click="closeProfileModal" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="updateProfile" class="profile-form">
          <div class="form-group">
            <label>当前用户名</label>
            <input type="text" v-model="profileForm.currentUsername" readonly class="readonly-input">
          </div>
          
          <div class="form-group">
            <label>新用户名</label>
            <input 
              type="text" 
              v-model="profileForm.newUsername" 
              placeholder="输入新用户名（留空则不修改）"
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label>新密码</label>
            <input 
              type="password" 
              v-model="profileForm.newPassword" 
              placeholder="输入新密码（留空则不修改）"
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label>确认新密码</label>
            <input 
              type="password" 
              v-model="profileForm.confirmPassword" 
              placeholder="再次输入新密码"
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label>显示名称</label>
            <input 
              type="text" 
              v-model="profileForm.newName" 
              placeholder="输入显示名称（留空则不修改）"
              class="form-input"
            >
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeProfileModal" class="cancel-btn">取消</button>
            <button type="submit" class="save-btn" :disabled="updateLoading">
              {{ updateLoading ? '保存中...' : '保存修改' }}
            </button>
          </div>
          
          <p v-if="profileError" class="error-message">{{ profileError }}</p>
          <p v-if="profileSuccess" class="success-message">{{ profileSuccess }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../store/userStore'
import { useRouter } from 'vue-router'
import axios from 'axios'

const userStore = useUserStore()
const router = useRouter()

const stats = ref({
  total_users: 0,
  total_admins: 0,
  total_interviews: 0,
  completed_interviews: 0,
  pending_reviews: 0,
  success_rate: '0%',
  system_status: '加载中...'
})

// 个人信息修改相关
const showProfile = ref(false)
const updateLoading = ref(false)
const profileError = ref('')
const profileSuccess = ref('')
const profileForm = ref({
  currentUsername: '',
  newUsername: '',
  newPassword: '',
  confirmPassword: '',
  newName: ''
})

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/admin/stats', {
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      }
    })
    stats.value = response.data
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
})

function showProfileModal() {
  profileForm.value = {
    currentUsername: userStore.username,
    newUsername: '',
    newPassword: '',
    confirmPassword: '',
    newName: ''
  }
  profileError.value = ''
  profileSuccess.value = ''
  showProfile.value = true
}

function closeProfileModal() {
  showProfile.value = false
  profileForm.value = {
    currentUsername: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: '',
    newName: ''
  }
  profileError.value = ''
  profileSuccess.value = ''
}

async function updateProfile() {
  profileError.value = ''
  profileSuccess.value = ''
  
  // 验证密码确认
  if (profileForm.value.newPassword && profileForm.value.newPassword !== profileForm.value.confirmPassword) {
    profileError.value = '两次输入的密码不一致'
    return
  }
  
  // 检查是否有要修改的内容
  if (!profileForm.value.newUsername && !profileForm.value.newPassword && !profileForm.value.newName) {
    profileError.value = '请至少修改一项信息'
    return
  }
  
  updateLoading.value = true
  
  try {
    const response = await axios.put('http://localhost:5000/api/user/profile', {
      current_username: profileForm.value.currentUsername,
      new_username: profileForm.value.newUsername || null,
      new_password: profileForm.value.newPassword || null,
      new_name: profileForm.value.newName || null
    }, {
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      }
    })
    
    // 更新本地用户信息
    if (response.data.token) {
      const userData = {
        username: response.data.username,
        name: response.data.name,
        role: response.data.role,
        token: response.data.token
      }
      
      // 更新localStorage和store
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', response.data.token)
      userStore.setUser(userData)
    }
    
    profileSuccess.value = response.data.message
    setTimeout(() => {
      closeProfileModal()
    }, 1500)
    
  } catch (error) {
    profileError.value = error.response?.data?.message || '修改失败，请重试'
  } finally {
    updateLoading.value = false
  }
}

function logout() {
  userStore.clearUser()
  router.push('/login')
}
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.dashboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

.profile-btn {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 0.5rem;
}

.profile-btn:hover {
  background: rgba(255,255,255,0.3);
}

.logout-btn:hover {
  background: rgba(255,255,255,0.3);
}

.dashboard-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-card h3 {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  color: #667eea;
}

.status-text {
  font-size: 1.2rem !important;
  color: #28a745 !important;
}

.admin-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
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
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.action-btn:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

  /* 模态框样式 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e9ecef;
    background: #f8f9fa;
    border-radius: 8px 8px 0 0;
  }

  .modal-header h3 {
    margin: 0;
    color: #333;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn:hover {
    color: #333;
  }

  .profile-form {
    padding: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }

  .form-input, .readonly-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }

  .form-input:focus {
    outline: none;
    border-color: #667eea;
  }

  .readonly-input {
    background: #f8f9fa;
    color: #666;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }

  .cancel-btn {
    background: #6c757d;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .cancel-btn:hover {
    background: #5a6268;
  }

  .save-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .save-btn:hover:not(:disabled) {
    background: #5a6fd8;
  }

  .save-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .error-message {
    color: #e74c3c;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 0;
  }

  .success-message {
    color: #28a745;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 0;
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
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .admin-sections {
      grid-template-columns: 1fr;
    }

    .modal-content {
      margin: 1rem;
      max-width: calc(100% - 2rem);
    }

    .form-actions {
      flex-direction: column;
    }
  }
</style> 