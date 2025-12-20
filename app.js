const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.use(morgan('dev')); // 在 terminal 里打印一条请求日志

// middleware to parse the body of the request
app.use(express.json());
// 给每一个请求对应的 req 对象，动态加了一个 requestTime 属性
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const getAllTours = (req, res) => {
  res.status(200).json({
    message: 'success',
    length: tours.length,
    data: tours,
    requestTime: req.requestTime,
  });
};

const createNewTour = (req, res) => {
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
};

const getTourById = (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id, 10)); // 10 means 10 base conversion
  if (!tour) {
    return res.status(404).json({ message: 'Tour not found' });
  }
  res.status(200).json({ message: 'success', data: tour });
};

const updateTourById = (req, res) => {
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
};

const deleteTourById = (req, res) => {
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
};

const createNewUser = (req, res) => {
  return res.status(500).json({ message: 'error', error: 'Not implemented' });
};

const getAllUsers = (req, res) => {
  return res.status(500).json({ message: 'error', error: 'Not implemented' });
};

const getUserById = (req, res) => {};

const updateUserById = (req, res) => {};

const deleteUserById = (req, res) => {};

// route handlers
// app.post('/api/v1/tours', createNewTour);
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTourById);
// app.patch('/api/v1/tours/:id', updateTourById);
// app.delete('/api/v1/tours/:id', deleteTourById);

app.route('/api/v1/tours').post(createNewTour).get(getAllTours);

app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

app.route('/api/v1/users').post(createNewUser).get(getAllUsers);

app
  .route('/api/v1/users/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🤖`); // this callback function will be executed when the server is running
});
