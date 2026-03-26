import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Catalog from './Pages/Catalog'
import Header from './Components/Header'
import Footer from './Components/Footer'
import './App.css'
import Subscriptions from './Pages/Subscriptions'

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App