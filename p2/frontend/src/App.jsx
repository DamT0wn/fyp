import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PremiumLanding from './pages/PremiumLanding'
import SimpleLanding from './pages/SimpleLanding'
import FinalLanding from './pages/FinalLanding'
import EnhancedLanding from './pages/EnhancedLanding'
import Landing from './pages/Landing'
import LiveInterview from './pages/LiveInterview'
import Upload from './pages/Upload'
import VideoUpload from './pages/VideoUpload'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Results from './pages/Results'
import Login from './pages/Login'
import Signup from './pages/Signup'
import FirebaseLogin from './pages/FirebaseLogin'
import FirebaseSignup from './pages/FirebaseSignup'
import Profile from './pages/Profile'
import TestUpload from './pages/TestUpload'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PremiumLanding />} />
          <Route path="/simple" element={<SimpleLanding />} />
          <Route path="/polished" element={<FinalLanding />} />
          <Route path="/enhanced" element={<EnhancedLanding />} />
          <Route path="/classic" element={<Landing />} />
          <Route path="/live-interview" element={<LiveInterview />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/video-upload" element={<VideoUpload />} />
          <Route path="/test-upload" element={<TestUpload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/firebase-login" element={<FirebaseLogin />} />
          <Route path="/firebase-signup" element={<FirebaseSignup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
