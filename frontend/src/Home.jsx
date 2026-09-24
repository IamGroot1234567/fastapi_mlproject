import { useNavigate } from 'react-router-dom'
import './Home.css'
import beachImage from './assets/beach.jpg'

function Home() {
  const navigate = useNavigate()

  return (
    <main
      className="home"
      style={{ backgroundImage: `url(${beachImage})` }}
    >
      <div className="overlay"></div>

      <section className="hero-content">
        <p className="eyebrow">WELCOME TO MY JOURNEY</p>

        <h1>
          Arjun
          <span>(Manjunath)</span>
        </h1>

        <p className="quote">
          "Life is a journey meant to be explored, not a path meant to be
          followed."
        </p>

        <div className="journey-theme">
          Travel • Adventure • Exploration
        </div>

        <p className="intro">
          Come along as I explore new places, experience different cultures,
          and embrace the freedom of a nomadic lifestyle.
        </p>

        <button
          className="enter-button"
          onClick={() => navigate('/login')}
        >
          Enter Application
        </button>
      </section>
    </main>
  )
}

export default Home