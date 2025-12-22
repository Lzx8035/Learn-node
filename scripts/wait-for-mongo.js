const mongoose = require('mongoose');

const waitForMongo = async (connectionString, maxAttempts = 30) => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await mongoose.connect(connectionString);
      console.log('✅ MongoDB 连接成功！');
      await mongoose.disconnect();
      return true;
    } catch (error) {
      console.log(`⏳ 等待 MongoDB 准备就绪... (${i + 1}/${maxAttempts})`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  throw new Error('❌ MongoDB 连接超时');
};

const connectionString =
  process.env.DATABASE || 'mongodb://mongodb:27017/natours';
waitForMongo(connectionString)
  .then(() => {
    console.log('MongoDB 已准备好');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
