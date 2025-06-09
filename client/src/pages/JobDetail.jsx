import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Badge } from 'react-bootstrap'
import jobsData from '../data/jobsData'
import './JobDetail.css'
import SaveJobButton from '../components/common/SaveJobButton'

const JobDetail = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate fetching job data
    const jobId = parseInt(id)
    const foundJob = jobsData.find(job => job.id === jobId)
    
    setTimeout(() => {
      setJob(foundJob)
      setLoading(false)
    }, 300)
  }, [id])
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading job details...</p>
      </div>
    )
  }
  
  if (!job) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Job Not Found</h2>
          <p>The job listing you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs" className="btn btn-primary">
            Browse All Jobs
          </Link>
        </div>
      </Container>
    )
  }
  
  // Format the posted date
  const formattedDate = new Date(job.posted).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  return (
    <div className="job-detail-page">
      <div className="job-detail-header">
        <Container className='mt-5'>
          <span className="back-link mt-5">
            <Link to="/jobs">← Back to job listings</Link>
          </span>
          <div className="job-detail-meta">
            <span className="job-tag">{job.department}</span>
            {job.remote && <span className="job-remote-badge">Remote</span>}
          </div>
          <h1>{job.title}</h1>
          <div className="job-info">
            <div className="job-info-item">
              <span className="job-info-label">Location:</span>
              <span className="job-info-value">{job.location}</span>
            </div>
            <div className="job-info-item">
              <span className="job-info-label">Job Type:</span>
              <span className="job-info-value">{job.type}</span>
            </div>
            {job.salary && (
              <div className="job-info-item">
                <span className="job-info-label">Salary Range:</span>
                <span className="job-info-value">{job.salary}</span>
              </div>
            )}
            <div className="job-info-item">
              <span className="job-info-label">Posted:</span>
              <span className="job-info-value">{formattedDate}</span>
            </div>
          </div>
        </Container>
      </div>
      
      <Container className="job-detail-content">
        <Row>
          <Col lg={8} className="mb-4 mb-lg-0">
            <div className="job-description">
              <h2>About the Role</h2>
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
              
              <div className="job-tags-section">
                <h3>Keywords</h3>
                <div className="job-tags">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} bg="light" text="dark" className="job-tag-badge">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={4}>
            <div className="job-apply-container">
              <div className="job-apply-card">
                <h3>Interested in this role?</h3>
                <p>We'd love to hear from you! Submit your application and we'll get back to you soon.</p>
                <Link to={`/apply/${job.id}`} className="btn btn-primary btn-lg w-100 mb-3">
                  Apply Now
                </Link>
                <SaveJobButton job={job} variant="outline-primary" size="lg" className="w-100" />
              </div>
              
              <div className="company-card">
                <h4>About TechVision</h4>
                <p>
                  TechVision is a leading technology company dedicated to innovation and 
                  excellence. We offer competitive compensation, great benefits, and a 
                  supportive work environment.
                </p>
                <Link to="/about" className="btn btn-link p-0">
                  Learn more about us
                </Link>
              </div>
              
              <div className="share-card">
                <h4>Share This Job</h4>
                <div className="share-buttons">
                  <Button variant="outline-primary" className="me-2">
                    LinkedIn
                  </Button>
                  <Button variant="outline-primary" className="me-2">
                    Twitter
                  </Button>
                  <Button variant="outline-primary">
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default JobDetail