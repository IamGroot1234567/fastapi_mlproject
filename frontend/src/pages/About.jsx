import HomeButton from '../components/HomeButton'
import LogoutButton from '../components/LogoutButton'
import DashboardButton from '../components/DashboardButton'
import './About.css'

function About() {
  return (
    <main className="about-page">
      <HomeButton />
      <DashboardButton />
      <LogoutButton />

      <div className="about-card">
        <p className="about-eyebrow">ABOUT ME</p>

        <h1>Arudh Arjun</h1>

        <p className="about-quote">
          "Why so serious? Life is meant to be explored."
        </p>

        <p className="about-text">
          I have worked across Data Analytics, Machine Learning, and Python Backend development.
          <br />
          Now I'm diving deeper into Deep Learning and heading further into the world of AI.
          <br />
          Outside technology, I'm a travel freak who loves exploring places and collecting experiences.
        </p>
      </div>
    </main>
  )
}

export default About