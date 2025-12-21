const express = require('express');

const TourController = require('../controllers/tourController');
const {
  checkId,
  checkBody,
  getAllTours,
  createNewTour,
  getTourById,
  updateTourById,
  deleteTourById,
} = TourController;

const router = express.Router();

router.param('id', checkId);

router.route('').get(getAllTours).post(checkBody, createNewTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = router;
