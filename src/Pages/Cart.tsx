
import { flowers } from '../data/flower';
import { useCart } from '../data/CartContext';

function Cart() {
  const { cart, setCart } = useCart();

  const changeQty = (id: number, delta: number) => {
    setCart(
      cart.map((item: {id: number, qty: number}) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
    );
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item: {id: number, qty: number}) => item.id !== id));
  };

  const cartProducts = cart.map((item: {id: number, qty: number}) => {
    const product = flowers.find(f => f.id === item.id);
    return product ? { ...product, qty: item.qty } : null;
  }).filter(Boolean) as (typeof flowers[0] & {qty: number})[];

  const total = cartProducts.reduce((sum: number, p) => sum + p.price * p.qty, 0);

  return (
    <div className="cart-page">
      <h2>Корзина</h2>
      {cartProducts.length === 0 ? (
        <div className="cart-empty">Ваша корзина пуста.</div>
      ) : (
        <>
          <ul className="cart-list">
            {cartProducts.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{item.price} MDL</div>
                  <div className="cart-item-qty">
                    <button onClick={() => changeQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)}>+</button>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeItem(item.id)}>Удалить</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">Итого: <b>{total} MDL</b></div>
          <button className="cart-checkout">Оформить заказ</button>
        </>
      )}
    </div>
  );
}

export default Cart;
