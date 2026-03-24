import { useState, useEffect } from "react";
import { flowers } from "./data/flower";
import type { Flower } from "./data/flower";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import SearchBar from "./Components/Search";
import Filters from "./Components/Filters";
import ProductList from "./Components/ProductList";
import Counter from "./Components/Counter";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [products, setProducts] = useState<Flower[]>([]);
  const [cartIds, setCartIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    try {
      setProducts(flowers);
    } catch (err) {
      setError("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  }, []);

  const filtered: Flower[] = products.filter((flower) => {
    const matchSearch = flower.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      category === "Все" || flower.category === category;
    return matchSearch && matchCategory;
  });

  const addToCart = (id: number) => setCartIds([...cartIds, id]);
  const removeFromCart = (id: number) => setCartIds(cartIds.filter(i => i !== id));

  if (loading) return <p className="counter">Загрузка...</p>;
  if (error) return <p className="counter">Ошибка: {error}</p>;

  return (
    <>
      <Header />
      <Hero />
      <SearchBar search={search} setSearch={setSearch} />
      <Filters setCategory={setCategory} category={category} />
      <Counter count={filtered.length} />
      <ProductList
        products={filtered}
        cartIds={cartIds}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
      />
      <Footer />
    </>
  );
}

export default App;