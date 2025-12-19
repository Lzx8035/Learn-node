const fs = require('fs');
const express = require('express');

const app = express();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ message: 'success', length: tours.length, data: tours });
});

app.post('/', (req, res) => {
  res.status(200).json({ message: 'you can post to this endpoint' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🤖`); // this callback function will be executed when the server is running
});
