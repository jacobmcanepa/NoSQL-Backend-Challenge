const router = require('express').Router();

const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/user-controller');

// - /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// - /api/users/:userid
router
  .route('/:userid')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// - /api/users/:userid/friends/:friendId
router
  .route('/:userid/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);


module.exports = router;