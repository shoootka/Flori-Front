import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SubscriptionOrder.css";
import { useAuth } from "../data/AuthContext";

const API = "https://localhost:7161/api";

type Flower = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

function SubscriptionOrder() {

  const { user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const subscription = location.state?.subscription;

  const [bouquetOptions, setBouquetOptions] = useState<Flower[]>([]);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    frequency: "weekly",
    firstDeliveryDate: "",
    bouquetId: 0,
    comment: "",
  });

  useEffect(() => {
    fetch(`${API}/Product`)
      .then((r) => r.json())
      .then((data) => {
        const products = data?.data ?? [];
        const bouquets = products.filter(
          (item: Flower) => item.category !== "Подписка"
        );

        setBouquetOptions(bouquets);

        if (bouquets.length > 0) {
          setFormData((prev) => ({
            ...prev,
            bouquetId: bouquets[0].id,
          }));
        }
      })
      .catch(() => {
        setBouquetOptions([]);
      });
  }, []);

  if (!subscription && !success) {
    return (
      <div className="subscription-order-page">
        <h2>Подписка не выбрана</h2>
        <button onClick={() => navigate("/subscriptions")}>
          К списку подписок
        </button>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "bouquetId" ? Number(value) : value,
    }));
  };

  const selectedBouquet = bouquetOptions.find(
    (item) => item.id === formData.bouquetId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Пожалуйста, войдите в аккаунт перед оформлением подписки");
      return;
    }

    const order = {
      userId: user?.id,
      subscriptionPlanId: subscription.id,
      firstFlowerId: formData.bouquetId,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      frequency: formData.frequency,
      firstDeliveryDate: formData.firstDeliveryDate,
      comment: formData.comment,
      status: "New",
    };

    const res = await fetch(`${API}/SubscriptionOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(order),
    });

    const data = await res.json();

    if (data.isSuccess) {
      setSuccess(true);
    } else {
      alert(data.message || "Ошибка при оформлении подписки");
    }
  };

  if (success) {
    return (
      <div className="subscription-order-page success-page">
        <h2>Подписка оформлена!</h2>
        <p>Спасибо за оформление подписки. Мы свяжемся с вами для подтверждения.</p>

        <div className="success-buttons">
          <button onClick={() => navigate("/")}>На главную</button>
          <button onClick={() => navigate("/subscriptions")}>К подпискам</button>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-order-page">
      <h2>Оформление подписки</h2>

      <div className="subscription-order-layout">
        <div className="subscription-order-summary">
          <h3>{subscription.name}</h3>
          <p className="subscription-price">{subscription.price} леев</p>

          <p>
            <strong>Первый букет:</strong>
          </p>
          <p>{selectedBouquet?.name || "Букет не выбран"}</p>

          <p>
            <strong>Доставка:</strong>{" "}
            {formData.frequency === "weekly"
              ? "раз в неделю"
              : formData.frequency === "biweekly"
              ? "раз в две недели"
              : "раз в месяц"}
          </p>

          <p>
            Все следующие композиции подбираются флористом с учётом ваших
            предпочтений и сезонности цветов.
          </p>
        </div>

        <form className="subscription-order-form" onSubmit={handleSubmit}>
          <label className="form-group">
            Букет для первой доставки *
            <select
              name="bouquetId"
              value={formData.bouquetId}
              onChange={handleChange}
              required
            >
              {bouquetOptions.map((flower) => (
                <option key={flower.id} value={flower.id}>
                  {flower.name} — {flower.price} леев
                </option>
              ))}
            </select>
          </label>

          <label className="form-group">
            Частота доставки *
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              required
            >
              <option value="weekly">Раз в неделю</option>
              <option value="biweekly">Раз в две недели</option>
              <option value="monthly">Раз в месяц</option>
            </select>
          </label>

          <label className="form-group">
            Дата первой доставки *
            <input
              type="date"
              name="firstDeliveryDate"
              value={formData.firstDeliveryDate}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-group">
            Имя *
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-group">
            Телефон *
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-group">
            Email *
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-group">
            Адрес доставки *
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-group">
            Комментарий
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="order-submit">
            Подтвердить подписку
          </button>

          <p className="order-note">
            После оформления мы свяжемся с вами для подтверждения деталей.
          </p>
        </form>
      </div>
    </div>
  );
}

export default SubscriptionOrder;