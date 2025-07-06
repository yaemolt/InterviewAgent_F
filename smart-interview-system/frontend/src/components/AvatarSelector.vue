<template>
  <div class="avatar-selector-overlay" v-if="isVisible" @click="closeSelector">
    <div class="avatar-selector modal" @click.stop>
      <!-- 固定头部 -->
      <div class="selector-header">
        <h3>个人信息设置</h3>
        <button class="close-btn" @click="closeSelector">×</button>
      </div>

      <!-- 标签页切换 -->
      <div class="tab-navigation">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'avatar' }"
          @click="activeTab = 'avatar'"
        >
          头像设置
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'resume' }"
          @click="activeTab = 'resume'"
        >
          简历管理
        </button>
      </div>
      
      <!-- 可滚动的内容区域 -->
      <div class="modal-body">
        <!-- 头像设置标签页 -->
        <div v-if="activeTab === 'avatar'" class="tab-content">
          <!-- 当前头像显示 -->
          <div class="current-avatar-section">
            <div class="current-avatar">
              <img :src="currentAvatar" :alt="userStore.displayName" />
              <div class="avatar-overlay">
                <span>点击选择新头像</span>
              </div>
            </div>
          </div>

          <!-- 头像选择网格 -->
          <div class="avatar-options">
            <h4>选择头像</h4>
            <div class="avatar-grid">
              <div 
                v-for="avatar in avatarOptions" 
                :key="avatar.id"
                class="avatar-option"
                :class="{ active: selectedAvatarId === avatar.id }"
                @click="selectAvatar(avatar.id)"
              >
                <img :src="avatar.url" :alt="avatar.name" />
                <div class="avatar-name">{{ avatar.name }}</div>
              </div>
            </div>
          </div>

          <!-- 个人信息编辑 -->
          <div class="profile-edit">
            <h4>个人信息</h4>
            <div class="form-group">
              <label>显示名称</label>
              <input 
                v-model="displayName" 
                type="text" 
                placeholder="请输入您的显示名称"
                class="input-field"
              />
            </div>
            <div class="form-group">
              <label>个人签名</label>
              <textarea 
                v-model="bio" 
                placeholder="写一段简短的个人介绍..."
                class="textarea-field"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- 简历管理标签页 -->
        <div v-if="activeTab === 'resume'" class="tab-content">
          <div class="resume-section">
            <h4>个人简历</h4>
            
            <!-- 基本信息 -->
            <div class="resume-basic-info">
              <h5>基本信息</h5>
              <div class="form-row">
                <div class="form-group half">
                  <label>姓名</label>
                  <input 
                    v-model="resumeData.name" 
                    type="text" 
                    placeholder="请输入真实姓名"
                    class="input-field"
                  />
                </div>
                <div class="form-group half">
                  <label>年龄</label>
                  <input 
                    v-model="resumeData.age" 
                    type="number" 
                    placeholder="年龄"
                    class="input-field"
                  />
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group half">
                  <label>联系电话</label>
                  <input 
                    v-model="resumeData.phone" 
                    type="tel" 
                    placeholder="请输入联系电话"
                    class="input-field"
                  />
                </div>
                <div class="form-group half">
                  <label>邮箱地址</label>
                  <input 
                    v-model="resumeData.email" 
                    type="email" 
                    placeholder="请输入邮箱地址"
                    class="input-field"
                  />
                </div>
              </div>

              <div class="form-group">
                <label>学历背景</label>
                <select v-model="resumeData.education" class="input-field">
                  <option value="">请选择学历</option>
                  <option value="高中">高中</option>
                  <option value="大专">大专</option>
                  <option value="本科">本科</option>
                  <option value="硕士">硕士</option>
                  <option value="博士">博士</option>
                </select>
              </div>
            </div>

            <!-- 工作经验 -->
            <div class="resume-experience">
              <h5>工作经验</h5>
              <div class="form-group">
                <label>工作年限</label>
                <select v-model="resumeData.workYears" class="input-field">
                  <option value="">请选择工作年限</option>
                  <option value="应届毕业生">应届毕业生</option>
                  <option value="1年以下">1年以下</option>
                  <option value="1-3年">1-3年</option>
                  <option value="3-5年">3-5年</option>
                  <option value="5-10年">5-10年</option>
                  <option value="10年以上">10年以上</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>工作经历</label>
                <textarea 
                  v-model="resumeData.experience" 
                  placeholder="请描述您的主要工作经历和职责..."
                  class="textarea-field"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <!-- 技能专长 -->
            <div class="resume-skills">
              <h5>技能专长</h5>
              <div class="form-group">
                <label>专业技能</label>
                <textarea 
                  v-model="resumeData.skills" 
                  placeholder="请列出您的专业技能和特长..."
                  class="textarea-field"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <!-- 简历预览 -->
            <div v-if="hasResumeData" class="resume-preview">
              <h5>简历预览</h5>
              <div class="preview-card">
                <div class="preview-header">
                  <h6>{{ resumeData.name || '姓名' }}</h6>
                  <div class="preview-contact">
                    <span v-if="resumeData.age">{{ resumeData.age }}岁</span>
                    <span v-if="resumeData.phone">{{ resumeData.phone }}</span>
                    <span v-if="resumeData.email">{{ resumeData.email }}</span>
                  </div>
                </div>
                
                <div class="preview-section" v-if="resumeData.education || resumeData.workYears">
                  <strong>基本信息：</strong>
                  <span v-if="resumeData.education">{{ resumeData.education }}</span>
                  <span v-if="resumeData.workYears">{{ resumeData.workYears }}工作经验</span>
                </div>
                
                <div class="preview-section" v-if="resumeData.experience">
                  <strong>工作经历：</strong>
                  <p>{{ resumeData.experience }}</p>
                </div>
                
                <div class="preview-section" v-if="resumeData.skills">
                  <strong>专业技能：</strong>
                  <p>{{ resumeData.skills }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 固定底部按钮 -->
      <div class="modal-footer">
        <button class="btn cancel" @click="closeSelector">取消</button>
        <button class="btn save" @click="saveChanges" :disabled="loading">
          {{ loading ? '保存中...' : '保存更改' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '../store/userStore'
import { avatarData } from '../assets/avatars/avatar-data.js'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const userStore = useUserStore()
const loading = ref(false)
const selectedAvatarId = ref(1)
const displayName = ref(userStore.displayName)
const bio = ref(userStore.bio || '')

// 标签页管理
const activeTab = ref('avatar')

// 简历数据初始化函数
const initializeResumeData = () => {
  // 优先使用已格式化的简历数据
  if (userStore.resumeData) {
    return {
      name: userStore.resumeData.name || '',
      age: userStore.resumeData.age || '',
      phone: userStore.resumeData.phone || '',
      email: userStore.resumeData.email || '',
      education: userStore.resumeData.education || '',
      workYears: userStore.resumeData.workYears || '',
      experience: userStore.resumeData.experience || '',
      skills: userStore.resumeData.skills || ''
    }
  }
  
  // 如果没有简历数据，但有原始表单数据，则转换格式
  if (userStore.profileData) {
    return {
      name: userStore.profileData.name || '',
      age: userStore.profileData.age || '',
      phone: userStore.profileData.phone || '',
      email: '', // 原始数据中没有邮箱
      education: userStore.profileData.education || '',
      workYears: userStore.profileData.workExperience || '',
      experience: userStore.profileData.workDescription || '',
      skills: userStore.profileData.technicalSkills || ''
    }
  }
  
  // 都没有的话返回空数据
  return {
    name: '',
    age: '',
    phone: '',
    email: '',
    education: '',
    workYears: '',
    experience: '',
    skills: ''
  }
}

// 简历数据
const resumeData = ref(initializeResumeData())

// 头像选项配置 - 使用本地头像数据
const avatarOptions = ref(avatarData.map(avatar => ({
  id: avatar.id,
  name: avatar.name,
  url: avatar.data,
  style: avatar.style
})))

// 当前选中的头像URL
const currentAvatar = computed(() => {
  const selected = avatarOptions.value.find(avatar => avatar.id === selectedAvatarId.value)
  return selected ? selected.url : avatarOptions.value[0].url
})

// 检查是否有简历数据
const hasResumeData = computed(() => {
  return resumeData.value.name || resumeData.value.age || resumeData.value.phone || 
         resumeData.value.email || resumeData.value.education || resumeData.value.workYears ||
         resumeData.value.experience || resumeData.value.skills
})

// 监听用户store变化
watch(() => userStore.avatar, (newAvatar) => {
  if (newAvatar) {
    const avatarOption = avatarOptions.value.find(avatar => avatar.url === newAvatar)
    if (avatarOption) {
      selectedAvatarId.value = avatarOption.id
    }
  }
})

// 监听用户简历数据变化，确保数据同步
watch(() => [userStore.resumeData, userStore.profileData], () => {
  const newResumeData = initializeResumeData()
  // 只有当确实有数据变化时才更新
  if (JSON.stringify(newResumeData) !== JSON.stringify(resumeData.value)) {
    resumeData.value = newResumeData
  }
}, { deep: true })

// 选择头像
const selectAvatar = (avatarId) => {
  selectedAvatarId.value = avatarId
}

// 关闭选择器
const closeSelector = () => {
  emit('close')
}

// 保存更改
const saveChanges = async () => {
  loading.value = true
  
  try {
    const selectedAvatar = avatarOptions.value.find(avatar => avatar.id === selectedAvatarId.value)
    
    // 准备保存数据
    const updateData = {
      displayName: displayName.value,
      bio: bio.value,
      avatar: selectedAvatar.url,
      avatarStyle: selectedAvatar.style,
      resumeData: resumeData.value
    }
    
    // 更新用户信息
    userStore.updateProfile(updateData)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    emit('save', updateData)
    
    closeSelector()
  } catch (error) {
    console.error('保存失败:', error)
  } finally {
    loading.value = false
  }
}

// 初始化选择的头像
const initializeSelectedAvatar = () => {
  if (userStore.avatar) {
    const avatarOption = avatarOptions.value.find(avatar => avatar.url === userStore.avatar)
    if (avatarOption) {
      selectedAvatarId.value = avatarOption.id
    }
  }
}

// 组件挂载时初始化
initializeSelectedAvatar()
</script>

<style scoped>
.avatar-selector-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.avatar-selector.modal {
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.9) 100%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
  font-family: 'Comic Sans MS', 'Microsoft YaHei UI', '微软雅黑', cursive, sans-serif;
}

/* 标签页导航 */
.tab-navigation {
  display: flex;
  border-bottom: 1px solid rgba(144, 238, 144, 0.2);
  background: rgba(248, 255, 248, 0.3);
}

.tab-btn {
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  background: transparent;
  color: #666;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.tab-btn:hover {
  background: rgba(144, 238, 144, 0.1);
  color: #2d5a3d;
}

.tab-btn.active {
  color: #2d5a3d;
  background: rgba(144, 238, 144, 0.15);
  border-bottom-color: rgba(144, 238, 144, 0.8);
}

.selector-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(144, 238, 144, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, rgba(144, 238, 144, 0.1) 0%, rgba(50, 205, 50, 0.05) 100%);
}

.selector-header h3 {
  margin: 0;
  color: #2d5a3d;
  font-size: 1.3rem;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 0, 0, 0.1);
  color: #ff4757;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(144, 238, 144, 0.5) transparent;
}

.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(144, 238, 144, 0.6) 0%, rgba(50, 205, 50, 0.4) 100%);
  border-radius: 3px;
}

.current-avatar-section {
  text-align: center;
  margin-bottom: 2rem;
}

.current-avatar {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(144, 238, 144, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.current-avatar:hover {
  transform: scale(1.05);
  border-color: rgba(144, 238, 144, 0.8);
}

.current-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
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
  font-size: 0.8rem;
  text-align: center;
  padding: 0.5rem;
}

.current-avatar:hover .avatar-overlay {
  opacity: 1;
}

.avatar-options h4,
.profile-edit h4 {
  margin: 0 0 1rem 0;
  color: #2d5a3d;
  font-size: 1.1rem;
  font-weight: 600;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.avatar-option {
  text-align: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.avatar-option:hover {
  background: rgba(144, 238, 144, 0.1);
  transform: translateY(-2px);
}

.avatar-option.active {
  border-color: rgba(144, 238, 144, 0.8);
  background: rgba(144, 238, 144, 0.15);
}

.avatar-option img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.avatar-name {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2d5a3d;
  font-weight: 600;
  font-size: 0.9rem;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid rgba(144, 238, 144, 0.3);
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.7);
}

.input-field:focus,
.textarea-field:focus {
  outline: none;
  border-color: rgba(144, 238, 144, 0.8);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 0 3px rgba(144, 238, 144, 0.1);
}

.textarea-field {
  resize: vertical;
  min-height: 80px;
}

.modal-footer {
  padding: 1rem 2rem;
  border-top: 1px solid rgba(144, 238, 144, 0.2);
  background: rgba(248, 255, 248, 0.8);
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-shrink: 0;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.btn.cancel {
  background: rgba(108, 117, 125, 0.1);
  color: #6c757d;
  border: 2px solid rgba(108, 117, 125, 0.2);
}

.btn.cancel:hover {
  background: rgba(108, 117, 125, 0.2);
  transform: translateY(-1px);
}

.btn.save {
  background: linear-gradient(135deg, rgba(144, 238, 144, 0.9) 0%, rgba(50, 205, 50, 0.8) 100%);
  color: white;
  border: 2px solid rgba(144, 238, 144, 0.3);
}

.btn.save:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(144, 238, 144, 1) 0%, rgba(50, 205, 50, 0.9) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(50, 205, 50, 0.3);
}

.btn.save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* 简历管理样式 */
.resume-section h5 {
  margin: 1.5rem 0 1rem 0;
  color: #2d5a3d;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 2px solid rgba(144, 238, 144, 0.3);
  padding-bottom: 0.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group.half {
  flex: 1;
}

.resume-preview {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(144, 238, 144, 0.2);
}

.preview-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 255, 248, 0.8) 100%);
  border: 2px solid rgba(144, 238, 144, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  font-size: 0.9rem;
}

.preview-header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(144, 238, 144, 0.2);
}

.preview-header h6 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #2d5a3d;
  font-weight: 700;
}

.preview-contact {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: #666;
}

.preview-contact span {
  background: rgba(144, 238, 144, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.preview-section {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.preview-section strong {
  color: #2d5a3d;
  display: block;
  margin-bottom: 0.3rem;
}

.preview-section p {
  margin: 0.3rem 0;
  color: #555;
}

.preview-section span {
  display: inline-block;
  margin-right: 1rem;
  color: #666;
}

/* 选择框样式优化 */
select.input-field {
  background: rgba(255, 255, 255, 0.7);
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L2 4h8z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
  appearance: none;
  cursor: pointer;
}

select.input-field:focus {
  background-color: rgba(255, 255, 255, 0.9);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .avatar-selector {
    width: 95%;
    margin: 1rem;
  }
  
  .selector-header,
  .selector-content,
  .selector-footer {
    padding: 1rem;
  }
  
  .avatar-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }
  
  .avatar-option img {
    width: 50px;
    height: 50px;
  }
  
  .current-avatar {
    width: 80px;
    height: 80px;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-group.half {
    flex: none;
  }
  
  .preview-contact {
    gap: 0.5rem;
  }
  
  .tab-btn {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }
}
</style> 