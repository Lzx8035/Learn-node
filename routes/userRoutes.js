const express = require('express');

const UserController = require('../controllers/userController');

const {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = UserController;

const router = express.Router();

router.route('').post(createNewUser).get(getAllUsers);
router
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
