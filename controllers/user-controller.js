const { User, Thought } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({ path: 'friends', select: '-__v' })
      .populate({ path: 'thoughts', select: '-__v' })
      .select('-__v')
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      }); 
  },

  // get a single user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userid })
      .populate({ path: 'friends', select: '-__v' })
      .populate({ path: 'thoughts', select: '-__v', populate: { path: 'reactions' }})
      .select('-__v')
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(data)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create new user
  createUser({ body }, res) {
    User.create(body)
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userid }, body, { new: true })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // delete user by id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userid })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        Thought.deleteMany({ username: data.username })
          .then(deletedData => {
            if (deletedData) {
              res.status(200).json({ message: 'User successfully deleted' });
            } else {
              res.status(400).json({ message: 'An error occured while deleting user thoughts' });
            }
          });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userid },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // remove friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userid },
      { $pull: { friends: params.friendId } }
    )
    .then(data => res.json({ message: 'Friend successfully deleted' }))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  }
};

module.exports = userController;