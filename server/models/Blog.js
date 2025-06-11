// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  content: [
    {
      type: { type: String, required: true },
      text: String,
      quote: String,
      heading: String,
      id: String,
      images: [
        {
          src: String,
          alt: String,
          cols: Number,
        },
      ],
      note: String,
    },
  ],
  image: String,
  category: String,
  created_at: Date,
  updated_at: Date,
  created_by: String,
  likes_count: Number,
  comments_count: Number,
  actions: {
    view: String,
    edit: String,
    delete: String,
  },
  is_published: Boolean,
  tags: [String],
  comments: [
    {
      id: { type: Number, required: true },
      content: String,
      posted_by: String,
      posted_at: Date,
    },
  ],
  likes: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      username: String,
      createdAt: Date,
    },
  ],
  related_posts: [
    {
      id: Number,
      title: String,
      image: String,
      category: String,
      excerpt: String,
      created_at: Date,
    },
  ],
});

module.exports = mongoose.model('Blog', blogSchema);