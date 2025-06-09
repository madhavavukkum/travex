import { useEffect, useRef, useState } from 'react';
import { Container, Navbar as BsNavbar, Nav, Button } from 'react-bootstrap';
import { FaPlane, FaUserCircle, FaBars } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
    clearTimeout(timeoutRef.current);

    const handleNavigation = () => {
      if (window.scrollY > 0) {
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }
    };

    handleNavigation();

    const handleScroll = () => {
      clearTimeout(timeoutRef.current);

      if (window.scrollY === 0) {
        setIsVisible(true);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, [location]);

  return (
    <BsNavbar
      expand="lg"
      fixed="top"
      className={`py-3 transition-all duration-300 custom-navbar ${
        isVisible ? 'navbar-visible' : 'navbar-hidden'
      }`}
    >
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaPlane className="me-2 text-primary" size={28} />
          <span className="fw-bold text-white">Travex</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
          <FaBars />
        </BsNavbar.Toggle>
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              className="mx-3 py-2 px-3 rounded-3 transition-colors duration-200 text-white bg-opacity-10 hover:bg-light hover:bg-opacity-25"
              end
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/destinations"
              className="mx-3 py-2 px-3 rounded-3 transition-colors duration-200 text-white bg-opacity-10 hover:bg-light hover:bg-opacity-25"
            >
              Destinations
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/blog"
              className="mx-3 py-2 px-3 rounded-3 transition-colors duration-200 text-white bg-opacity-10 hover:bg-light hover:bg-opacity-25"
            >
              Blog
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/jobs"
              className="mx-3 py-2 px-3 rounded-3 transition-colors duration-200 text-white bg-opacity-10 hover:bg-light hover:bg-opacity-25"
            >
              Careers
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              className="mx-3 py-2 px-3 rounded-3 transition-colors duration-200 text-white bg-opacity-10 hover:bg-light hover:bg-opacity-25"
            >
              Contact
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center button-group">
            <Button
              variant="outline-light"
              className="me-4 rounded-pill px-3 py-2 fw-medium"
              as={Link}
              to="/login"
            >
              <FaUserCircle className="me-2" />
              Login
            </Button>
            <Button
              variant="primary"
              className="rounded-pill px-4 py-2 fw-medium bg-gradient shadow-sm"
              as={Link}
              to="/book"
            >
              Book Now
            </Button>
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;