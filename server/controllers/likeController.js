const Blog = require('../models/Blog');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.toggleLike = async (req, res) => {
  try {
    const { blogId } = req.body;
    const user = req.user; // From protect middleware

    // Log req.user for debugging
    console.log('req.user in toggleLike:', JSON.stringify(user, null, 2));

    // Validate userId
    const userId = user.userId;
    if (!userId || !mongoose.isValidObjectId(userId)) {
      console.error('Invalid or missing userId in req.user:', JSON.stringify(user, null, 2));
      return res.status(400).json({ message: 'Invalid user data in request' });
    }

    // Find blog by numeric id
    const blog = await Blog.findOne({ id: parseInt(blogId) });
    if (!blog) {
      console.error(`Blog not found with id: ${blogId}`);
      return res.status(404).json({ message: `Blog not found with id ${blogId}` });
    }

    // Fetch user to ensure they exist
    const userData = await User.findById(userId);
    if (!userData) {
      console.error(`User not found with ID: ${userId}`);
      return res.status(404).json({ message: `User not found with ID ${userId}` });
    }

    // Check if user has already liked the blog
    const existingLike = blog.likes.find(like => like.userId.toString() === userId);
    let action;

    if (existingLike) {
      // Remove like
      blog.likes = blog.likes.filter(like => like.userId.toString() !== userId);
      blog.likes_count = (blog.likes_count || 1) - 1;
      action = 'unliked';
    } else {
      // Add like
      blog.likes.push({
        userId: userData._id,
        username: userData.username,
        createdAt: new Date(),
      });
      blog.likes_count = (blog.likes_count || 0) + 1;
      action = 'liked';
    }

    await blog.save();

    res.status(200).json({
      message: `Blog ${action} successfully`,
      likes_count: blog.likes_count,
      liked: action === 'liked',
    });
  } catch (error) {
    console.error('Error toggling like:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};