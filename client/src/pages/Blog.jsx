import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Nav, Alert } from 'react-bootstrap';
import { FaHeart, FaShareAlt, FaBookmark, FaArrowUp, FaComments } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Blog.css';

const Blog = () => {
  const tocRefs = useRef({});
  const contentRef = useRef(null);
  const [blogData, setBlogData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [likesCount, setLikesCount] = useState(0);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch blog data and comments
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogResponse = await axios.get('http://localhost:5000/api/blogs/1');
        setBlogData(blogResponse.data);
        setLikesCount(blogResponse.data.likes_count);

        // Fetch comments from the blog document
        const commentsResponse = await axios.get(`http://localhost:5000/api/comments/${blogResponse.data._id}`);
        setComments(commentsResponse.data.map(comment => ({
          id: comment.id,
          content: comment.content,
          posted_by: comment.posted_by,
          posted_at: comment.posted_at,
          userId: comment.userId,
          likes: 0,
        })));
      } catch (err) {
        toast.error('Failed to load blog data', { position: "top-right", autoClose: 3000 });
        console.error(err);
      }
    };

    // Check authentication status
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    fetchBlogData();
  }, []);

  // Smooth scrolling to section
  const scrollToSection = (id) => {
    const element = tocRefs.current[id];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  // Highlight active TOC item on scroll
  useEffect(() => {
    const highlightActiveTocItem = () => {
      const sections = contentRef.current?.querySelectorAll('h3[id]');
      let currentSectionId = '';
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150 && sectionTop > -section.offsetHeight) {
          currentSectionId = section.id;
        }
      });
      document.querySelectorAll('.toc-link').forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('data-id') === currentSectionId) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', highlightActiveTocItem);
    return () => window.removeEventListener('scroll', highlightActiveTocItem);
  }, []);

  // Handle adding a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to post a comment', { position: "top-right", autoClose: 3000 });
      return;
    }
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/comments',
        {
          blogId: blogData._id,
          content: newComment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newCommentObj = {
        id: response.data.id,
        content: response.data.content,
        posted_by: response.data.posted_by,
        posted_at: response.data.posted_at,
        userId: response.data.userId,
        likes: 0,
      };

      setComments([...comments, newCommentObj]);
      setNewComment('');
      toast.success('Comment posted successfully!', { position: "top-right", autoClose: 3000 });
    } catch (err) {
      toast.error('Failed to post comment', { position: "top-right", autoClose: 3000 });
      console.error(err);
    }
  };

  // Handle editing a comment (client-side only)
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.content);
  };

  // Handle saving edited comment (client-side only)
  const handleSaveEdit = (id) => {
    if (!editText.trim()) return;
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, content: editText } : comment
      )
    );
    setEditingCommentId(null);
    setEditText('');
    toast.success('Comment updated successfully!', { position: "top-right", autoClose: 3000 });
  };

  // Handle deleting a comment (client-side only)
  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    toast.success('Comment deleted successfully!', { position: "top-right", autoClose: 3000 });
  };

  // Handle liking a comment (client-side only)
  const handleLikeComment = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  // Handle liking the main post (client-side only)
  const handleLikePost = () => {
    setLikesCount(likesCount + 1);
  };

  if (!blogData) {
    return <Container>Loading...</Container>;
  }

  return (
    <>
      <ToastContainer />
      
      {/* Error Alert */}
      {error && (
        <Container className="my-3">
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        </Container>
      )}

      {/* Hero Section */}
      <Container className="my-5 animate__animated animate__fadeIn">
        <div
          className="hero-image"
          style={{ backgroundImage: `url(${blogData.image})` }}
        >
          <div className="position-absolute bottom-0 start-0 p-5 text-white">
            <div className="d-flex align-items-center mb-3">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Author"
                className="author-avatar me-3"
              />
              <div>
                <h5 className="mb-0 text-white">{blogData.created_by}</h5>
                <small className="text-light">
                  Posted on {new Date(blogData.created_at).toLocaleDateString()}
                </small>
              </div>
            </div>
            <h1 className="display-4 fw-bold mb-3 text-white">{blogData.title}</h1>
            <Badge bg="warning" text="dark" className="fs-6 p-2">
              {blogData.category}
            </Badge>
          </div>
        </div>
      </Container>

      {/* Main Content */}
      <Container className="mb-5">
        <Row>
          {/* Content Area */}
          <Col lg={8}>
            <Card className="shadow-sm border-0 animate__animated animate__fadeInUp">
              <Card.Body className="p-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    {blogData.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        bg={
                          tag === 'Travel'
                            ? 'primary'
                            : tag === 'Adventure'
                            ? 'success'
                            : 'info'
                        }
                        className="me-2 tag"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div>
                    <Button variant="outline-danger" className="like-btn" onClick={handleLikePost}>
                      <FaHeart className="me-1" /> {likesCount} Likes
                    </Button>
                  </div>
                </div>

                <div className="content mb-5" ref={contentRef}>
                  {blogData.content.map((item, index) => (
                    <div key={index}>
                      {item.type === 'intro' && (
                        <p className="lead">{item.text}</p>
                      )}
                      {item.type === 'quote' && (
                        <div className="blockquote-custom">
                          <p>{item.text}</p>
                        </div>
                      )}
                      {item.type === 'destination' && (
                        <div
                          ref={(el) => (tocRefs.current[item.id] = el)}
                          id={item.id}
                        >
                          <h3>{item.heading}</h3>
                          <p>{item.text}</p>
                          {item.images && (
                            <Row className="gallery-grid">
                              {item.images.map((img, imgIndex) => (
                                <Col key={imgIndex} md={img.cols} className="mb-3">
                                  <img
                                    src={img.src}
                                    className="img-fluid rounded shadow"
                                    alt={img.alt}
                                  />
                                </Col>
                              ))}
                            </Row>
                          )}
                          {item.note && (
                            <div className="note-card">
                              <h5>Note:</h5>
                              <p>{item.note}</p>
                            </div>
                          )}
                          {item.quote && (
                            <div className="blockquote-custom">
                              <p>{item.quote}</p>
                            </div>
                          )}
                        </div>
                      )}
                      {item.type === 'outro' && <p>{item.text}</p>}
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between border-top border-bottom py-3 mb-4">
                  <Button variant="outline-primary">
                    <FaShareAlt className="me-1" /> Share
                  </Button>
                  <Button variant="outline-secondary">
                    <FaBookmark className="me-1" /> Save
                  </Button>
                </div>

                {/* Comments Section */}
                <div className="mb-5">
                  <h4 className="mb-4">
                    <FaComments className="me-2" /> {comments.length} Comments
                  </h4>
                  {comments.map((comment) => (
                    <Card
                      key={comment.id}
                      className="mb-3 border-0 shadow-sm animate__animated animate__fadeIn comment-card"
                    >
                      <Card.Body>
                        <div className="d-flex">
                          <img
                            src={`https://randomuser.me/api/portraits/${
                              comment.posted_by === 'Alice' ? 'women/44' : 'men/22'
                            }.jpg`}
                            alt={comment.posted_by}
                            className="rounded-circle me-3"
                            width="50"
                            height="50"
                          />
                          <div>
                            <h6 className="mb-1">{comment.posted_by}</h6>
                            <small className="text-muted">
                              {new Date(comment.posted_at).toLocaleString()}
                            </small>
                            {editingCommentId === comment.id ? (
                              <div>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className="mt-2"
                                />
                                <Button
                                  variant="success"
                                  size="sm"
                                  className="mt-2 me-2"
                                  onClick={() => handleSaveEdit(comment.id)}
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => setEditingCommentId(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <p className="mt-2 mb-0">{comment.content}</p>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="mt-2 text-primary"
                                  onClick={() => handleEditComment(comment)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="mt-2 text-danger"
                                  onClick={() => handleDeleteComment(comment.id)}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="mt-2 text-info"
                                  onClick={() => handleLikeComment(comment.id)}
                                >
                                  <FaHeart className="me-1" /> {comment.likes} Likes
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}

                  {/* Comment Form */}
                  <Card className="border-0 shadow-sm animate__animated animate__fadeIn">
                    <Card.Body>
                      <h5 className="card-title">Leave a Comment</h5>
                      <Form onSubmit={handleAddComment}>
                        <Form.Group className="mb-3">
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Share your thoughts..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            disabled={!isAuthenticated}
                          />
                        </Form.Group>
                        <Button type="submit" variant="primary" disabled={!isAuthenticated}>
                          Post Comment
                        </Button>
                      </Form>
                      {!isAuthenticated && (
                        <p className="mt-2 text-muted">
                          Please <a href="/login">log in</a> to post a comment.
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Table of Contents */}
          <Col lg={4}>
            <Card className="shadow-sm border-0 toc">
              <Card.Body>
                <h5 className="card-title">Table of Contents</h5>
                <Nav className="flex-column">
                  {blogData.content
                    .filter((item) => item.type === 'destination')
                    .map((item) => (
                      <Nav.Link
                        key={item.id}
                        data-id={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="toc-link"
                      >
                        {item.heading}
                      </Nav.Link>
                    ))}
                </Nav>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Related Posts */}
      <div className="bg-white py-5">
        <Container>
          <h3 className="mb-4 text-center animate__animated animate__fadeIn">
            You Might Also Like
          </h3>
          <Row>
            {blogData.related_posts.map((post) => (
              <Col key={post.id} md={4} className="mb-4 animate__animated animate__fadeInUp">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Img variant="top" src={post.image} alt={post.title} />
                  <Card.Body>
                    <Badge
                      bg={
                        post.category === 'Travel Tips'
                          ? 'info'
                          : post.category === 'Beaches'
                          ? 'success'
                          : 'warning'
                      }
                      className="mb-2"
                    >
                      {post.category}
                    </Badge>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.excerpt}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0">
                    <small className="text-muted">
                      Posted on {new Date(post.created_at).toLocaleDateString()}
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Floating Action Button */}
      <div className="floating-action-btn">
        <Button
          variant="primary"
          className="rounded-circle shadow-lg"
          title="Back to Top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaArrowUp />
        </Button>
      </div>
    </>
  );
};

export default Blog;