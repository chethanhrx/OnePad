// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/index'
import PadPage from './pages/[padId]'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:padId" element={<PadPage />} />
      </Routes>
    </Router>
  )
}

export default App