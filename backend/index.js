const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();

mongoose.connect('mongodb://localhost:27017/smartEventManager')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(express.json());

app.get('/', (req, res) => res.send('Backend running!'));

// POST route to create a user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(5000, () => console.log('Server on port 5000'));

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ error: 'Email already exists' });
    } else {
      res.status(400).send(error);
    }
  }
});