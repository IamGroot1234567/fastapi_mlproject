import HomeButton from '../components/HomeButton'
import LogoutButton from '../components/LogoutButton'
import DashboardButton from '../components/DashboardButton'
import './Travel.css'

function Travel() {
  return (
    <main className="travel-page">
      <HomeButton />
      <DashboardButton />
      <LogoutButton />

      <div className="travel-card">
        <p className="travel-eyebrow">TRAVEL WITH ME</p>

        <h1>Let's Explore 🌴</h1>

        <p className="travel-text">
          I love travelling, exploring new places, and meeting new people.
          <br />
          If you're someone who enjoys adventures, let's connect.
          <br />
          Maybe our next journey could be together.
        </p>

        <div className="travel-contact">
          <a
            href="https://instagram.com/iam_arudh"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram: @iam_arudh
          </a>

          <a href="tel:8074215012">
            Phone: 8074215012
          </a>
        </div>
      </div>
    </main>
  )
}

export default Travel