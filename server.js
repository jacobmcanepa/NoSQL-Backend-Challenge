const mongoose = require('mongoose');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect('mongodb://127.0.0.1:27017/challenge-18', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(3001, () => console.log('Connection Successful!'));

