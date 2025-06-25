# 智能面试辅助系统 (Smart Interview System)

## 项目概述

智能面试辅助系统是一个基于AI技术的面试平台，旨在为求职者提供智能化的面试体验和专业的面试反馈。系统采用前后端分离架构，支持用户注册登录、面试配置、实时面试交互、语音识别、表情分析等功能。

## 技术栈

### 前端 (Frontend)
- **Vue 3** - 渐进式JavaScript框架
- **Pinia** - Vue状态管理库
- **Vue Router** - 官方路由管理器
- **Axios** - HTTP客户端
- **Vite** - 快速构建工具

### 后端 (Backend)
- **FastAPI** - 现代Python Web框架
- **SQLAlchemy** - Python SQL工具包和ORM
- **Alembic** - 数据库迁移工具
- **SQLite** - 轻量级数据库

### AI服务
- **语音识别 (ASR)** - 智能语音转文字
- **表情识别** - 面部表情分析
- **语言模型 (LM)** - 智能对话和评估
- **流畅度分析** - 语音流畅度评测

## 项目结构

```
smart-interview-system/
├── frontend/                    # 前端应用
│   ├── src/
│   │   ├── components/         # Vue组件
│   │   │   ├── LoginForm.vue   # 登录组件
│   │   │   ├── RegisterForm.vue # 注册组件
│   │   │   ├── Home.vue        # 首页组件
│   │   │   ├── InterviewConfig.vue # 面试配置
│   │   │   ├── InterviewPanel.vue  # 面试面板
│   │   │   ├── ProfileEditor.vue   # 个人信息编辑
│   │   │   └── ReportView.vue      # 报告查看
│   │   ├── router/             # 路由配置
│   │   │   └── index.js        # 主路由文件
│   │   ├── store/              # 状态管理
│   │   │   ├── userStore.js    # 用户状态
│   │   │   ├── authStore.js    # 认证状态
│   │   │   └── interviewStore.js # 面试状态
│   │   ├── App.vue             # 根组件
│   │   └── main.js             # 应用入口
│   ├── package.json            # 依赖配置
│   └── vite.config.js          # Vite配置
├── backend/                     # 后端应用
│   ├── app/
│   │   ├── models/             # 数据模型
│   │   │   ├── user.py         # 用户模型
│   │   │   ├── session.py      # 会话模型
│   │   │   ├── answer_record.py # 答题记录
│   │   │   └── evaluation_result.py # 评估结果
│   │   ├── routers/            # API路由
│   │   │   ├── auth.py         # 认证接口
│   │   │   ├── interview.py    # 面试接口
│   │   │   └── report.py       # 报告接口
│   │   ├── services/           # 业务服务
│   │   │   ├── asr_service.py  # 语音识别服务
│   │   │   ├── face_service.py # 表情识别服务
│   │   │   ├── fluency_service.py # 流畅度分析
│   │   │   └── lm_service.py   # 语言模型服务
│   │   ├── config.py           # 配置文件
│   │   └── main.py             # 应用入口
│   └── requirements.txt        # Python依赖
├── database/                   # 数据库文件
│   ├── migrations/             # 数据库迁移
│   └── sqlite.db               # SQLite数据库
├── docs/                       # 项目文档
├── tests/                      # 测试文件
└── scripts/                    # 启动脚本
```

## 核心功能

### 已实现功能 ✅

#### 1. 用户认证系统
- **用户注册** (`RegisterForm.vue`)
  - 用户名和密码输入验证
  - 密码确认机制
  - 前端表单验证（密码长度、字段完整性）
  - 注册成功后自动跳转登录页面
  
- **用户登录** (`LoginForm.vue`)
  - 安全的用户名/密码登录
  - JWT Token认证机制
  - 自动保存登录状态到localStorage
  - 登录状态管理与路由跳转
  
- **首页展示** (`Home.vue`)
  - 个性化欢迎界面
  - 用户信息展示
  - 安全登出功能
  - 功能模块导航

#### 2. 路由与导航
- **智能路由守卫** (`router/index.js`)
  - 基于Token的路由权限控制
  - 自动重定向未认证用户到登录页
  - 已登录用户访问登录页自动跳转首页
  - 动态页面标题设置

#### 3. 状态管理
- **用户状态管理** (`userStore.js`)
  - Pinia状态管理
  - 用户信息存储和清除
  - 登录状态持久化
  - 响应式用户数据

### 计划实现功能 🚧

#### 1. 面试配置与管理
- 面试类型选择（技术面试、行为面试等）
- 难度等级设置
- 时间限制配置
- 个人信息管理

#### 2. 智能面试交互
- 实时语音识别转文字
- AI面试官对话系统
- 智能问题生成
- 面试进度跟踪

#### 3. 多模态分析
- 面部表情识别与分析
- 语音流畅度评估
- 回答内容质量分析
- 综合表现评分

#### 4. 报告与反馈
- 详细面试报告生成
- 表现数据可视化
- 改进建议提供
- 历史记录查看

## 安装和运行

### 环境要求
- Node.js 16+ 
- Python 3.8+
- npm 或 yarn

### 快速启动

1. **克隆项目**
```bash
git clone <repository-url>
cd smart-interview-system
```

2. **安装前端依赖**
```bash
cd frontend
npm install
```

3. **安装后端依赖**
```bash
cd ../backend
pip install -r requirements.txt
```

4. **启动开发服务器**

前端开发服务器：
```bash
cd frontend
npm run dev
```

后端API服务器：
```bash
cd backend
python -m uvicorn app.main:app --reload
```

5. **访问应用**
- 前端：http://localhost:5173
- 后端API：http://localhost:8000
- API文档：http://localhost:8000/docs

### 数据库初始化

```bash
cd backend
python scripts/init_db.py
```

## API接口

### 认证接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出

### 面试接口
- `GET /api/interview/config` - 获取面试配置
- `POST /api/interview/start` - 开始面试
- `POST /api/interview/submit` - 提交面试答案

### 报告接口
- `GET /api/report/list` - 获取报告列表
- `GET /api/report/{id}` - 获取具体报告

## 开发指南

### 前端开发
- 使用Vue 3 Composition API
- 遵循组件化开发原则
- 使用Pinia进行状态管理
- 采用响应式设计

### 后端开发
- 使用FastAPI框架
- 遵循RESTful API设计
- 使用SQLAlchemy ORM
- 实现异步处理

### 代码规范
- 使用ESLint和Prettier格式化前端代码
- 使用Black格式化Python代码
- 编写单元测试
- 添加必要的文档注释

## 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交代码更改
4. 创建Pull Request

## 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

如有问题或建议，请通过Issue或邮件联系项目维护者。

---

**当前版本**: v0.1.0 (用户认证系统基础版本)  
**最后更新**: 2024年12月 