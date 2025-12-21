require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🤖`);
  console.log(`Environment: ${env} 🌐`);
});
