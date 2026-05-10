import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
import "./AdminPanel.css";

const API = "https://localhost:7161/api";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

type SubscriptionPlan = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
};

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

function AdminPanel() {
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [users, setUsers] = useState([]);

  const [productForm, setProductForm] = useState({
    name: "",
    price: 0,
    category: "",
    image: "",
  });

  const [planForm, setPlanForm] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
  });

  useEffect(() => {
    loadProducts();
    loadPlans();
    loadUsers();
  }, []);

  const loadUsers = async () => {
  const res = await fetch(`${API}/User`, {
    credentials: "include",
  });

  const data = await res.json();

  setUsers(data?.data ?? []);
};

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

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${API}/Product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(productForm),
    });

    const data = await res.json();

    if (data.isSuccess) {
      loadProducts();

      setProductForm({
        name: "",
        price: 0,
        category: "",
        image: "",
      });
    }
  };

  const createPlan = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${API}/SubscriptionPlan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(planForm),
    });

    const data = await res.json();

    if (data.isSuccess) {
      loadPlans();

      setPlanForm({
        name: "",
        price: 0,
        description: "",
        image: "",
      });
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
      <h1>Админ панель</h1>

      {/* PRODUCTS */}

      <section className="admin-section">
        <h2>Товары</h2>

        <form
          className="admin-form"
          onSubmit={createProduct}
        >
          <input
            type="text"
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
            type="text"
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
            type="text"
            placeholder="Ссылка на изображение"
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
            Добавить товар
          </button>
        </form>

        <div className="admin-grid">
          {products.map((product) => (
            <div
              className="admin-card"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>{product.price} леев</p>

              <p>{product.category}</p>

              <button
                onClick={() =>
                  deleteProduct(product.id)
                }
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PLANS */}

      <section className="admin-section">
        <h2>Подписки</h2>

        <form
          className="admin-form"
          onSubmit={createPlan}
        >
          <input
            type="text"
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
            type="text"
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
            type="text"
            placeholder="Ссылка на изображение"
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
            Добавить подписку
          </button>
        </form>

        <div className="admin-grid">
          {plans.map((plan) => (
            <div
              className="admin-card"
              key={plan.id}
            >
              <img
                src={plan.image}
                alt={plan.name}
              />

              <h3>{plan.name}</h3>

              <p>{plan.price} леев</p>

              <p>{plan.description}</p>

              <button
                onClick={() =>
                  deletePlan(plan.id)
                }
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* USERS */}

      <section className="admin-section">
        <h2>Пользователи</h2> 
        <div className="admin-grid">
          {users.map((user: User) => (  
            <div
              className="admin-card"
              key={user.id} 
            >
              <h3>{user.username}</h3>
              <p>{user.email}</p> 
              <p>Роль: {user.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminPanel;