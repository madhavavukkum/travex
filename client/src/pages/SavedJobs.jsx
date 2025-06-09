import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './SavedJobs.css'

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([])

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
    setSavedJobs(jobs)
  }, [])

  const removeSavedJob = (jobId) => {
    const updatedJobs = savedJobs.filter(job => job.id !== jobId)
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs))
    setSavedJobs(updatedJobs)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="saved-jobs-page">
      <section className="saved-jobs-hero">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1>Saved Jobs</h1>
              <p>
                Keep track of positions you're interested in. You have {savedJobs.length} saved jobs.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="saved-jobs-content section">
        <Container>
          {savedJobs.length > 0 ? (
            <Row>
              {savedJobs.map(job => (
                <Col lg={6} className="mb-4" key={job.id}>
                  <Card className="saved-job-card h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="job-tag">{job.department}</span>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeSavedJob(job.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                      
                      <Card.Title as="h3">
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                      </Card.Title>
                      
                      <div className="job-meta mb-2">
                        <span className="job-location">{job.location}</span>
                        <span className="job-type">{job.type}</span>
                        {job.remote && <span className="job-remote">Remote</span>}
                      </div>
                      
                      <Card.Text>{job.summary}</Card.Text>
                      
                      <div className="job-tags mb-3">
                        {job.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} bg="light" text="dark" className="job-tag-badge me-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="saved-date mb-3">
                        <small className="text-muted">
                          Saved on {formatDate(job.savedDate)}
                        </small>
                      </div>
                    </Card.Body>
                    
                    <Card.Footer className="bg-transparent">
                      <div className="d-flex gap-2">
                        <Link to={`/jobs/${job.id}`} className="btn btn-outline-primary">
                          View Details
                        </Link>
                        <Link to={`/apply/${job.id}`} className="btn btn-primary">
                          Apply Now
                        </Link>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Row className="justify-content-center">
              <Col md={6}>
                <div className="no-saved-jobs text-center">
                  <i className="bi bi-bookmark display-1 text-muted mb-3"></i>
                  <h3>No Saved Jobs</h3>
                  <p>You haven't saved any jobs yet. Browse our job listings and save the ones you're interested in.</p>
                  <Link to="/jobs" className="btn btn-primary">
                    Browse Jobs
                  </Link>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </div>
  )
}

export default SavedJobs