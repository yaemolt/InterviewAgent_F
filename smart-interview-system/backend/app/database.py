from app.config import Base, engine

def init_database():
    """初始化数据库表"""
    # 只导入已经实现的模型
    from app.models.user import User
    from app.models.resume import Resume
    
    Base.metadata.create_all(bind=engine) 