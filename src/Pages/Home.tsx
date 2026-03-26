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

        <div className="home-hero-dark"></div>
        <div className="home-hero-overlay">
          <h1>FLORIVÉ — цветы, которые говорят за вас</h1>
          <p>Свежие букеты с доставкой по Кишинёву в день заказа</p>

          <div className="home-hero-buttons">
            <button onClick={() => navigate('/catalog')}>Смотреть каталог</button>
            <button onClick={() => navigate('/subscriptions')}>Подписка</button>
          </div>
        </div>
      </div>

      <div className="home-features">
        <div className="home-feature">
          <img
            src="https://img.icons8.com/?size=96&id=xdUsDRKVGiTJ&format=png"
            alt="Доставка"
            className="home-feature-icon"
          />
          <div>
            <h3>Бесплатная доставка букетов</h3>
            <p>Адресная, курьерская, экспресс</p>
            <p>По Кишинёву — до 2 часов</p>
            <p>По Молдове — до 4 часов</p>
          </div>
        </div>

        <div className="home-feature">
          <img
            src="https://img.icons8.com/?size=96&id=GWDOH1Tpg2UP&format=png"
            alt="Оплата"
            className="home-feature-icon"
          />
          <div>
            <h3>Оплата за цветочный букет</h3>
            <p>Наличными</p>
            <p>Безналичным переводом</p>
            <p>Visa / Mastercard</p>
          </div>
        </div>

        <div className="home-feature">
          <img
            src="https://img.icons8.com/?size=160&id=6D2SoF1RgZ7v&format=png"
            alt="Фото"
            className="home-feature-icon"
          />
          <div>
            <h3>Фото букета</h3>
            <p>Отправим фото перед доставкой</p>
            <p>И после вручения — бесплатно</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home