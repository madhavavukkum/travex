const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Dummy employee data
const employees = [
  { id: 1, name: 'John Doe', position: 'Manager', department: 'Operations', email: 'john@travex.com' },
  { id: 2, name: 'Jane Smith', position: 'Developer', department: 'IT', email: 'jane@travex.com' },
  { id: 3, name: 'Bob Johnson', position: 'Analyst', department: 'Finance', email: 'bob@travex.com' },
];

router.get('/', protect, restrictTo('admin'), (req, res) => {
  res.json(employees);
});

module.exports = router;