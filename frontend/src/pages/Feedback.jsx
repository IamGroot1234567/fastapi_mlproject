import { useState } from 'react'
import API_URL from '../services/api'
import HomeButton from '../components/HomeButton'
import DashboardButton from '../components/DashboardButton'
import LogoutButton from '../components/LogoutButton'
import './Feedback.css'

function Feedback() {
  const [message, setMessage] = useState('')
  const [responseMessage, setResponseMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('access_token')

    try {
      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setResponseMessage(
          'Feedback received. You said it. We heard it. 😎'
        )
      } else {
        setSuccess(false)
        setResponseMessage(
          data.detail || 'Something went wrong'
        )
      }
    } catch (error) {
      console.error('Feedback submission failed:', error)
      setSuccess(false)
      setResponseMessage('Unable to submit feedback')
    }
  }

  return (
    <main className="feedback-page">
      <HomeButton />
      <DashboardButton />
      <LogoutButton />

      <div className="feedback-card">
        <p className="feedback-eyebrow">FEEDBACK</p>

        <h1>Share Your Thoughts</h1>

        <p className="feedback-subtitle">
          Don't hold back. Make it brutally honest........😈
        </p>

        {!success && (
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your feedback..."
              minLength={6}
              maxLength={49}
              required
            />

            <p className="character-count">
              {message.length}/49
            </p>

            <button
              type="submit"
              className="feedback-button"
            >
              Submit Feedback
            </button>
          </form>
        )}

        {responseMessage && (
          <p
            className={
              success
                ? 'feedback-message success'
                : 'feedback-message error'
            }
          >
            {responseMessage}
          </p>
        )}
      </div>
    </main>
  )
}

export default Feedback
