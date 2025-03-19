const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phoneNumber: {
    type: String,
    match: [/^\+?[\d\s-]{10,15}$/, 'Please fill a valid phone number'],
    sparse: true, // Allows null/undefined without violating unique constraint
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'manager'],
    default: 'user',
  },
  skills: [{
    type: String,
    trim: true,
  }],
  availability: {
    type: Boolean,
    default: true,
  },
  performance: {
    eventsManaged: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add an index on email for faster lookups
userSchema.index({ email: 1 });

// Create User Model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;