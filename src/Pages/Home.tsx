import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="home-hero">
        <img
          src="https://www.pixelstalk.net/wp-content/uploads/images6/Aesthetic-Flower-Backgrounds-HD.jpg"
          alt="Цветы"
          className="home-hero-img"
        />
        <button className="home-hero-btn" onClick={() => navigate('/catalog')}>
          Выбрать букет
        </button>
      </div>

      <div className="home-features">
        <div className="home-feature">
          <p>Бесплатная открытка к каждому букету</p>
        </div>
        <div className="home-feature">
          <p>Быстрая доставка по городу</p>
        </div>
        <div className="home-feature">
          <p>Искренние эмоции в каждом букете</p>
        </div>
      </div>
    </div>
  )
}

export default Home