import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import JobListings from './pages/JobListings'
import JobDetail from './pages/JobDetail'
import AboutPage from './pages/AboutPage'
import Blog from './pages/Blog';
import FeaturedDestinations from './pages/FeaturedDestinations'
import Contact from './pages/Contact'
import ApplicationForm from './components/application/ApplicationForm'
import SavedJobs from './pages/SavedJobs'
import Applications from './pages/Applications'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/apply/:id" element={<ApplicationForm />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/destinations" element={<FeaturedDestinations />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App