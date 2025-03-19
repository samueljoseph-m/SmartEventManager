const mongoose = require('mongoose');

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
  address: {
    street: String,
    city: String,
    country: String,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Updated pre-save hook
userSchema.pre('save', function(next) {
  if (this.role === 'manager' && (!this.skills || this.skills.length === 0)) {
    return next(new Error('Managers must have at least one skill'));
  }
  next();
});

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;