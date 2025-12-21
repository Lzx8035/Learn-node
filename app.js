const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express(); // 创建一个 express 应用

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // 在 terminal 里打印一条请求日志
}

app.use(express.json()); // 解析请求体中的 JSON 数据
app.use(express.static(`${__dirname}/public`)); // 静态文件服务

app.use((req, res, next) => {
  // 给每一个请求对应的 req 对象，动态加了一个 requestTime 属性
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter); // 将 tourRouter 挂载到 /api/v1/tours 路径下
app.use('/api/v1/users', userRouter); // 将 userRouter 挂载到 /api/v1/users 路径下

module.exports = app; // 导出 app 对象，供 server.js 使用
