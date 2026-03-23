import { useState } from "react";
import { flowers } from "./flower";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import SearchBar from "./Components/Search";
import Filters from "./Components/Filters";
import ProductCard from "./Components/Product card1";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");

  const filtered = flowers.filter((flower) => {
    const matchSearch = flower.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "Все" || flower.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <>
      <Header />
      <Hero />
      <SearchBar search={search} setSearch={setSearch} />
      <Filters setCategory={setCategory} />

      <p className="counter">Найдено: {filtered.length}</p>

      <div className="grid">
        {filtered.map((flower) => (
          <ProductCard key={flower.id} product={flower} />
        ))}
      </div>

      <footer className="footer">
        © 2026 FlowerShop. Все права защищены.
      </footer>
    </>
  );
}

export default App;