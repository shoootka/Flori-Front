import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../data/AuthContext";
import "./AdminPanel.css";


const API = "https://localhost:7161/api";

type ProductDTO = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

type SubscriptionPlanDTO = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
};

function AdminCatalog() {
  const { user } = useAuth();

  const productFormRef = useRef<HTMLFormElement | null>(null);
  const planFormRef = useRef<HTMLFormElement | null>(null); 

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlanDTO[]>([]);

  const [productForm, setProductForm] = useState({
    id: 0,
    name: "",
    price: 0,
    category: "",
    image: "",
  });

  const [planForm, setPlanForm] = useState({
    id: 0,
    name: "",
    price: 0,
    description: "",
    image: "",
  });

  useEffect(() => {
    loadProducts();
    loadPlans();
  }, []);

  const loadProducts = async () => {
    const res = await fetch(`${API}/Product`);
    const data = await res.json();

    setProducts(data?.data ?? []);
  };

  const loadPlans = async () => {
    const res = await fetch(`${API}/SubscriptionPlan`);
    const data = await res.json();

    setPlans(data?.data ?? []);
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = productForm.id ? "PUT" : "POST";

    const url = productForm.id
      ? `${API}/Product/${productForm.id}`
      : `${API}/Product`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(productForm),
    });

    const data = await res.json();

    if (data.isSuccess) {
      await loadProducts();

      setProductForm({
        id: 0,
        name: "",
        price: 0,
        category: "",
        image: "",
      });
    }
  };

  const savePlan = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = planForm.id ? "PUT" : "POST";

    const url = planForm.id
      ? `${API}/SubscriptionPlan/${planForm.id}`
      : `${API}/SubscriptionPlan`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(planForm),
    });

    const data = await res.json();

    if (data.isSuccess) {
      await loadPlans();

      setPlanForm({
        id: 0,
        name: "",
        price: 0,
        description: "",
        image: "",
      });
    }
  };

  const deleteProduct = async (id: number) => {
    const res = await fetch(`${API}/Product/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (data.isSuccess) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const deletePlan = async (id: number) => {
    const res = await fetch(`${API}/SubscriptionPlan/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (data.isSuccess) {
      setPlans(plans.filter((p) => p.id !== id));
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role.toLowerCase() !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-page">
      <h1>Управление каталогом</h1>

      {/* PRODUCTS */}

      <section className="admin-section">
        <h2>Товары</h2>

        <form ref={productFormRef} className="admin-form" onSubmit={saveProduct}>
          <input
            placeholder="Название"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Цена"
            value={productForm.price}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                price: Number(e.target.value),
              })
            }
            required
          />

          <input
            placeholder="Категория"
            value={productForm.category}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                category: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="Ссылка на картинку"
            value={productForm.image}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                image: e.target.value,
              })
            }
            required
          />

          <button type="submit">
            {productForm.id ? "Обновить товар" : "Добавить товар"}
          </button>
        </form>

        <div className="admin-grid">
          {products.map((product) => (
            <div className="admin-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p>{product.price} леев</p>

              <p>{product.category}</p>

              <div className="admin-buttons">
                <button
                  onClick={() => {
                    setProductForm(product);
                    productFormRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                >
                  Изменить
                </button>

                <button
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSCRIPTIONS */}

      <section className="admin-section">
        <h2>Подписки</h2>

        <form ref={planFormRef} className="admin-form" onSubmit={savePlan}>
          <input
            placeholder="Название"
            value={planForm.name}
            onChange={(e) =>
              setPlanForm({
                ...planForm,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Цена"
            value={planForm.price}
            onChange={(e) =>
              setPlanForm({
                ...planForm,
                price: Number(e.target.value),
              })
            }
            required
          />

          <input
            placeholder="Описание"
            value={planForm.description}
            onChange={(e) =>
              setPlanForm({
                ...planForm,
                description: e.target.value,
              })
            }
          />

          <input
            placeholder="Ссылка на картинку"
            value={planForm.image}
            onChange={(e) =>
              setPlanForm({
                ...planForm,
                image: e.target.value,
              })
            }
            required
          />

          <button type="submit">
            {planForm.id
              ? "Обновить подписку"
              : "Добавить подписку"}
          </button>
        </form>

        <div className="admin-grid">
          {plans.map((plan) => (
            <div className="admin-card" key={plan.id}>
              <img src={plan.image} alt={plan.name} />

              <h3>{plan.name}</h3>

              <p>{plan.price} леев</p>

              <p>{plan.description}</p>

              <div className="admin-buttons">
                <button
                  onClick={() => {
                    setPlanForm({
                      id: plan.id,
                      name: plan.name,
                      price: plan.price,
                      description: plan.description ?? "",
                      image: plan.image,
                    });

                    planFormRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                >
                  Изменить
                </button>

                <button
                  onClick={() =>
                    deletePlan(plan.id)
                  }
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminCatalog;