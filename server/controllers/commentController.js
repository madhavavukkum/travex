// controllers/commentController.js
const Blog = require('../models/Blog');

exports.addComment = async (req, res) => {
  try {
    const { blogId, content } = req.body;
    const user = req.user; // From protect middleware

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Generate a new comment ID (increment the highest existing ID)
    const maxCommentId = blog.comments.length
      ? Math.max(...blog.comments.map((c) => c.id))
      : 0;
    const newComment = {
      id: maxCommentId + 1,
      content,
      posted_by: user.username,
      posted_at: new Date(),
    };

    blog.comments.push(newComment);
    blog.comments_count = (blog.comments_count || 0) + 1;
    await blog.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCommentsByBlogId = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId).select('comments');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};