const fs = require('fs');
const path = require('path');

// 定义文件路径常量，避免重复
const toursFilePath = path.join(
  __dirname,
  '..',
  'dev-data',
  'data',
  'tours-simple.json'
);

const tours = JSON.parse(fs.readFileSync(toursFilePath, 'utf-8'));

const checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ message: 'Tour not found' });
  }
  console.log(`Tour id is: ${val}`);
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ message: 'Missing name or price' });
  }
  next();
};

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
  fs.writeFile(toursFilePath, JSON.stringify(tours, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'error', error: err });
    }
    res.status(201).json({ message: 'success', data: newTour });
  });
};

const getTourById = (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id, 10)); // 10 means 10 base conversion
  res.status(200).json({ message: 'success', data: tour });
};

const updateTourById = (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id, 10));
  if (!tour) {
    return res.status(404).json({ message: 'Tour not found' });
  }
  Object.assign(tour, req.body);

  fs.writeFile(toursFilePath, JSON.stringify(tours, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'error', error: err });
    }
    res.status(200).json({ message: 'success', data: tour });
  });
};

const deleteTourById = (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id, 10));
  if (!tour) {
    return res.status(404).json({ message: 'Tour not found' });
  }
  tours.splice(tours.indexOf(tour), 1);
  fs.writeFile(toursFilePath, JSON.stringify(tours, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'error', error: err });
    }
    res.status(200).json({ message: 'success' });
  });
};

module.exports = {
  checkId,
  checkBody,
  getAllTours,
  createNewTour,
  getTourById,
  updateTourById,
  deleteTourById,
};
