import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import API_URL from '../services/api'
import HomeButton from '../components/HomeButton'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage('')

    const loginData = {
      username,
      password,
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token)
        navigate('/dashboard')
      } else {
        setMessage(data.detail || 'Login failed')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setMessage('Unable to connect to the server.')
    }
  }

  return (
    <main className="login-page">
      <HomeButton />

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to continue to the application.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          {message && (
            <p className="login-message">
              {message}
            </p>
          )}
        </form>

        <p className="register-text">
          Don't have an account?{' '}

          <span onClick={() => navigate('/register')}>
            Register
          </span>
        </p>
      </div>
    </main>
  )
}

export default Login
