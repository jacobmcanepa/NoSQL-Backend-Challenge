const { User } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
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
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};

module.exports = userController;