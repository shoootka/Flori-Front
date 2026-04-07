import { useCart } from "../data/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

function ProductCard({ product, inCart, onAddToCart, onRemoveFromCart }: {
  product: Product;
  inCart: boolean;
  onAddToCart: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
}) {
  const { favorites, setFavorites } = useCart();
  const isLiked = favorites.includes(product.id);

  const toggleLike = () => {
    if (isLiked) {
      setFavorites(favorites.filter(id => id !== product.id));
    } else {
      setFavorites([...favorites, product.id]);
    }
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} MDL</p>
      <div className="card-buttons">
        <button onClick={toggleLike}>
          {isLiked ? "♥ Избранное" : "♡ В избранное"}
        </button>
        <button onClick={() => {
          if (!inCart) onAddToCart(product.id);
          else onRemoveFromCart(product.id);
        }}>
          {inCart ? "✓ Добавлено" : "В корзину"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;