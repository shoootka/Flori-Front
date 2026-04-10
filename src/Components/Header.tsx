import { Link } from "react-router-dom";
import { useCart } from '../data/CartContext';
import { useAuth } from '../data/AuthContext';

function Header() {
  const { cart, favorites } = useCart();
  const { user } = useAuth();
  const cartCount = cart.reduce((sum: number, item: { qty?: number }) => sum + (item.qty || 1), 0);
  const favCount = favorites.length;
  return (
    <header className="header">
      <h1 style={{ cursor: "pointer" }}>
        <Link to="/">FLORIVÉ</Link>
      </h1>

      <nav>
        <Link to="/catalog">Букеты</Link>
        <Link to="/subscriptions">Подписка</Link>
        <Link to="/favorites" className="cart-link">
          Избранное{favCount > 0 && <span className="cart-badge">{favCount}</span>}
        </Link>
        <Link to="/cart" className="cart-link">
          Корзина{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <Link to="/profile">{user ? user.username : 'Профиль'}</Link>
        <Link to="/about">О нас</Link>
        <Link to="/contacts">Контакты</Link>
      </nav>
    </header>
  );
}

export default Header;