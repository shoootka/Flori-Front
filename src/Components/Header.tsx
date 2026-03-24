import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="header">
      <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        FlowersSub
      </h1>
      <nav>
        <a onClick={() => navigate('/catalog')}>Каталог</a>
        <a href="#">Избранное</a>
        <a href="#">О нас</a>
      </nav>
    </header>
  )
}

export default Header