const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Numeric ID (1 for admin, 2 for user)
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

// Predefine roles on server start
roleSchema.statics.initializeRoles = async function () {
  const roles = [
    { id: 1, name: 'admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'user', permissions: ['read'] },
  ];

  for (const role of roles) {
    await this.findOneAndUpdate(
      { id: role.id },
      role,
      { upsert: true, new: true }
    );
  }
};

module.exports = mongoose.model('Role', roleSchema);