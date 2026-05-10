import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://localhost:7161/api";

type SubscriptionPlan = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
};

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>([]);
useEffect(() => {
  fetch(`${API}/SubscriptionPlan`)
    .then((r) => r.json())
    .then((data) => setSubscriptions(data?.data ?? []))
    .catch(() => setSubscriptions([]));
}, []);

  const navigate = useNavigate();

  return (
    <div className="subscriptions-page">
      <div className="subscriptions-top">

        <div className="subscriptions-hero">
          <h1 className="subscriptions-title">Цветочная подписка</h1>
        <p>
          Создать уют дома или на рабочем столе совсем не сложно — просто выберите любую подписку, а все остальные заботы мы берём на себя.
        </p>

        <p className="subscriptions-accent">
          Вы выбираете первый букет, а далее: наши флористы создают для вас уникальные композиции, учитывая ваши предпочтения и сезонность цветов.
        </p>

       </div>
      </div>

<div className="section-divider"></div>
      <div className="subscriptions-list">
        {subscriptions.map((item) => (
          <div className="subscription-card" key={item.id}>
            <img
              src={item.image || "https://i.pinimg.com/736x/a2/61/ce/a261cef79589bd5786eb308ba1146826.jpg"}
              alt={item.name}
              className="subscription-image"
            />

            <div className="subscription-content">
              <h3>{item.name}</h3>
              <p className="subscription-description">
               {item.description || item.description}
              </p>
              <p className="subscription-price">{item.price} леев</p>

              <button
                className="subscription-button"
                onClick={() => navigate('/subscription-order', { state: { subscription: item } })}
              >
                Оформить подписку
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;