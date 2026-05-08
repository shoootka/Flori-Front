import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SubscriptionOrder from './Pages/SubscriptionOrder'
import Catalog from './Pages/Catalog'
import Header from './Components/Header'
import Footer from './Components/Footer'
import './App.css'
import Subscriptions from './Pages/Subscriptions'
import Cart from './Pages/Cart'
import Fav from './Pages/Fav'
import Order from './Pages/Order'
import Profile from './Pages/Profile'
import AdminGuard from './Components/AdminGuard'
import AdminProducts from './Pages/AdminProducts'
import AdminSubscriptions from './Pages/AdminSubscriptions';

function App() {
  return (
        <div className="app-wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/favorites" element={<Fav />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription-order" element={<SubscriptionOrder />} />
            <Route path="/admin/products" element={<AdminGuard><AdminProducts /></AdminGuard>} />
            <Route path="/admin/subscriptions" element={<AdminGuard><AdminSubscriptions /></AdminGuard>} />
          </Routes>
          <Footer />
        </div>
  )
}

export default App