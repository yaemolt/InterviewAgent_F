<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>AI面试官</h2>
      <button @click="endInterview" class="end-btn">结束面试</button>
    </div>
    
    <div class="chat-messages" ref="messagesContainer">
      <div 
        v-for="message in messages" 
        :key="message.id"
        :class="['message', message.type]"
      >
        <div class="message-content">
          <p>{{ message.content }}</p>
          <span class="message-time">{{ message.time }}</span>
        </div>
      </div>
    </div>
    
    <div class="chat-input">
      <textarea 
        v-model="inputMessage"
        @keydown.enter.prevent="sendMessage"
        placeholder="请输入您的回答..."
        rows="3"
      ></textarea>
      <button @click="sendMessage" :disabled="!inputMessage.trim()">
        发送
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { sendMessage as apiSendMessage, endInterview as apiEndInterview } from '../api/chat'

const router = useRouter()
const messages = ref([])
const inputMessage = ref('')
const messagesContainer = ref(null)

onMounted(() => {
  // 添加初始消息
  addMessage('interviewer', '您好！欢迎参加面试。请先做个自我介绍。')
})

const addMessage = (type, content) => {
  messages.value.push({
    id: Date.now(),
    type,
    content,
    time: new Date().toLocaleTimeString()
  })
  nextTick(() => {
    scrollToBottom()
  })
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return
  
  const userMessage = inputMessage.value
  addMessage('user', userMessage)
  inputMessage.value = ''
  
  try {
    const response = await apiSendMessage(userMessage)
    addMessage('interviewer', response.data.reply)
  } catch (error) {
    console.error('发送消息失败:', error)
    addMessage('interviewer', '抱歉，出现了技术问题，请稍后重试。')
  }
}

const endInterview = async () => {
  if (confirm('确定要结束面试吗？')) {
    try {
      await apiEndInterview()
      router.push('/home')
    } catch (error) {
      console.error('结束面试失败:', error)
      router.push('/home')
    }
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

.chat-header {
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.end-btn {
  padding: 0.5rem 1rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.interviewer {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 1rem;
  border-radius: 12px;
  position: relative;
}

.message.user .message-content {
  background: #667eea;
  color: white;
}

.message.interviewer .message-content {
  background: white;
  border: 1px solid #ddd;
}

.message-time {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.5rem;
  display: block;
}

.chat-input {
  background: white;
  padding: 1rem;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 1rem;
}

.chat-input textarea {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: none;
}

.chat-input button {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.chat-input button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style> 