import { useNavigate } from 'react-router-dom'
import API_URL from '../services/api'
import './LogoutButton.css'

function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const token = localStorage.getItem('access_token')

    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        console.log('Backend logout failed')
      }
    } catch (error) {
      console.error('Logout request failed:', error)
    } finally {
      localStorage.removeItem('access_token')
      navigate('/login')
    }
  }

  return (
    <button
      className="logout-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}

export default LogoutButton