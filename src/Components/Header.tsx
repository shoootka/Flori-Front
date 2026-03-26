import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1 style={{ cursor: "pointer" }}>
        <Link to="/home">FLORIVÉ</Link>
      </h1>

      <nav>
        <Link to="/catalog">Букеты</Link>
        <Link to="/subscriptions">Подписка</Link>
        <Link to="/favorites">Избранное</Link>
        <Link to="/cart">Корзина</Link>
        <Link to="/about">О нас</Link>
        <Link to="/contacts">Контакты</Link>
      </nav>
    </header>
  );
}

export default Header;