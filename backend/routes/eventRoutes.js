const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

router.post('/', auth(['manager']), [
  body('title').notEmpty().trim().isLength({ min: 3 }),
  body('description').notEmpty().trim().isLength({ min: 10 }),
  body('date').isISO8601(),
  body('location').notEmpty().trim(),
  body('category').isIn(['Music', 'Business', 'Tech', 'Food', 'Comedy', 'Other']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, date, location, category, attendees } = req.body;

  try {
    if (attendees && attendees.length > 0) {
      const attendeeUsers = await User.find({ _id: { $in: attendees } });
      if (attendeeUsers.length !== attendees.length) {
        return res.status(400).json({ error: 'One or more attendees not found' });
      }
    }

    const event = new Event({
      title,
      description,
      date,
      location,
      category,
      manager: req.user.id,
      attendees: attendees || [],
    });
    await event.save();

    const manager = await User.findById(req.user.id);
    manager.performance.eventsManaged += 1;
    await manager.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category, date } = req.query;
    const query = {};
    if (category) query.category = category;
    if (date) query.date = { $gte: new Date(date) };

    const events = await Event.find(query)
      .populate('manager', 'name email')
      .populate('attendees', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth(['manager']), async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, category, attendees } = req.body;

  try {
    if (attendees && attendees.length > 0) {
      const attendeeUsers = await User.find({ _id: { $in: attendees } });
      if (attendeeUsers.length !== attendees.length) {
        return res.status(400).json({ error: 'One or more attendees not found' });
      }
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.manager.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this event' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date, location, category, attendees },
      { new: true }
    )
      .populate('manager', 'name email')
      .populate('attendees', 'name email');

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth(['manager']), async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.manager.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/register', auth(['user']), async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ error: 'You are already registered for this event' });
    }

    event.attendees.push(req.user.id);
    await event.save();

    const populatedEvent = await Event.findById(id)
      .populate('manager', 'name email')
      .populate('attendees', 'name email');
    res.json(populatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;