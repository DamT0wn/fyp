import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import LiveInterview from './pages/LiveInterview'
import Upload from './pages/Upload'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Results from './pages/Results'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/live-interview" element={<LiveInterview />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/results/:id" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
