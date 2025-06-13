const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/authMiddleware');
const blogController = require('../controllers/blogController');
const commentController = require('../controllers/commentController');
const likeController = require('../controllers/likeController');

// Dummy employee data (optional, keep if needed)
const employees = [
  { id: 1, name: 'John Doe', position: 'Manager', department: 'Operations', email: 'john@travex.com' },
  { id: 2, name: 'Jane Smith', position: 'Developer', department: 'IT', email: 'jane@travex.com' },
  { id: 3, name: 'Bob Johnson', position: 'Analyst', department: 'Finance', email: 'bob@travex.com' },
];

// Get employee data (admin only)
router.get('/employees', protect, restrictTo(1), (req, res) => {
  res.json(employees);
});

// Get blog by ID
router.get('/blogs/:id', blogController.getBlogById);

// Add comment (authenticated users only)
router.post('/comments', protect, commentController.addComment);

// Get comments by blog ID
router.get('/comments/:blogId', commentController.getCommentsByBlogId);

// Toggle like/unlike blog (authenticated users only)
router.post('/likes', protect, likeController.toggleLike);

module.exports = router;