from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.config import get_db
from app.models.resume import Resume
from app.models.user import User
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/user", tags=["简历管理"])

class ResumeData(BaseModel):
    """简历数据模型"""
    name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    age: Optional[int] = None
    education: str
    school: Optional[str] = None
    major: Optional[str] = None
    graduationDate: Optional[str] = None
    targetPosition: str
    expectedSalary: Optional[str] = None
    workLocation: Optional[str] = None
    workExperience: Optional[str] = None
    workDescription: Optional[str] = None
    skills: Optional[str] = None
    projects: Optional[str] = None
    selfEvaluation: Optional[str] = None

@router.get("/resume-status")
async def get_resume_status(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """获取用户简历状态"""
    try:
        # 检查用户是否有简历
        resume = db.query(Resume).filter(Resume.user_id == current_user.id).first()
        
        if resume:
            print(f"用户 {current_user.username} 已有简历, ID: {resume.id}")
            return {
                "status": "exists", 
                "message": "简历已存在",
                "resume_id": resume.id
            }
        else:
            print(f"用户 {current_user.username} 简历缺失")
            return {
                "status": "missing", 
                "message": "请先完善您的简历信息"
            }
            
    except Exception as e:
        print(f"查询简历状态错误: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"查询简历状态失败: {str(e)}"
        )

@router.post("/resume")
async def submit_resume(
    resume_data: ResumeData, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """提交或更新用户简历"""
    try:
        # 验证必填字段
        if not resume_data.name or not resume_data.education or not resume_data.targetPosition:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="请填写必填字段：姓名、学历、目标职位"
            )
        
        resume_dict = resume_data.dict()
        
        # 检查用户是否已有简历
        existing_resume = db.query(Resume).filter(Resume.user_id == current_user.id).first()
        
        if existing_resume:
            # 更新现有简历
            existing_resume.data = resume_dict
            existing_resume.updated_at = datetime.now()
            db.commit()
            db.refresh(existing_resume)
            
            print(f"用户 {current_user.username} 简历更新成功, ID: {existing_resume.id}")
            
            return {
                "success": True, 
                "message": "简历更新成功",
                "data": {
                    "id": existing_resume.id,
                    "user_id": current_user.id,
                    "name": resume_data.name,
                    "target_position": resume_data.targetPosition,
                    "updated_at": existing_resume.updated_at.isoformat()
                }
            }
        else:
            # 创建新简历
            db_resume = Resume(
                user_id=current_user.id,
                data=resume_dict
            )
            
            db.add(db_resume)
            db.commit()
            db.refresh(db_resume)
            
            print(f"用户 {current_user.username} 简历创建成功, ID: {db_resume.id}")
            
            return {
                "success": True, 
                "message": "简历保存成功",
                "data": {
                    "id": db_resume.id,
                    "user_id": current_user.id,
                    "name": resume_data.name,
                    "target_position": resume_data.targetPosition,
                    "created_at": db_resume.created_at.isoformat() if db_resume.created_at else None
                }
            }
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        print(f"保存简历错误: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"保存简历失败: {str(e)}"
        )

@router.get("/resume")
async def get_resume(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """获取用户简历详情"""
    try:
        resume = db.query(Resume).filter(Resume.user_id == current_user.id).first()
        
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="简历不存在"
            )
        
        print(f"返回用户 {current_user.username} 的简历数据, ID: {resume.id}")
        
        return {"success": True, "data": resume.to_dict()}
    except HTTPException:
        raise
    except Exception as e:
        print(f"获取简历错误: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取简历失败: {str(e)}"
        )

@router.post("/interview/start") 
async def start_interview(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """启动面试会话，基于用户简历生成面试问题"""
    try:
        # 检查用户是否有简历
        resume = db.query(Resume).filter(Resume.user_id == current_user.id).first()
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="请先完善简历信息"
            )
        
        resume_data = resume.data
        target_position = resume_data.get("targetPosition", "未知职位")
        name = resume_data.get("name", "候选人")
        
        print(f"为用户 {name} 启动 {target_position} 职位的面试, 简历ID: {resume.id}")
        
        # 模拟面试会话创建
        interview_session = {
            "id": f"interview_{current_user.id}_{int(datetime.now().timestamp())}",
            "user_id": current_user.id,
            "resume_id": resume.id,
            "resume_data": resume_data,
            "position": target_position,
            "started_at": datetime.now().isoformat(),
            "status": "active"
        }
        
        return {
            "success": True,
            "message": f"面试已开始，祝您好运！",
            "session": interview_session,
            "initial_question": f"您好 {name}，欢迎参加 {target_position} 职位的面试。请先简单介绍一下自己。"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"启动面试错误: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"启动面试失败: {str(e)}"
        ) 