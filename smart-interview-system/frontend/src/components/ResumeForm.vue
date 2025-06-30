<template>
  <div class="resume-container">
    <div class="resume-form">
      <h2>{{ isEditMode ? '编辑简历信息' : '完善您的简历信息' }}</h2>
      <p class="resume-desc">
        {{ isEditMode ? '更新您的简历信息' : '请填写以下信息，以便为您提供更精准的面试体验' }}
      </p>
      
      <form @submit.prevent="onSubmit">
        <!-- 基本信息 -->
        <div class="form-section">
          <h3>基本信息</h3>
          <div class="form-row">
            <div class="form-group">
              <label>姓名 *</label>
              <input 
                v-model="resume.name" 
                type="text" 
                placeholder="请输入您的姓名"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>年龄</label>
              <input 
                v-model="resume.age" 
                type="number" 
                placeholder="年龄"
                min="18" 
                max="65"
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label>居住城市</label>
            <input 
              v-model="resume.location" 
              type="text" 
              placeholder="如：北京、上海、深圳"
              class="form-input"
            />
          </div>
        </div>

        <!-- 求职意向 -->
        <div class="form-section">
          <h3>求职意向</h3>
          <div class="form-row">
            <div class="form-group">
              <label>期望职位 *</label>
              <input 
                v-model="resume.targetPosition" 
                type="text" 
                placeholder="如：前端开发工程师、产品经理等"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>期望薪资</label>
              <input 
                v-model="resume.expectedSalary" 
                type="text" 
                placeholder="如：8k-12k、面议"
                class="form-input"
              />
            </div>
          </div>
        </div>

        <!-- 教育背景 -->
        <div class="form-section">
          <h3>教育背景</h3>
          <div class="form-row">
            <div class="form-group">
              <label>学历 *</label>
              <select v-model="resume.education" required class="form-select">
                <option value="">请选择学历</option>
                <option value="高中">高中</option>
                <option value="大专">大专</option>
                <option value="本科">本科</option>
                <option value="硕士">硕士</option>
                <option value="博士">博士</option>
              </select>
            </div>
            <div class="form-group">
              <label>专业</label>
              <input 
                v-model="resume.major" 
                type="text" 
                placeholder="请输入专业"
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>毕业院校</label>
              <input 
                v-model="resume.university" 
                type="text" 
                placeholder="请输入毕业院校"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>毕业年份</label>
              <input 
                v-model="resume.graduationYear" 
                type="number" 
                placeholder="如：2020"
                min="1980"
                max="2030"
                class="form-input"
              />
            </div>
          </div>
        </div>

        <!-- 工作经验 -->
        <div class="form-section">
          <h3>工作经验</h3>
          <div class="form-group">
            <label>工作年限</label>
            <select v-model="resume.workExperience" class="form-select">
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
            <label>工作描述</label>
            <textarea 
              v-model="resume.workDescription" 
              placeholder="请简要描述您的工作经历、主要职责和成就..."
              rows="4"
              class="form-textarea"
            ></textarea>
          </div>
        </div>

        <!-- 技能特长 -->
        <div class="form-section">
          <h3>技能特长</h3>
          <div class="form-group">
            <label>技术技能</label>
            <textarea 
              v-model="resume.technicalSkills" 
              placeholder="请描述您的技术技能，如：JavaScript、Python、Photoshop等..."
              rows="3"
              class="form-textarea"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label>其他技能</label>
            <textarea 
              v-model="resume.otherSkills" 
              placeholder="请描述您的其他技能，如：沟通能力、团队协作等..."
              rows="3"
              class="form-textarea"
            ></textarea>
          </div>
        </div>

        <!-- 项目经验 -->
        <div class="form-section">
          <h3>项目经验</h3>
          <div class="form-group">
            <label>项目描述</label>
            <textarea 
              v-model="resume.projectExperience" 
              placeholder="请描述您参与过的重要项目..."
              rows="4"
              class="form-textarea"
            ></textarea>
          </div>
        </div>

        <!-- 自我评价 -->
        <div class="form-section">
          <h3>自我评价</h3>
          <div class="form-group">
            <label>个人优势</label>
            <textarea 
              v-model="resume.selfEvaluation" 
              placeholder="请简要描述您的个人优势、性格特点等..."
              rows="3"
              class="form-textarea"
            ></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? '保存中...' : (isEditMode ? '更新简历' : '保存简历') }}
          </button>
          <button type="button" class="cancel-btn" @click="handleCancel">
            {{ isEditMode ? '返回首页' : '稍后填写' }}
          </button>
        </div>

        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { submitResume, getResume } from '../api/chat'
import { useUserStore } from '../store/userStore'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const error = ref('')
const isEditMode = ref(false)

const resume = reactive({
  // 基本信息
  name: '',
  age: null,
  location: '',
  
  // 求职意向
  targetPosition: '',
  expectedSalary: '',
  
  // 教育背景
  education: '',
  major: '',
  university: '',
  graduationYear: null,
  
  // 工作经验
  workExperience: '',
  workDescription: '',
  
  // 技能特长
  technicalSkills: '',
  otherSkills: '',
  
  // 项目经验
  projectExperience: '',
  
  // 自我评价
  selfEvaluation: ''
})

// 页面加载时检查是否有现有简历数据
onMounted(async () => {
  try {
    const response = await getResume()
    if (response.data.success && response.data.data) {
      isEditMode.value = true
      const existingData = response.data.data.data
      
      // 预填充表单数据
      Object.keys(resume).forEach(key => {
        if (existingData[key] !== undefined) {
          resume[key] = existingData[key]
        }
      })
    }
  } catch (error) {
    // 如果获取失败，可能是新用户，继续显示空表单
    console.log('未找到现有简历，显示空表单')
  }
})

const onSubmit = async () => {
  if (!resume.name || !resume.education || !resume.targetPosition) {
    error.value = '请填写必填字段（姓名、学历、期望职位）'
    return
  }

  loading.value = true
  error.value = ''
  
  try {
    await submitResume(resume)
    router.push('/home')
  } catch (e) {
    error.value = e.response?.data?.detail || '保存简历失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  if (isEditMode.value) {
    // 编辑模式下，返回首页
    router.push('/home')
  } else {
    // 新建模式下，提示用户
    if (confirm('确定要稍后填写吗？您需要完善简历才能开始面试。')) {
      userStore.clearUser()
      localStorage.removeItem('token')
      router.push('/login')
    }
  }
}
</script>

<style scoped>
.resume-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.resume-form {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.resume-form h2 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem;
  margin: 0;
  font-size: 1.5rem;
}

.resume-desc {
  text-align: center;
  color: #666;
  padding: 1rem 2rem;
  margin: 0;
  border-bottom: 1px solid #eee;
}

.form-section {
  padding: 2rem;
  border-bottom: 1px solid #f0f0f0;
}

.form-section:last-child {
  border-bottom: none;
}

.form-section h3 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  border-left: 4px solid #667eea;
  padding-left: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  padding: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  background: #f9f9f9;
}

.submit-btn {
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: #5a6fd8;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cancel-btn {
  padding: 0.75rem 2rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background: #5a6268;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .resume-container {
    padding: 1rem 0.5rem;
  }
  
  .form-section {
    padding: 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
    padding: 1rem;
  }
  
  .submit-btn,
  .cancel-btn {
    width: 100%;
  }
}
</style> 