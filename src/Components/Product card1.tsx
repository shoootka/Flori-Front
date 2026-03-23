interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} €</p>
      <button>В корзину</button>
    </div>
  );
}
<div className="card" style={{ animation: "fadeIn 0.6s ease" }}></div>
export default ProductCard;