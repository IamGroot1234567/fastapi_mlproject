import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import HomeButton from '../components/HomeButton'
import API_URL from '../services/api'
import './Register.css'

function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const validateUsername = (username) => {
    if (username.length < 3) {
      return 'Username must be at least 3 characters long'
    }

    if (username.length > 20) {
      return 'Username must not exceed 20 characters'
    }

    if (!/^[A-Za-z0-9_]+$/.test(username)) {
      return 'Username can contain only letters, numbers, and underscore'
    }

    return null
  }

  const validatePassword = (password) => {
    if (password.length < 7) {
      return 'Password must be at least 7 characters long'
    }

    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number'
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return 'Password must contain at least one symbol'
    }

    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage('')

    const usernameError = validateUsername(username)

    if (usernameError) {
      setMessage(usernameError)
      return
    }

    const passwordError = validatePassword(password)

    if (passwordError) {
      setMessage(passwordError)
      return
    }

    const userData = {
      username,
      password,
      phone_number: phoneNumber,
      company_name: companyName || null,
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setMessage('Account created successfully! 🎉')
      } else {
        setSuccess(false)
        setMessage(data.detail || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration failed:', error)
      setSuccess(false)
      setMessage('Unable to connect to the server')
    }
  }

  return (
    <main className="register-page">
      <HomeButton />

      <div className="register-card">
        <p className="register-eyebrow">
          CAR PRICE PREDICTION
        </p>

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Create an account to get started.
        </p>

        {!success && (
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(event) =>
                  setPhoneNumber(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Company / Consultancy</label>

              <input
                type="text"
                placeholder="Optional"
                value={companyName}
                onChange={(event) =>
                  setCompanyName(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="register-button"
            >
              Create Account
            </button>

          </form>
        )}

        {message && (
          <p
            className={
              success
                ? 'register-message success'
                : 'register-message error'
            }
          >
            {message}
          </p>
        )}

        {success && (
          <button
            type="button"
            className="login-after-register-button"
            onClick={() => navigate('/login')}
          >
            → Go to Login
          </button>
        )}

        {!success && (
          <p className="login-text">
            Already have an account?{' '}

            <span onClick={() => navigate('/login')}>
              Login
            </span>
          </p>
        )}
      </div>
    </main>
  )
}

export default Register