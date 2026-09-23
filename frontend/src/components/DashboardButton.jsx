import { useNavigate } from 'react-router-dom'
import './DashboardButton.css'

function DashboardButton() {
  const navigate = useNavigate()

  return (
    <button
      className="dashboard-button"
      onClick={() => navigate('/dashboard')}
    >
      ← Dashboard
    </button>
  )
}

export default DashboardButton
