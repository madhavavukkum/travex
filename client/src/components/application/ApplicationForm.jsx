import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Card, ProgressBar, Alert } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import jobsData from '../../data/jobsData'
import './ApplicationForm.css'

const ApplicationForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    
    // Educational Background
    highestQualification: '',
    degreeName: '',
    specialization: '',
    collegeName: '',
    graduationYear: '',
    grades: '',
    
    // Professional Experience
    totalExperience: '',
    companies: [{ name: '', jobTitle: '', startDate: '', endDate: '', responsibilities: '' }],
    technicalSkills: '',
    languages: '',
    
    // Portfolio/Links
    github: '',
    linkedin: '',
    portfolio: ''
  })
  
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' })

  useEffect(() => {
    const jobId = parseInt(id)
    const foundJob = jobsData.find(job => job.id === jobId)
    setJob(foundJob)
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCompanyChange = (index, field, value) => {
    const updatedCompanies = [...formData.companies]
    updatedCompanies[index][field] = value
    setFormData(prev => ({
      ...prev,
      companies: updatedCompanies
    }))
  }

  const addCompany = () => {
    setFormData(prev => ({
      ...prev,
      companies: [...prev.companies, { name: '', jobTitle: '', startDate: '', endDate: '', responsibilities: '' }]
    }))
  }

  const removeCompany = (index) => {
    if (formData.companies.length > 1) {
      const updatedCompanies = formData.companies.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        companies: updatedCompanies
      }))
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Save to localStorage
    const applicationData = {
      jobId: job.id,
      jobTitle: job.title,
      appliedDate: new Date().toISOString(),
      ...formData
    }
    
    // Get existing applications
    const existingApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]')
    existingApplications.push(applicationData)
    localStorage.setItem('jobApplications', JSON.stringify(existingApplications))
    
    setSubmitStatus({
      success: true,
      message: 'Your application has been submitted successfully!'
    })
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/jobs')
    }, 3000)
  }

  const renderStep1 = () => (
    <Card className="step-card">
      <Card.Header>
        <h4>Personal Information</h4>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gender (Optional)</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-3">
          <Form.Label>Address *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Card.Body>
    </Card>
  )

  const renderStep2 = () => (
    <Card className="step-card">
      <Card.Header>
        <h4>Educational Background</h4>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Highest Qualification *</Form.Label>
              <Form.Select
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Qualification</option>
                <option value="high-school">High School</option>
                <option value="diploma">Diploma</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Degree Name *</Form.Label>
              <Form.Control
                type="text"
                name="degreeName"
                value={formData.degreeName}
                onChange={handleInputChange}
                placeholder="e.g., B.Tech, M.Sc, MBA"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Specialization *</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science, Electronics"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>College/University Name *</Form.Label>
              <Form.Control
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Graduation Year *</Form.Label>
              <Form.Control
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleInputChange}
                min="1950"
                max="2030"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Grades/Percentage/CGPA *</Form.Label>
              <Form.Control
                type="text"
                name="grades"
                value={formData.grades}
                onChange={handleInputChange}
                placeholder="e.g., 8.5 CGPA, 85%, A Grade"
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )

  const renderStep3 = () => (
    <Card className="step-card">
      <Card.Header>
        <h4>Professional Experience</h4>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-4">
          <Form.Label>Total Years of Experience *</Form.Label>
          <Form.Select
            name="totalExperience"
            value={formData.totalExperience}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Experience</option>
            <option value="0">Fresher (0 years)</option>
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </Form.Select>
        </Form.Group>

        <h5>Work Experience</h5>
        {formData.companies.map((company, index) => (
          <Card key={index} className="mb-3 company-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6>Company {index + 1}</h6>
                {formData.companies.length > 1 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeCompany(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={company.name}
                      onChange={(e) => handleCompanyChange(index, 'name', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={company.jobTitle}
                      onChange={(e) => handleCompanyChange(index, 'jobTitle', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={company.startDate}
                      onChange={(e) => handleCompanyChange(index, 'startDate', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={company.endDate}
                      onChange={(e) => handleCompanyChange(index, 'endDate', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Job Responsibilities</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={company.responsibilities}
                  onChange={(e) => handleCompanyChange(index, 'responsibilities', e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        ))}
        
        <Button variant="outline-primary" onClick={addCompany} className="mb-4">
          Add Another Company
        </Button>
        
        <Form.Group className="mb-3">
          <Form.Label>Technical Skills *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="technicalSkills"
            value={formData.technicalSkills}
            onChange={handleInputChange}
            placeholder="e.g., JavaScript, React, Node.js, Python, SQL"
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Languages Known</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="languages"
            value={formData.languages}
            onChange={handleInputChange}
            placeholder="e.g., English (Fluent), Spanish (Intermediate)"
          />
        </Form.Group>
      </Card.Body>
    </Card>
  )

  const renderStep4 = () => (
    <Card className="step-card">
      <Card.Header>
        <h4>Portfolio & Links</h4>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Label>GitHub Profile</Form.Label>
          <Form.Control
            type="url"
            name="github"
            value={formData.github}
            onChange={handleInputChange}
            placeholder="https://github.com/yourusername"
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>LinkedIn Profile</Form.Label>
          <Form.Control
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Portfolio Website</Form.Label>
          <Form.Control
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
            placeholder="https://yourportfolio.com"
          />
        </Form.Group>
        
        <div className="application-summary mt-4">
          <h5>Application Summary</h5>
          <p><strong>Position:</strong> {job?.title}</p>
          <p><strong>Department:</strong> {job?.department}</p>
          <p><strong>Location:</strong> {job?.location}</p>
          <p><strong>Applicant:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
        </div>
      </Card.Body>
    </Card>
  )

  if (!job) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Job Not Found</h2>
          <p>The job you're trying to apply for doesn't exist.</p>
        </div>
      </Container>
    )
  }

  if (submitStatus.success) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="success" className="text-center">
              <h4>Application Submitted Successfully!</h4>
              <p>{submitStatus.message}</p>
              <p>You will be redirected to the jobs page shortly...</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <div className="application-form-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="application-header mb-4">
              <h2>Apply for {job.title}</h2>
              <p className="text-muted">{job.department} • {job.location}</p>
            </div>
            
            <div className="progress-section mb-4">
              <div className="step-indicators mb-3">
                {[1, 2, 3, 4].map(step => (
                  <div
                    key={step}
                    className={`step-indicator ${currentStep >= step ? 'active' : ''}`}
                  >
                    <span className="step-number">{step}</span>
                    <span className="step-label">
                      {step === 1 && 'Personal'}
                      {step === 2 && 'Education'}
                      {step === 3 && 'Experience'}
                      {step === 4 && 'Portfolio'}
                    </span>
                  </div>
                ))}
              </div>
              <ProgressBar now={(currentStep / 4) * 100} className="mb-4" />
            </div>
            
            <Form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              
              <div className="form-navigation mt-4">
                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-secondary"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button variant="primary" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button variant="success" type="submit">
                      Submit Application
                    </Button>
                  )}
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ApplicationForm