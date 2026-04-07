import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Catalog from './Pages/Catalog'
import Header from './Components/Header'
import Footer from './Components/Footer'
import './App.css'
import Subscriptions from './Pages/Subscriptions'
import Cart from './Pages/Cart'
import Fav from './Pages/Fav'
import Order from './Pages/Order'
import { CartProvider } from './data/CartContext'

function App() {
  return (
    <CartProvider>
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/favorites" element={<Fav />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App