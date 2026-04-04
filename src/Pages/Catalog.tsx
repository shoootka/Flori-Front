import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import type { Flower } from '../data/flower'
import { flowers } from '../data/flower'
import SearchBar from '../Components/Search'
import Filters from '../Components/Filters'
import ProductList from '../Components/ProductList'
import Counter from '../Components/Counter'
import { useCart } from '../data/CartContext'

function Catalog() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Все')
  const [products, setProducts] = useState<Flower[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { cart, setCart } = useCart();
  // const navigate = useNavigate();

  useEffect(() => {
    try {
      setProducts(flowers)
    } catch (err) {
      setError('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }, [])

  /*тут фильтры и на поиск+категорию и исключение подписок из каталога (тк все вместе в flower.ts) */
  const filtered: Flower[] = products.filter((flower) => {
  const matchSearch = flower.name.toLowerCase().includes(search.toLowerCase())
  const matchCategory = category === 'Все' || flower.category === category
  const notSubscription = flower.category !== "Подписка"

  return matchSearch && matchCategory && notSubscription
})


  const addToCart = (id: number) => {
    if (cart.some((item: {id: number, qty: number}) => item.id === id)) return;
    setCart([...cart, { id, qty: 1 }]);
  }
  const removeFromCart = (id: number) => {
    setCart(cart.filter((item: {id: number, qty: number}) => item.id !== id));
  }

  if (loading) return <p className="counter">Загрузка...</p>
  if (error) return <p className="counter">Ошибка: {error}</p>

  return (
    <div className="catalog-page">
      <h2 className="catalog-title">Наш каталог</h2>
      <SearchBar search={search} setSearch={setSearch} />
      <Filters setCategory={setCategory} category={category} />
      <Counter count={filtered.length} />
      <ProductList
        products={filtered}
        cartIds={cart.map((item: {id: number, qty: number}) => item.id)}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
      />
    </div>
  )
}

export default Catalog