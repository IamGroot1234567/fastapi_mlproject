import { useNavigate } from 'react-router-dom'
import HomeButton from '../components/HomeButton'
import LogoutButton from '../components/LogoutButton'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <main className="dashboard-page">
      <HomeButton />
      <LogoutButton />

      <div className="dashboard-card">
        <p className="dashboard-eyebrow">WELCOME</p>

        <h1>Arudh Arjun</h1>

        <p className="dashboard-subtitle">
          Explore, predict, connect.
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