// controllers/blogController.js
const Blog = require('../models/Blog');

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({ id: req.params.id });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};