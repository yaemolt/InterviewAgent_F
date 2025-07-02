from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.routers import auth, resume
from app.database import init_database
from app.config import get_db

# 在应用启动时初始化数据库
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时执行
    init_database()
    yield
    # 关闭时执行（可以添加清理逻辑）

# 创建FastAPI实例
app = FastAPI(title="智能面试系统", version="1.0.0", lifespan=lifespan)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(resume.router, tags=["简历管理"])

@app.get("/")
async def root():
    return {"message": "智能面试系统API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 