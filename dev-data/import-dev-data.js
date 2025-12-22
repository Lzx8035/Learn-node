const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../models/Tour');
const User = require('../models/User');
const Review = require('../models/Review');

// 如果没有 DATABASE 环境变量，尝试从 .env 文件加载
if (!process.env.DATABASE) {
  dotenv.config({ path: './.env' });
}

// 读取 JSON 文件
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data_init/tours.json`, 'utf-8'),
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data_init/users.json`, 'utf-8'),
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/data_init/reviews.json`, 'utf-8'),
);

// 导入数据到数据库
const importData = async () => {
  try {
    const connectionString =
      process.env.DATABASE || 'mongodb://mongodb:27017/natours';
    await mongoose.connect(connectionString);
    console.log('✅ DB connection successful!');

    // 先删除现有数据（可选）
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('🗑️  Existing data deleted');

    // 重要：按顺序导入，因为存在引用关系
    // 1. 先导入 User（被 Tour 和 Review 引用）
    console.log('📥 Importing users...');
    await User.create(users, { validateBeforeSave: false });
    console.log(`   ✅ ${users.length} users imported`);

    // 2. 然后导入 Tour（被 Review 引用）
    console.log('📥 Importing tours...');
    await Tour.create(tours);
    console.log(`   ✅ ${tours.length} tours imported`);

    // 3. 最后导入 Review（引用 User 和 Tour）
    console.log('📥 Importing reviews...');
    await Review.create(reviews);
    console.log(`   ✅ ${reviews.length} reviews imported`);

    console.log('✅ Data successfully loaded!');
  } catch (err) {
    console.log('❌ ERROR:', err.message);
    console.error(err);
  }
  process.exit();
};

// 删除所有数据
const deleteData = async () => {
  try {
    const connectionString =
      process.env.DATABASE || 'mongodb://mongodb:27017/natours';
    await mongoose.connect(connectionString);
    console.log('✅ DB connection successful!');

    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('✅ Data successfully deleted!');
  } catch (err) {
    console.log('❌ ERROR:', err);
  }
  process.exit();
};

// 根据命令行参数执行操作
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Usage: node import-dev-data.js --import | --delete');
  process.exit(1);
}
