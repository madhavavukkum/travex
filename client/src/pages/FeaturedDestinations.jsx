import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import destinations from '../data/destinations';

const FeaturedDestinations = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (id) => setHoveredCard(id);
  const handleMouseLeave = () => setHoveredCard(null);

  return (
    <section id="destinations" className="py-5 mt-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Featured Destinations</h2>
          <p className="text-muted lead fw-medium">
            Explore our handpicked destinations for your next adventure
          </p>
        </div>

        <Row className="justify-content-center">
          {destinations.map((destination) => (
            <Col
              md={6}
              lg={4}
              key={destination.id}
              className="mb-4"
              onMouseEnter={() => handleMouseEnter(destination.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Card className={`h-100 rounded-3 ${hoveredCard === destination.id ? 'shadow-lg' : 'shadow-sm'}`}>
                <div className="position-relative overflow-hidden">
                  <Card.Img
                    variant="top"
                    src={destination.image}
                    alt={destination.name}
                    className={`rounded-top-3 ${hoveredCard === destination.id ? 'opacity-75' : 'opacity-100'}`}
                    style={{ height: '240px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 bg-primary text-white px-3 py-1 rounded-bottom-start-3">
                    ${destination.price}
                  </div>
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title className="mb-0 fs-5 fw-bold">{destination.name}</Card.Title>
                    <div className="d-flex align-items-center">
                      <FaStar className="text-warning me-1" />
                      <span>{destination.rating}</span>
                    </div>
                  </div>
                  <Card.Text className="text-muted mb-3">
                    {destination.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center text-muted">
                      <FaMapMarkerAlt className="me-1" />
                      <small>{destination.name.split(',')[0]}</small>
                    </div>
                    <div className="d-flex align-items-center text-muted">
                      <FaClock className="me-1" />
                      <small>{destination.duration}</small>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white border-0 pt-0">
                  <Button variant="primary" className="w-100 rounded-pill bg-gradient">
                    Explore Now
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <Button variant="primary" size="lg" className="px-5 rounded-pill bg-gradient">
            View All Destinations
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedDestinations;