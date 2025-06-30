#!/usr/bin/env python3
"""
数据库初始化脚本
运行此脚本以创建数据库表
"""

import sys
import os

# 添加项目根目录到Python路径
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import init_database

def main():
    """初始化数据库"""
    try:
        print("正在初始化数据库...")
        init_database()
        print("数据库初始化完成！")
        print("数据库文件位置: database/sqlite.db")
    except Exception as e:
        print(f"数据库初始化失败: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 