const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: Number }], // Store numeric role IDs (e.g., [1] for admin, [2] for user)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);