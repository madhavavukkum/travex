import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import './SaveJobButton.css'

const SaveJobButton = ({ job, variant = "outline-secondary", size = "sm", className = "", showText = false }) => {
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Check if job is already saved
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
    setIsSaved(savedJobs.some(savedJob => savedJob.id === job.id))
  }, [job.id])

  const toggleSaveJob = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
    
    if (isSaved) {
      // Remove from saved jobs
      const updatedJobs = savedJobs.filter(savedJob => savedJob.id !== job.id)
      localStorage.setItem('savedJobs', JSON.stringify(updatedJobs))
      setIsSaved(false)
    } else {
      // Add to saved jobs
      const jobToSave = {
        ...job,
        savedDate: new Date().toISOString()
      }
      savedJobs.push(jobToSave)
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs))
      setIsSaved(true)
    }
  }

  return (
    <Button
      variant={isSaved ? "warning" : variant}
      size={size}
      onClick={toggleSaveJob}
      className={`save-job-btn ${isSaved ? 'saved' : ''} ${className}`}
    >
      <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
      {(size === 'lg' || showText) ? (isSaved ? ' Saved' : ' Save') : ''}
    </Button>
  )
}

export default SaveJobButton