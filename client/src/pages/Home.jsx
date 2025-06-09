import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import Hero from "./Hero"
import jobsData from '../data/jobsData'
import './Home.css'
import FeaturedDestinations from './FeaturedDestinations'

const Home = () => {
  const featuredJobs = jobsData
    .sort((a, b) => new Date(b.posted) - new Date(a.posted))
    .slice(0, 3)
  
  return (
    <div className="home-page">
      <Hero/>
      <FeaturedDestinations/>
      <section className="featured-jobs section-lg">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col md={8} className="text-center">
              <h2 className="section-title">Featured Opportunities</h2>
              <p className="section-subtitle">
                Join our team of talented professionals and help us shape the future of technology.
                Check out our latest openings below.
              </p>
            </Col>
          </Row>
          
          <Row>
            {featuredJobs.map(job => (
              <Col lg={4} md={6} className="mb-4" key={job.id}>
                <Card className="job-card h-100 fade-in">
                  <Card.Body>
                    <div className="job-tag">{job.department}</div>
                    <Card.Title as="h3">{job.title}</Card.Title>
                    <div className="job-details">
                      <span className="job-location">{job.location}</span>
                      <span className="job-type">{job.type}</span>
                    </div>
                    <Card.Text>{job.summary}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to={`/jobs/${job.id}`} className="btn btn-outline-primary">
                      View Details
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          
          <div className="text-center mt-4">
            <Link to="/jobs" className="btn btn-primary btn-lg">
              View All Jobs
            </Link>
          </div>
        </Container>
      </section>
      
      <section className="cta-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} md={6}>
              <h2>Ready to join our team?</h2>
              <p>
                We're always looking for talented individuals to join our growing team.
                If you're passionate about technology and innovation, we want to hear from you.
              </p>
              <div className="cta-buttons">
                <Link to="/jobs" className="btn btn-primary me-3">
                  Browse Openings
                </Link>
                <Link className="btn btn-outline-light">
                  Contact Us
                </Link>
              </div>
            </Col>
            <Col lg={5} md={6} className="d-none d-md-block">
              <img 
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team collaboration" 
                className="img-fluid rounded shadow-lg" 
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home