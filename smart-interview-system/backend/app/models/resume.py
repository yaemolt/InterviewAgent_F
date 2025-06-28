# 简历模型
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.config import Base

class Resume(Base):
    """简历模型"""
    __tablename__ = "resumes"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    data = Column(JSON, nullable=False, comment="简历JSON数据")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # 关联用户
    user = relationship("User", back_populates="resume")
    
    def __repr__(self):
        return f"<Resume(id={self.id}, user_id={self.user_id})>"
    
    @property
    def target_position(self):
        """获取目标职位"""
        return self.data.get('targetPosition', '未填写')
    
    @property
    def name(self):
        """获取姓名"""
        return self.data.get('name', '未填写')
    
    @property
    def education(self):
        """获取学历"""
        return self.data.get('education', '未填写')
    
    def to_dict(self):
        """转换为字典格式"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'data': self.data,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'target_position': self.target_position,
            'name': self.name,
            'education': self.education
        } 