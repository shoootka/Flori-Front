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
import { CartProvider } from './data/CartContext'
import { AuthProvider } from './data/AuthContext'
import AdminGuard from './Components/AdminGuard'
import AdminProducts from './Pages/AdminPages/AdminCatalog'
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import AdminPanel from "./Pages/AdminPages/AdminPanel";
import AdminUsers from "./Pages/AdminPages/AdminUsers";

function App() {
  return (
    <AuthProvider>
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription-order" element={<SubscriptionOrder />} />
            <Route path="/admin/catalog" element={<AdminGuard><AdminProducts /></AdminGuard>} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App