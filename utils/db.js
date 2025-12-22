const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE, {
      // 这些选项在较新版本的 mongoose 中已经不需要了，但为了兼容性可以保留
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB 连接成功: ${conn.connection.host}`);
    console.log(`📦 数据库名称: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB 连接失败:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
