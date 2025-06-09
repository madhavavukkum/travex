import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <div className="footer-brand">
              <h4>Travex</h4>
              <p>
                Creating innovative solutions for tomorrow's challenges. 
                Join our team and help shape the future of technology.
              </p>
            </div>
            <div className="social-links">
              <a href="https://facebook.com" aria-label="Facebook" className="social-link">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="social-link">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="social-link">
                <FaLinkedin />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="social-link">
                <FaInstagram />
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5>Company</h5>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/jobs">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5>Resources</h5>
            <ul className="footer-links">
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </Col>
          
          <Col lg={4} md={6}>
            <h5>Contact Us</h5>
            <address className="footer-contact">
              <p>123 Innovation Drive</p>
              <p>San Francisco, CA 94103</p>
              <p>Email: <a href="mailto:careers@Travex.com">careers@Travex.com</a></p>
              <p>Phone: <a href="tel:+14155552671">+1 (415) 555-2671</a></p>
            </address>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Travex. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer