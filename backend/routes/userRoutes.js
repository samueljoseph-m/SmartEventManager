const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

router.post('/', auth(['admin']), [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['admin', 'user', 'manager']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    const userResponse = savedUser.toObject();
    delete userResponse.password;
    res.status(201).send(userResponse);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ error: 'Email already exists' });
    } else if (error.message === 'Managers must have at least one skill') {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: 'Validation failed', details: error.message });
    }
  }
});

router.get('/', auth(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch users', details: error.message });
  }
});

router.put('/:id', auth(['admin']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    for (const key in req.body) {
      if (key !== 'password') {
        user[key] = req.body[key];
      }
    }
    await user.save();
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).send(userResponse);
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

router.delete('/:id', auth(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete user', details: error.message });
  }
});

module.exports = router;