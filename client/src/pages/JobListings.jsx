import { Link } from 'react-router-dom'
import jobsData from '../data/jobsData'
import './JobListings.css'
import { useState } from 'react'
import { Container, Row, Col, Form, Card, Badge, Nav } from 'react-bootstrap'
import SaveJobButton from '../components/common/SaveJobButton'

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedRemote, setSelectedRemote] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  
  // Extract unique departments and locations for filters
  const departments = [...new Set(jobsData.map(job => job.department))]
  const locations = [...new Set(jobsData.map(job => job.location))]
  
  // Filter jobs based on search and filter criteria
  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = selectedDepartment === '' || job.department === selectedDepartment
    const matchesLocation = selectedLocation === '' || job.location === selectedLocation
    const matchesRemote = selectedRemote === '' || 
                         (selectedRemote === 'remote' && job.remote) || 
                         (selectedRemote === 'onsite' && !job.remote)
    
    return matchesSearch && matchesDepartment && matchesLocation && matchesRemote
  })
  
  return (
    <div className="job-listings-page">
      <section className="jobs-hero">
        <Container className='mt-5'>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1>Career Opportunities</h1>
              <p>
                Join our team of talented professionals and help us shape the future of technology. 
                Explore our current openings below.
              </p>
              <Form className="search-form">
                <Form.Control
                  type="text"
                  placeholder="Search for jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="careers-navigation">
        <Container>
          <Nav variant="pills" className="justify-content-center">
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'all'} 
                onClick={() => setActiveTab('all')}
                as={Link}
                to="/jobs"
              >
                All Jobs
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'saved'} 
                onClick={() => setActiveTab('saved')}
                as={Link}
                to="/saved-jobs"
              >
                Saved Jobs
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'applications'} 
                onClick={() => setActiveTab('applications')}
                as={Link}
                to="/applications"
              >
                My Applications
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </section>
      
      <section className="jobs-listing section">
        <Container>
          <Row>
            <Col lg={3} md={4}>
              <div className="filters-container">
                <h4>Filters</h4>
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label>Department</Form.Label>
                    <Form.Select 
                      value={selectedDepartment} 
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option value="">All Departments</option>
                      {departments.map((dept, index) => (
                        <option key={index} value={dept}>{dept}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Location</Form.Label>
                    <Form.Select 
                      value={selectedLocation} 
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">All Locations</option>
                      {locations.map((loc, index) => (
                        <option key={index} value={loc}>{loc}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Work Type</Form.Label>
                    <Form.Select 
                      value={selectedRemote} 
                      onChange={(e) => setSelectedRemote(e.target.value)}
                    >
                      <option value="">All Types</option>
                      <option value="remote">Remote</option>
                      <option value="onsite">On-site</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </div>
            </Col>
            
            <Col lg={9} md={8}>
              <div className="jobs-count">
                <p>Showing {filteredJobs.length} jobs</p>
              </div>
              
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <Card key={job.id} className="job-listing-card mb-4 slide-up">
                    <Card.Body className="position-relative">
                      <div className="save-job-top-right">
                        <SaveJobButton job={job} showText={true} />
                      </div>
                      
                      <Row>
                        <Col md={10}>
                          <div className="job-tag">{job.department}</div>
                          <Card.Title as="h3">
                            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                          </Card.Title>
                          <div className="job-meta">
                            <span className="job-location">{job.location}</span>
                            <span className="job-type">{job.type}</span>
                            {job.remote && <span className="job-remote">Remote</span>}
                          </div>
                          <Card.Text>{job.summary}</Card.Text>
                          <div className="job-tags">
                            {job.tags.slice(0, 4).map((tag, index) => (
                              <Badge key={index} bg="light" text="dark" className="job-tag-badge">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </Col>
                        <Col md={2} className="d-flex align-items-end justify-content-md-end mt-3 mt-md-0">
                          <Link to={`/jobs/${job.id}`} className="btn btn-outline-primary">
                            View Details
                          </Link>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <div className="no-jobs">
                  <p>No jobs match your search criteria. Try adjusting your filters.</p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default JobListings