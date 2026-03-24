import type { Flower } from "../data/flower";
import ProductCard from "./Product card1";

interface Props {
  products: Flower[];
  cartIds: number[];
  onAddToCart: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
}

function ProductList({ products, cartIds, onAddToCart, onRemoveFromCart }: Props) {
  if (products.length === 0) {
    return <p className="counter">Ничего не найдено</p>;
  }

  return (
    <div className="grid">
      {products.map((flower) => (
        <ProductCard
          key={flower.id}
          product={flower}
          inCart={cartIds.includes(flower.id)}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      ))}
    </div>
  );
}

export default ProductList;