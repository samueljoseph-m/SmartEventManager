const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/smartEventManager')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => res.send('Backend running!'));

// POST route to create a user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log('Error:', error.message);
    if (error.code === 11000) {
      res.status(400).send({ error: 'Email already exists' });
    } else if (error.message === 'Managers must have at least one skill') {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: 'Validation failed', details: error.message });
    }
  }
});

// GET route to fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch users', details: error.message });
  }
});

// PUT route to update a user by email
app.put('/api/users/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Apply updates manually
    for (const key in req.body) {
      user[key] = req.body[key];
    }

    // Save the document to trigger pre-save hook
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ error: 'Email already exists' });
    } else if (error.message === 'Managers must have at least one skill') {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: 'Update failed', details: error.message });
    }
  }
});

// Start the server
app.listen(5000, () => console.log('Server on port 5000'));