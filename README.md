# 快速启动指南

## 启动 Docker 服务

```bash
# 生产模式
docker compose up -d

# 或开发模式（支持热重载）
docker compose -f docker-compose.dev.yml up -d
```

## 查看服务状态

```bash
# 查看所有运行中的容器
docker compose ps

# 或使用 docker 命令
docker ps
```

你应该看到两个容器：

- `natours-mongodb` - MongoDB 数据库
- `natours-app` - Node.js 应用

## 访问服务

### 1. Node.js API 应用

- **URL**: http://localhost:3000
- **API 端点**: http://localhost:3000/api/v1/tours

在浏览器中打开或使用 curl：

```bash
curl http://localhost:3000/api/v1/tours
```

### 2. MongoDB 数据库

- **连接字符串**: `mongodb://localhost:27017/natours`
- **使用 MongoDB Compass**: 连接字符串输入上面的地址

## 查看日志

```bash
# 查看所有服务日志
docker compose logs -f

# 查看特定服务日志
docker compose logs -f app      # Node.js 应用日志
docker compose logs -f mongodb  # MongoDB 日志
```

## 停止服务

```bash
docker compose down
```

## 验证端口是否开放

```bash
# 检查端口 3000 (Node.js)
curl http://localhost:3000

# 检查端口 27017 (MongoDB)
# 使用 MongoDB Compass 或
docker compose exec mongodb mongosh natours --eval "db.stats()"
```
