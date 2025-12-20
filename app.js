const fs = require('fs');
const express = require('express');

const app = express();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// middleware to parse the body of the request
app.use(express.json());

// get all tours
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ message: 'success', length: tours.length, data: tours });
});

// create a new tour
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newTour = { ...req.body, id: tours[tours.length - 1].id + 1 };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      if (err) {
        res.status(500).json({ message: 'error', error: err });
      }
      res.status(201).json({ message: 'success', data: newTour });
    }
  );
});

// get a tour by id
app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id, 10)); // 10 means 10 base conversion
  if (!tour) {
    return res.status(404).json({ message: 'Tour not found' });
  }
  res.status(200).json({ message: 'success', data: tour });
});

// update a tour by id
app.patch('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id, 10));
  if (!tour) {
    return res.status(404).json({ message: 'Tour not found' });
  }
  // 直接将 req.body 的更新应用到 tour 对象（tour 是原数组的引用，修改会影响原数组）
  Object.assign(tour, req.body);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'error', error: err });
      }
      res.status(200).json({ message: 'success', data: tour });
    }
  );
});

// delete a tour by id
app.delete('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id, 10));
  if (!tour) {
    return res.status(404).json({ message: 'Tour not found' });
  }
  tours.splice(tours.indexOf(tour), 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'error', error: err });
      }
      res.status(200).json({ message: 'success' });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🤖`); // this callback function will be executed when the server is running
});
