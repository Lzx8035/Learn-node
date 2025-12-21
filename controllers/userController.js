const createNewUser = (req, res) =>
  res.status(500).json({ message: 'error', error: 'Not implemented' });

const getAllUsers = (req, res) =>
  res.status(500).json({ message: 'error', error: 'Not implemented' });

const getUserById = (req, res) => {};

const updateUserById = (req, res) => {};

const deleteUserById = (req, res) => {};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
