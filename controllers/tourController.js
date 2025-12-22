const Tour = require('../models/Tour');

const checkId = async (req, res, next, val) => {
  try {
    const tour = await Tour.findById(val);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`Tour id is: ${val}`);
    }

    next();
  } catch (error) {
    return res.status(404).json({ message: 'Tour not found' });
  }
};

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ message: 'Missing name or price' });
  }
  next();
};

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      message: 'success',
      length: tours.length,
      data: tours,
      requestTime: req.requestTime,
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      error: error.message,
    });
  }
};

const createNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      message: 'success',
      data: newTour,
    });
  } catch (error) {
    res.status(400).json({
      message: 'error',
      error: error.message,
    });
  }
};

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json({
      message: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Tour not found',
      error: error.message,
    });
  }
};

const updateTourById = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json({
      message: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      message: 'error',
      error: error.message,
    });
  }
};

const deleteTourById = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json({
      message: 'success',
    });
  } catch (error) {
    res.status(400).json({
      message: 'error',
      error: error.message,
    });
  }
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
