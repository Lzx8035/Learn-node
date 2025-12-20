const express = require('express');

const TourController = require('../controllers/tourController');
const {
  getAllTours,
  createNewTour,
  getTourById,
  updateTourById,
  deleteTourById,
} = TourController;

const router = express.Router();

router.route('').post(createNewTour).get(getAllTours);
router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = router;
