# 用户管理说明

## 如何添加管理员账号

### 方法一：直接修改代码（推荐）

在 `backend/app.py` 文件中的 `fake_users` 字典里添加新的管理员账号：

```python
fake_users = {
    # 管理员账号
    "admin_user": {"password": "123456", "role": "admin", "name": "系统管理员"},
    "interview_admin": {"password": "admin123", "role": "admin", "name": "面试管理员"},
    "super_admin": {"password": "super123", "role": "admin", "name": "超级管理员"},
    "hr_admin": {"password": "hr123", "role": "admin", "name": "HR管理员"},
    
    # 添加新的管理员账号（按以下格式）
    "你的用户名": {"password": "你的密码", "role": "admin", "name": "显示名称"},
    
    # 普通用户账号
    # ...
}
```

**添加步骤：**
1. 打开 `smart-interview-system/backend/app.py` 文件
2. 找到 `fake_users` 字典
3. 在管理员账号部分添加新的条目
4. 重启后端服务

### 方法二：通过API接口添加

使用管理员账号登录后，可以通过API接口添加新用户：

**接口：** `POST /api/admin/add-user`

**请求示例：**
```javascript
// 添加新的管理员
await axios.post('http://localhost:5000/api/admin/add-user', {
    username: "new_admin",
    password: "admin123",
    role: "admin",
    name: "新管理员"
}, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

// 添加新的普通用户
await axios.post('http://localhost:5000/api/admin/add-user', {
    username: "new_user", 
    password: "user123",
    role: "user",
    name: "新用户"
}, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
```

## 当前系统用户列表

### 管理员账号
| 用户名 | 密码 | 角色 | 显示名称 |
|--------|------|------|----------|
| `admin_user` | `123456` | admin | 系统管理员 |
| `interview_admin` | `admin123` | admin | 面试管理员 |
| `super_admin` | `super123` | admin | 超级管理员 |
| `hr_admin` | `hr123` | admin | HR管理员 |

### 普通用户账号
| 用户名 | 密码 | 角色 | 显示名称 |
|--------|------|------|----------|
| `normal_user` | `123456` | user | 普通用户 |
| `test_user` | `user123` | user | 测试用户 |
| `john_doe` | `john123` | user | 张三 |
| `jane_smith` | `jane123` | user | 李四 |

## 统计数据说明

管理员Dashboard中的统计数据现在基于真实的用户数据计算：

- **普通用户数量**：自动统计所有 `role` 为 `user` 的用户
- **管理员数量**：自动统计所有 `role` 为 `admin` 的用户  
- **面试数据**：目前为模拟数据，可以后续连接真实数据库
- **系统状态**：显示当前系统运行状态

## API接口列表

### 管理员专用接口

1. **获取统计数据**
   - `GET /api/admin/stats`
   - 需要管理员权限

2. **添加新用户**
   - `POST /api/admin/add-user`
   - 需要管理员权限
   - 参数：username, password, role, name

3. **获取所有用户列表**
   - `GET /api/admin/users`
   - 需要管理员权限

### 通用接口

1. **用户登录**
   - `POST /api/login`
   - 参数：username, password

2. **健康检查**
   - `GET /api/health`

## 注意事项

1. **密码安全**：生产环境中应该对密码进行加密存储
2. **权限验证**：目前的token验证较为简单，生产环境建议使用JWT
3. **数据持久化**：当前数据存储在内存中，重启服务会丢失，建议连接数据库
4. **角色扩展**：如需要更多角色类型，可以修改代码中的角色验证逻辑 