import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { flowers } from '../data/flower';
import { useCart } from '../data/CartContext';

function Order() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartProducts = cart.map((item: {id: number, qty: number}) => {
    const product = flowers.find(f => f.id === item.id);
    return product ? { ...product, qty: item.qty } : null;
  }).filter(Boolean) as (typeof flowers[0] & {qty: number})[];

  const total = cartProducts.reduce((sum: number, p) => sum + p.price * p.qty, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки заказа на сервер
    console.log('Заказ оформлен:', { products: cartProducts, total, ...formData });
    setOrderPlaced(true);
    setCart([]); // Очищаем корзину после оформления
  };

  if (cartProducts.length === 0 && !orderPlaced) {
    return (
      <div className="order-page">
        <h2>Оформление заказа</h2>
        <div className="order-success">
          <p>Ваша корзина пуста. Добавьте товары перед оформлением заказа.</p>
          <button onClick={() => navigate('/catalog')}>Перейти в каталог</button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="order-page">
        <div className="order-success">
          <h2>Заказ оформлен!</h2>
          <p>Спасибо за заказ! Мы свяжемся с вами в ближайшее время для подтверждения.</p>
          <button onClick={() => navigate('/')}>Вернуться на главную</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h2>Оформление заказа</h2>

      <div className="order-summary">
        <h3>Ваш заказ:</h3>
        <ul className="order-items">
          {cartProducts.map(item => (
            <li key={item.id} className="order-item">
              <img src={item.image} alt={item.name} className="order-item-img" />
              <div className="order-item-info">
                <div className="order-item-name">{item.name}</div>
                <div className="order-item-details">
                  {item.price} MDL × {item.qty} = {item.price * item.qty} MDL
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="order-total">Итого: <b>{total} MDL</b></div>
      </div>

      <form onSubmit={handleSubmit} className="order-form">
        <h3>Контактные данные:</h3>

        <div className="form-group">
          <label htmlFor="name">Имя *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Телефон *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Адрес доставки *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Комментарий к заказу</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <button type="submit" className="order-submit">Подтвердить заказ</button>
      </form>
    </div>
  );
}

export default Order;
