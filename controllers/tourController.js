const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

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

module.exports = {
  getAllTours,
  createNewTour,
  getTourById,
  updateTourById,
  deleteTourById,
};
