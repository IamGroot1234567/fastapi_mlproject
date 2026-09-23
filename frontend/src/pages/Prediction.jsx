import API_URL from '../services/api'
import { useState } from 'react'
import DashboardButton from '../components/DashboardButton'
import HomeButton from '../components/HomeButton'
import LogoutButton from '../components/LogoutButton'
import './Prediction.css'

function Prediction() {
  const [formData, setFormData] = useState({
    company: '',
    year: '',
    owner: '',
    fuel: '',
    seller_type: '',
    transmission: '',
    km_driven: '',
    mileage_mpg: '',
    engine_cc: '',
    max_power_bhp: '',
    torque_nm: '',
    seats: '',
  })

  const [prediction, setPrediction] = useState(null)
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    const numericFields = [
      'year',
      'km_driven',
      'mileage_mpg',
      'engine_cc',
      'max_power_bhp',
      'torque_nm',
      'seats',
    ]

    setFormData({
      ...formData,
      [name]: numericFields.includes(name)
        ? Number(value)
        : value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage('')
    setPrediction(null)

    const token = localStorage.getItem('access_token')

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setPrediction(data.predicted_price)
      } else {
        setMessage(data.detail || 'Prediction failed')
      }
    } catch (error) {
      console.error('Prediction failed:', error)
      setMessage('Unable to connect to the server.')
    }
  }

  return (
    <main className="prediction-page">
      <HomeButton />
      <DashboardButton />
      <LogoutButton />

      <div className="prediction-card">

        <p className="prediction-eyebrow">
          CAR PRICE PREDICTION
        </p>

        <h1>Predict Car Price</h1>

        <p className="prediction-subtitle">
          Enter the details of the car.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              name="company"
              placeholder="e.g. Toyota"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              name="year"
              placeholder="e.g. 2018"
              value={formData.year}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Owner</label>
            <input
              type="text"
              name="owner"
              placeholder="e.g. First Owner"
              value={formData.owner}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Fuel</label>
            <input
              type="text"
              name="fuel"
              placeholder="e.g. Petrol"
              value={formData.fuel}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Seller Type</label>
            <input
              type="text"
              name="seller_type"
              placeholder="e.g. Individual"
              value={formData.seller_type}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Transmission</label>
            <input
              type="text"
              name="transmission"
              placeholder="e.g. Manual"
              value={formData.transmission}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>KM Driven</label>
            <input
              type="number"
              name="km_driven"
              placeholder="e.g. 50000"
              value={formData.km_driven}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mileage (MPG)</label>
            <input
              type="number"
              step="any"
              name="mileage_mpg"
              placeholder="e.g. 45"
              value={formData.mileage_mpg}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Engine (CC)</label>
            <input
              type="number"
              step="any"
              name="engine_cc"
              placeholder="e.g. 1200"
              value={formData.engine_cc}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Max Power (BHP)</label>
            <input
              type="number"
              step="any"
              name="max_power_bhp"
              placeholder="e.g. 85"
              value={formData.max_power_bhp}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Torque (NM)</label>
            <input
              type="number"
              step="any"
              name="torque_nm"
              placeholder="e.g. 113"
              value={formData.torque_nm}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Seats</label>
            <input
              type="number"
              step="any"
              name="seats"
              placeholder="e.g. 5"
              value={formData.seats}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="prediction-button"
          >
            Predict Price
          </button>

          {message && (
            <p className="prediction-message">
              {message}
            </p>
          )}

          {prediction !== null && (
            <div className="prediction-result">
              <p>Estimated Car Price</p>

              <h2>
                ₹ {prediction.toLocaleString('en-IN')}
              </h2>
            </div>
          )}

        </form>

      </div>
    </main>
  )
}

export default Prediction
