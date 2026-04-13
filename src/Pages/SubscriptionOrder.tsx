import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { flowers } from "../data/flower";
import "./SubscriptionOrder.css";

function SubscriptionOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const subscription = location.state?.subscription;

  const bouquetOptions = flowers.filter(
    (item) => item.category !== "Подписка"
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    frequency: "weekly",
    firstDeliveryDate: "",
    bouquetId: bouquetOptions[0]?.id || 0,
    comment: ""
  });

  const [success, setSuccess] = useState(false);

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
      [name]: name === "bouquetId" ? Number(value) : value
    }));
  };

  const selectedBouquet = bouquetOptions.find(
    (item) => item.id === formData.bouquetId
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="subscription-order-page">
        <h2>Подписка оформлена!</h2>
        <p>Спасибо за оформление подписки. Мы свяжемся с вами для подтверждения.</p>
        <button onClick={() => navigate("/")}>На главную</button>
        <button onClick={() => navigate("/subscriptions")}>К подпискам</button>
      </div>
    );
  }

  return (
    <div className="subscription-order-page">
      <h2>Оформление подписки</h2>

      <div className="subscription-order-layout">
        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="subscription-order-summary">
          <img
            src={selectedBouquet?.image || subscription.image}
            alt={selectedBouquet?.name || subscription.name}
            className="subscription-order-img"
          />

          <h3>{subscription.name}</h3>
          <p className="subscription-order-price">{subscription.price} леев</p>

          <div className="selected-bouquet-preview">
            <p><strong>Первый букет:</strong></p>
            <p>{selectedBouquet?.name}</p>
          </div>

          <p>
            <strong>Доставка:</strong>{" "}
            {formData.frequency === "weekly"
              ? "раз в неделю"
              : formData.frequency === "biweekly"
              ? "раз в две недели"
              : "раз в месяц"}
          </p>

          <p className="subscription-order-note">
            Все следующие композиции подбираются флористом с учётом ваших предпочтений и сезонности цветов.
          </p>
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <form className="subscription-order-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Букет для первой доставки *</label>
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
          </div>

          <div className="form-group">
            <label>Частота доставки *</label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
            >
              <option value="weekly">Раз в неделю</option>
              <option value="biweekly">Раз в две недели</option>
              <option value="monthly">Раз в месяц</option>
            </select>
          </div>

          <div className="form-group">
            <label>Дата первой доставки *</label>
            <input
              type="date"
              name="firstDeliveryDate"
              value={formData.firstDeliveryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Имя *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Телефон *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Адрес доставки *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Комментарий</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={3}
            />
          </div>

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