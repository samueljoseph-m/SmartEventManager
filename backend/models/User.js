const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for a User
const userSchema = new mongoose.Schema({
  // User's name, required and trimmed to remove extra spaces
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // User's email, required, unique, lowercase, and must be a valid email format
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  // User's password, required and must be at least 6 characters
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  // User's phone number, optional but must match a valid format if provided
  phoneNumber: {
    type: String,
    match: [/^\+?[\d\s-]{10,15}$/, 'Please fill a valid phone number'],
  },
  // User's role, with specified options and default to 'user'
  role: {
    type: String,
    enum: ['admin', 'department_head', 'manager', 'supervisor', 'volunteer', 'user'],
    default: 'user',
  },
  // List of skills, required for managers
  skills: [{
    type: String,
    trim: true,
  }],
  // User's availability status
  availability: {
    type: Boolean,
    default: true,
  },
  // Performance metrics for managers
  performance: {
    eventsManaged: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
  },
  // User's address, optional
  address: {
    street: String,
    city: String,
    country: String,
  },
  // Timestamp of the user's last login
  lastLogin: {
    type: Date,
    default: null,
  },
  // Timestamp of when the user was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Ensure managers have at least one skill
userSchema.pre('save', function(next) {
  if (this.role === 'manager' && (!this.skills || this.skills.length === 0)) {
    return next(new Error('Managers must have at least one skill'));
  }
  next();
});

// Create an index on email for faster lookups
userSchema.index({ email: 1 });

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;