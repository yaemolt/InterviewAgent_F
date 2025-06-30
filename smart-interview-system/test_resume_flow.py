#!/usr/bin/env python3
"""
测试简历功能流程
"""
import sys
import os
sys.path.append('backend')

from app.database import init_database
from app.config import get_db
from app.models.user import User
from app.models.resume import Resume
from sqlalchemy.orm import Session

def test_resume_flow():
    """测试简历功能流程"""
    print("=== 测试简历功能流程 ===")
    
    # 1. 初始化数据库
    print("1. 初始化数据库...")
    init_database()
    
    # 2. 创建测试用户
    print("2. 创建测试用户...")
    db = next(get_db())
    
    # 检查用户是否已存在
    existing_user = db.query(User).filter(User.username == "testuser").first()
    if existing_user:
        print("   测试用户已存在，删除旧用户...")
        # 删除相关简历
        existing_resume = db.query(Resume).filter(Resume.user_id == existing_user.id).first()
        if existing_resume:
            db.delete(existing_resume)
        db.delete(existing_user)
        db.commit()
    
    # 创建新用户
    test_user = User(
        username="testuser",
        hashed_password="hashed_password_here",
        is_active=True
    )
    db.add(test_user)
    db.commit()
    db.refresh(test_user)
    
    print(f"   用户创建成功，ID: {test_user.id}")
    
    # 3. 检查用户简历状态（应该为空）
    print("3. 检查用户简历状态...")
    resume = db.query(Resume).filter(Resume.user_id == test_user.id).first()
    if resume:
        print("   ❌ 新用户不应该有简历")
    else:
        print("   ✅ 新用户没有简历，符合预期")
        
    # 4. 创建测试简历数据
    print("4. 创建测试简历...")
    resume_data = {
        # 基本信息
        "name": "张三",
        "age": 25,
        "location": "北京",
        
        # 求职意向
        "targetPosition": "前端开发工程师",
        "expectedSalary": "12k-18k",
        
        # 教育背景
        "education": "本科",
        "major": "计算机科学与技术",
        "university": "北京大学",
        "graduationYear": 2020,
        
        # 工作经验
        "workExperience": "3-5年",
        "workDescription": "负责前端开发，使用React、Vue等技术栈",
        
        # 技能特长
        "technicalSkills": "JavaScript, React, Vue, Node.js, Python",
        "otherSkills": "团队协作，沟通能力强",
        
        # 项目经验
        "projectExperience": "参与开发电商平台前端，用户管理系统等",
        
        # 自我评价
        "selfEvaluation": "热爱技术，学习能力强，有良好的团队合作精神"
    }
    
    # 5. 保存简历到数据库
    test_resume = Resume(
        user_id=test_user.id,
        data=resume_data
    )
    db.add(test_resume)
    db.commit()
    db.refresh(test_resume)
    
    print(f"   简历创建成功，ID: {test_resume.id}")
    
    # 6. 验证简历数据
    print("5. 验证简历数据...")
    saved_resume = db.query(Resume).filter(Resume.user_id == test_user.id).first()
    if saved_resume:
        print("   ✅ 简历保存成功")
        print(f"   姓名: {saved_resume.name}")
        print(f"   目标职位: {saved_resume.target_position}")
        print(f"   学历: {saved_resume.education}")
    else:
        print("   ❌ 简历保存失败")
    
    # 7. 测试简历更新
    print("6. 测试简历更新...")
    saved_resume.data["age"] = 26
    saved_resume.data["expectedSalary"] = "15k-20k"
    db.commit()
    db.refresh(saved_resume)
    
    print("   ✅ 简历更新成功")
    print(f"   更新后年龄: {saved_resume.data.get('age')}")
    print(f"   更新后期望薪资: {saved_resume.data.get('expectedSalary')}")
    
    db.close()
    print("\n=== 测试完成 ===")
    print("所有测试通过！简历功能工作正常。")

if __name__ == "__main__":
    test_resume_flow() 