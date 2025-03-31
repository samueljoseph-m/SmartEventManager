const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    minlength: [3, 'Event title must be at least 3 characters long'],
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    minlength: [10, 'Event description must be at least 10 characters long'],
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
  },
  category: {
    type: String,
    enum: ['Music', 'Business', 'Tech', 'Food', 'Comedy', 'Other'],
    default: 'Other',
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Event manager is required'],
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;