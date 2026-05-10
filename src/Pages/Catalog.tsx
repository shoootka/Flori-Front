import { useState, useEffect } from 'react';
import type { Flower } from '../data/flower';
import SearchBar from '../Components/Search';
import Filters from '../Components/Filters';
import ProductList from '../Components/ProductList';
import { useCart } from '../data/CartContext';

const API = 'https://localhost:7161/api';

function Catalog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');
  const [products, setProducts] = useState<Flower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { cart, setCart } = useCart();

  useEffect(() => {
    fetch(`${API}/Product`)
      .then((r) => {
        if (!r.ok) {
          throw new Error('Ошибка загрузки товаров');
        }
        return r.json();
      })
      .then((data) => {
  console.log(data);//проверочка
  setProducts(data?.data ?? []);
})
      .catch(() => {
        setError('Ошибка загрузки данных');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtered = products.filter((flower) => {
    const matchSearch = flower.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'Все' || flower.category === category;
    const notSubscription = flower.category !== 'Подписка';

    return matchSearch && matchCategory && notSubscription;
  });

  const addToCart = (id: number) => {
    if (cart.some((item: { id: number; qty: number }) => item.id === id)) return;
    setCart([...cart, { id, qty: 1 }]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item: { id: number; qty: number }) => item.id !== id));
  };

  if (loading) return <p>Загрузка...</p>;

  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="catalog-page">
      <div className="catalog-title">
      <h2>Наш каталог</h2></div>
  
      <SearchBar search={search} setSearch={setSearch} />

      <Filters category={category} setCategory={setCategory} />

      <ProductList
        products={filtered}
        cartIds={cart.map((item: { id: number }) => item.id)}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
      />
    </div>
  );
}

export default Catalog;