require('dotenv').config();

const app = require('./app');
const connectDB = require('./utils/db');

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

// 启动服务器
const startServer = async () => {
  try {
    // 1. 先连接数据库
    await connectDB();

    // 2. 导入所有模型，确保它们被注册到 mongoose
    // 这必须在数据库连接之后，但在使用模型之前
    require('./models/Tour');
    require('./models/User');
    require('./models/Review');

    // 3. 数据库连接成功且模型注册后，启动服务器
    app.listen(port, () => {
      console.log(`Server is running on port ${port} 🤖`);
      console.log(`Environment: ${env} 🌐`);
    });
  } catch (error) {
    console.error('❌ 启动失败:', error);
    process.exit(1);
  }
};

startServer();
