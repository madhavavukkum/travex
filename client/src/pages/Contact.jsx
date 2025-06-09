import React from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contact.css'; // Assuming you have a CSS file for custom styles

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-overlay"></div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="glass-card">
              <div className="row g-0">
                <div className="col-md-6 form-section">
                  <div className="glass-content p-4 p-md-5">
                    <h2 className="heading-text mb-4">Get in Touch</h2>
                    <p className="text-white-50 mb-4">
                      We'd love to hear from you. Fill out the form and we'll get back to you soon.
                    </p>
                    
                    <form className="contact-form">
                      <div className="form-group">
                        <div className="floating-input">
                          <input type="text" name="name" id="name" placeholder="Name" />
                          <label htmlFor="name">Name</label>
                          <span className="focus-border"></span>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="floating-input">
                          <input type="email" name="email" id="email" placeholder="Email" />
                          <label htmlFor="email">Email</label>
                          <span className="focus-border"></span>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="floating-input">
                          <input type="text" name="subject" id="subject" placeholder="Subject" />
                          <label htmlFor="subject">Subject</label>
                          <span className="focus-border"></span>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="floating-input">
                          <textarea name="message" id="message" placeholder="Message" rows="4"></textarea>
                          <label htmlFor="message">Message</label>
                          <span className="focus-border"></span>
                        </div>
                      </div>

                      <div className="form-group">
                        <button type="submit" className="submit-btn">
                          <span>Send Message</span>
                          <FiSend className="send-icon" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                
                <div className="col-md-6 details-section">
                  <div className="glass-content p-4 p-md-5">
                    <div className="contact-details">
                      <h3>Contact Information</h3>
                      
                      <div className="info-item">
                        <div className="icon-container">
                          <FiMapPin className="icon" />
                        </div>
                        <div>
                          <h5>Our Location</h5>
                          <p>123 Main Street, Suite 200<br />San Francisco, CA 94105</p>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <div className="icon-container">
                          <FiPhone className="icon" />
                        </div>
                        <div>
                          <h5>Phone Number</h5>
                          <p>+1 (123) 456-7890</p>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <div className="icon-container">
                          <FiMail className="icon" />
                        </div>
                        <div>
                          <h5>Email Address</h5>
                          <p>contact@example.com</p>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <div className="icon-container">
                          <FiClock className="icon" />
                        </div>
                        <div>
                          <h5>Working Hours</h5>
                          <p>Monday - Friday: 9AM to 5PM<br />Weekend: Closed</p>
                        </div>
                      </div>
                      
                      <div className="social-links">
                        <h5>Follow Us</h5>
                        <div className="d-flex">
                          <a href="#" className="social-icon">
                            <FaFacebook />
                          </a>
                          <a href="#" className="social-icon">
                            <FaTwitter />
                          </a>
                          <a href="#" className="social-icon">
                            <FaInstagram />
                          </a>
                          <a href="#" className="social-icon">
                            <FaLinkedin />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;