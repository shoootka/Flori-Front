import { useEffect, useState } from 'react'
import type { Flower } from '../data/flower'
import { flowers } from '../data/flower'
import ProductList from '../Components/ProductList'
import Counter from '../Components/Counter'
import { useCart } from '../data/CartContext'

function Fav() {
  const [products, setProducts] = useState<Flower[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { cart, setCart, favorites } = useCart()

  useEffect(() => {
    try {
      setProducts(flowers)
    } catch (err) {
      setError('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }, [])

  // Фильтруем только избранные товары
  const favoriteProducts: Flower[] = products.filter((flower) => 
    favorites.includes(flower.id)
  )

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
      <h2 className="catalog-title">Мои избранные</h2>
      <Counter count={favoriteProducts.length} />
      {favoriteProducts.length === 0 ? (
        <p className="counter">Вы еще не добавили товары в избранное</p>
      ) : (
        <ProductList
          products={favoriteProducts}
          cartIds={cart.map((item: {id: number, qty: number}) => item.id)}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
        />
      )}
    </div>
  )
}

export default Fav
