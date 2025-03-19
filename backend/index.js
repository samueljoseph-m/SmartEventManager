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
    console.log('Error:', error.message); // Log the error for debugging
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

// Start the server
app.listen(5000, () => console.log('Server on port 5000'));