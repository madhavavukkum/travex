import { useState } from 'react';
import { Container, Row, Col, Form, Button, Carousel } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const Hero = () => {
  const images = [
    '/banner1.jpeg',
    '/banner2.jpg',
    '/banner3.jpg',
    '/banner4.jpg'
  ];

const h1arr = [
  'Relax and Unwind on Pristine Beaches',
  'Discover Your Dream Destinations',
  'Explore the Beauty of World Cultures',
  'Adventure Awaits in Majestic Landscapes'
];


  const parr = [
    'Embark on unforgettable adventures with our expertly crafted travel packages.',
    'Unwind with our curated beach getaways to tropical paradises.',
    'Immerse yourself in the traditions and flavors of iconic cities.',
    'Conquer mountains and discover the beauty of untouched wilderness.'
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      id="home"
      style={{
        height: '100vh',
        minHeight: '600px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Carousel
        fade
        controls={false}
        indicators={true}
        interval={5000}
        pause={false}
        onSelect={(index) => setActiveIndex(index)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div
              style={{
                height: '100vh',
                minHeight: '600px',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      >
        <Container className="h-100 d-flex align-items-center" style={{ position: 'relative', zIndex: 2 }}>
          <Row className="w-100">
            <Col lg={8} className="text-white">
              <div
                style={{
                  transition: 'opacity 0.5s ease',
                  opacity: 1
                }}
              >
                <h1 className="display-4 text-white fw-bold mb-4">{h1arr[activeIndex]}</h1>
                <p className="lead mb-5">{parr[activeIndex]}</p>
              </div>
              <div className="p-4 shadow" style={{ backgroundColor: '#f8f9fa', borderRadius: '1.5rem' }}>
                <Form>
                  <Row className="g-3 align-items-end">
                    <Col md={4}>
                      <Form.Group controlId="formDestination">
                        <Form.Label className="text-primary fw-bold">
                          <FaMapMarkerAlt className="me-2" /> Destination
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Where to?"
                          className="border-primary rounded-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="formCheckIn">
                        <Form.Label className="text-primary fw-bold">
                          <FaCalendarAlt className="me-2" /> Check In
                        </Form.Label>
                        <Form.Control
                          type="date"
                          className="border-primary rounded-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="formTravelers">
                        <Form.Label className="text-primary fw-bold">
                          <FaUsers className="me-2" /> Travelers
                        </Form.Label>
                        <Form.Select
                          className="border-primary rounded-3"
                          style={{
                            height: '38px',
                            borderRadius: '3px'
                          }}
                        >
                          <option>1 Person</option>
                          <option>2 People</option>
                          <option>3 People</option>
                          <option>4+ People</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={2} className="d-flex align-items-end">
                      <Button
                        variant="primary"
                        className="w-100 py-2 bg-gradient rounded-3"
                        size="lg"
                      >
                        <FaSearch className="me-2" /> Search
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Hero;