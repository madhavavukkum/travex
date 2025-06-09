import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Applications.css'

const Applications = () => {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem('jobApplications') || '[]')
    setApplications(apps.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)))
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = () => {
    // For demo purposes, we'll show random statuses
    const statuses = ['Under Review', 'Shortlisted', 'Interview Scheduled', 'Pending']
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Under Review': return 'primary'
      case 'Shortlisted': return 'success'
      case 'Interview Scheduled': return 'warning'
      default: return 'secondary'
    }
  }

  return (
    <div className="applications-page">
      <section className="applications-hero">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1>My Applications</h1>
              <p>
                Track the status of your job applications. You have submitted {applications.length} applications.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="applications-content section">
        <Container>
          {applications.length > 0 ? (
            <Row>
              {applications.map((application, index) => {
                const status = getStatusBadge()
                return (
                  <Col lg={6} className="mb-4" key={index}>
                    <Card className="application-card h-100">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5 className="card-title mb-0">{application.jobTitle}</h5>
                          <Badge bg={getStatusVariant(status)}>{status}</Badge>
                        </div>
                        
                        <div className="application-details mb-3">
                          <p className="mb-1"><strong>Applied Date:</strong> {formatDate(application.appliedDate)}</p>
                          <p className="mb-1"><strong>Name:</strong> {application.fullName}</p>
                          <p className="mb-1"><strong>Email:</strong> {application.email}</p>
                          <p className="mb-1"><strong>Experience:</strong> {application.totalExperience} years</p>
                          <p className="mb-0"><strong>Skills:</strong> {application.technicalSkills.substring(0, 100)}...</p>
                        </div>
                        
                        <div className="application-actions">
                          <Link to={`/jobs/${application.jobId}`} className="btn btn-outline-primary btn-sm me-2">
                            View Job
                          </Link>
                          <Button variant="outline-secondary" size="sm">
                            Download Application
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          ) : (
            <Row className="justify-content-center">
              <Col md={6}>
                <div className="no-applications text-center">
                  <i className="bi bi-file-earmark-text display-1 text-muted mb-3"></i>
                  <h3>No Applications Yet</h3>
                  <p>You haven't submitted any job applications yet. Browse our job listings and apply for positions that interest you.</p>
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

export default Applications