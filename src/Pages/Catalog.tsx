import { useState, useEffect } from 'react'
import type { Flower } from '../data/flower'
import { flowers } from '../data/flower'
import SearchBar from '../Components/Search'
import Filters from '../Components/Filters'
import ProductList from '../Components/ProductList'
import Counter from '../Components/Counter'

function Catalog() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Все')
  const [products, setProducts] = useState<Flower[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cartIds, setCartIds] = useState<number[]>([])

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


  const addToCart = (id: number) => setCartIds([...cartIds, id])
  const removeFromCart = (id: number) => setCartIds(cartIds.filter(i => i !== id))

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
        cartIds={cartIds}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
      />
    </div>
  )
}

export default Catalog