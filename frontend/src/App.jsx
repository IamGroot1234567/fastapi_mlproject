import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Home'
import About from './pages/About'
import Travel from './pages/Travel'
import Login from './pages/Login'
import Feedback from './pages/Feedback'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Prediction from './pages/Prediction'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prediction"
          element={
            <ProtectedRoute>
              <Prediction />
            </ProtectedRoute>
          }
        />

        <Route
          path="/travel"
          element={
            <ProtectedRoute>
              <Travel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App