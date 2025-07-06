from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 假设是一个简单的用户表
fake_users = {
    # 管理员账号
    "JHR": {"password": "123456", "role": "admin", "name": "JHR"},
    "SJL": {"password": "123456", "role": "admin", "name": "SJL"},
    "SCX": {"password": "123456", "role": "admin", "name": "SCX"},
    
    # 普通用户账号
    "normal_user": {"password": "123456", "role": "user", "name": "普通用户"},
    "test_user": {"password": "user123", "role": "user", "name": "测试用户"},
    "john_doe": {"password": "john123", "role": "user", "name": "张三"},
    "jane_smith": {"password": "jane123", "role": "user", "name": "李四"}
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "用户名和密码不能为空"}), 400

    user = fake_users.get(username)
    if not user or user["password"] != password:
        return jsonify({"message": "用户名或密码错误"}), 401

    return jsonify({
        "token": f"fake-jwt-token-{username}",  # 可换成真实 JWT
        "username": username,
        "name": user["name"],
        "role": user["role"],
        "message": "登录成功"
    }), 200

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "用户名和密码不能为空"}), 400

    if len(password) < 6:
        return jsonify({"message": "密码长度不能少于6位"}), 400

    if username in fake_users:
        return jsonify({"message": "用户名已存在"}), 400

    # 创建新用户（默认为普通用户）
    fake_users[username] = {
        "password": password,
        "role": "user",
        "name": username  # 默认显示名称为用户名
    }

    # 注册成功后自动登录，返回token和用户信息
    return jsonify({
        "message": "注册成功！",
        "token": f"fake-jwt-token-{username}",
        "username": username,
        "name": username,
        "role": "user",
        "hasCompletedProfile": False,
        "isNewUser": True
    }), 200

@app.route('/api/user/info', methods=['GET'])
def get_user_info():
    # 简单的用户信息获取接口
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "未授权访问"}), 401
    
    # 这里应该验证token，为了简化直接返回示例数据
    return jsonify({
        "username": "test_user",
        "role": "user",
        "name": "测试用户"
    }), 200

@app.route('/api/admin/stats', methods=['GET'])
def get_admin_stats():
    # 管理员统计数据接口
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "未授权访问"}), 401
    
    # 基于真实系统数据计算统计信息
    total_users = len([user for user in fake_users.values() if user["role"] == "user"])
    total_admins = len([user for user in fake_users.values() if user["role"] == "admin"])
    
    # 真实的面试数据（新系统，暂无面试数据）
    interview_data = {
        "completed_interviews": 0,
        "pending_reviews": 0,
        "total_interviews": 0,
        "success_rate": 0
    }
    
    return jsonify({
        "total_users": total_users,
        "total_admins": total_admins,
        "total_interviews": interview_data["total_interviews"],
        "completed_interviews": interview_data["completed_interviews"],
        "pending_reviews": interview_data["pending_reviews"],
        "success_rate": f"{interview_data['success_rate']}%" if interview_data['total_interviews'] > 0 else "暂无数据",
        "system_status": "运行正常"
    }), 200

@app.route('/api/admin/add-user', methods=['POST'])
def add_user():
    # 添加新用户接口（仅管理员可用）
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "未授权访问"}), 401
    
    data = request.json
    username = data.get("username")
    password = data.get("password") 
    role = data.get("role", "user")  # 默认为普通用户
    name = data.get("name", username)
    
    if not username or not password:
        return jsonify({"message": "用户名和密码不能为空"}), 400
    
    if username in fake_users:
        return jsonify({"message": "用户名已存在"}), 400
    
    if role not in ["admin", "user"]:
        return jsonify({"message": "角色只能是admin或user"}), 400
    
    # 添加新用户
    fake_users[username] = {
        "password": password,
        "role": role,
        "name": name
    }
    
    return jsonify({
        "message": "用户添加成功",
        "username": username,
        "role": role,
        "name": name
    }), 200

@app.route('/api/admin/users', methods=['GET'])
def get_all_users():
    # 获取所有用户列表（仅管理员可用）
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "未授权访问"}), 401
    
    users_list = []
    for username, user_data in fake_users.items():
        users_list.append({
            "username": username,
            "name": user_data["name"],
            "role": user_data["role"]
        })
    
    return jsonify({"users": users_list}), 200

@app.route('/api/user/profile', methods=['PUT'])
def update_profile():
    # 更新用户个人信息
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "未授权访问"}), 401
    
    data = request.json
    current_username = data.get("current_username")
    new_username = data.get("new_username")
    new_password = data.get("new_password")
    new_name = data.get("new_name")
    
    if not current_username:
        return jsonify({"message": "当前用户名不能为空"}), 400
    
    if current_username not in fake_users:
        return jsonify({"message": "用户不存在"}), 404
    
    # 检查新用户名是否已存在（如果要更改用户名的话）
    if new_username and new_username != current_username:
        if new_username in fake_users:
            return jsonify({"message": "新用户名已存在"}), 400
    
    # 获取当前用户信息
    current_user = fake_users[current_username]
    
    # 更新用户信息
    updated_user = {
        "password": new_password if new_password else current_user["password"],
        "role": current_user["role"],  # 角色不允许更改
        "name": new_name if new_name else current_user["name"]
    }
    
    # 如果更改了用户名，删除旧的，添加新的
    if new_username and new_username != current_username:
        del fake_users[current_username]
        fake_users[new_username] = updated_user
        username_to_return = new_username
    else:
        fake_users[current_username] = updated_user
        username_to_return = current_username
    
    return jsonify({
        "message": "个人信息更新成功",
        "username": username_to_return,
        "name": updated_user["name"],
        "role": updated_user["role"],
        "token": f"fake-jwt-token-{username_to_return}"  # 返回新的token
    }), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "面试系统后端"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 