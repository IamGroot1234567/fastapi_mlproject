import { useNavigate } from 'react-router-dom'
import HomeButton from '../components/HomeButton'
import LogoutButton from '../components/LogoutButton'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()

  const token = localStorage.getItem('access_token')
  const payload = JSON.parse(atob(token.split('.')[1]))
  const username = payload.sub

  return (
    <main className="dashboard-page">
      <HomeButton />
      <LogoutButton />

      <div className="dashboard-card">
        <p className="dashboard-eyebrow">💐 WELCOME 💐</p>

        <h1>{username}</h1>

        <p className="dashboard-subtitle">
          Explore 🗺️, Predict 🚗, Connect 🤝
        </p>

        <div className="dashboard-options">
          <button onClick={() => navigate('/prediction')}>
            🚗 Prediction
          </button>

          <button onClick={() => navigate('/travel')}>
            🧳 Travel With Me
          </button>

          <button onClick={() => navigate('/about')}>
            👤 About Me
          </button>

          <button onClick={() => navigate('/feedback')}>
            💬 Feedback
          </button>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
