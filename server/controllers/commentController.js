const Blog = require('../models/Blog');
const User = require('../models/User');

exports.addComment = async (req, res) => {
  try {
    const { blogId, content } = req.body;
    const user = req.user; // From protect middleware

    // Log req.user for debugging
    console.log('req.user in addComment:', JSON.stringify(user, null, 2));

    // Find blog by numeric id field
    const blog = await Blog.findOne({ id: parseInt(blogId) });
    if (!blog) {
      console.error(`Blog not found with id: ${blogId}`);
      return res.status(404).json({ message: `Blog not found with id ${blogId}` });
    }

    // Fetch user to ensure they exist
    const userId = user.userId; // Use userId from JWT payload
    if (!userId) {
      console.error('No userId found in req.user:', JSON.stringify(user, null, 2));
      return res.status(400).json({ message: 'Invalid user data in request' });
    }

    const userData = await User.findById(userId);
    if (!userData) {
      console.error(`User not found with ID: ${userId}`);
      return res.status(404).json({ message: `User not found with ID ${userId}` });
    }

    // Log user data for confirmation
    console.log('Found user:', JSON.stringify(userData, null, 2));

    // Generate a new comment ID
    const maxCommentId = blog.comments.length
      ? Math.max(...blog.comments.map((c) => c.id))
      : 0;
    const newComment = {
      id: maxCommentId + 1,
      content,
      posted_by: userData.username,
      userId: userData._id,
      posted_at: new Date(),
    };

    blog.comments.push(newComment);
    blog.comments_count = (blog.comments_count || 0) + 1;
    await blog.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCommentsByBlogId = async (req, res) => {
  try {
    // Find blog by numeric id field
    const blog = await Blog.findOne({ id: parseInt(req.params.blogId) }).select('comments');
    if (!blog) {
      console.error(`Blog not found with id: ${req.params.blogId}`);
      return res.status(404).json({ message: `Blog not found with id ${req.params.blogId}` });
    }
    res.json(blog.comments);
  } catch (error) {
    console.error('Error fetching comments:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};