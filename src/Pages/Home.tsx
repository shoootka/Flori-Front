import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="home-hero">
        <img
          src="https://vastphotos.com/files/uploads/photos/11665/photo-of-flowers-with-pink-background-l.jpg?v=20240917122123"
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
          <p>Быстрая доставка по городу, за 1 час</p>
        </div>
        <div className="home-feature">
          <p>100% свежие цветы или заменим букет</p>
        </div>
        <div className="home-feature">
          <p>Культурные курьеры, сервис до самой двери</p>
        </div>
      </div>
    </div>
  )
}

export default Home