import { flowers } from "../data/flower";

function Subscriptions() {
  const subscriptions = flowers.filter((item) => item.category === "Подписка");

  return (
    <div className="subscriptions-page">
      <div className="subscriptions-top">
        <h1 className="subscriptions-title">Цветочная подписка</h1>

        <div className="subscriptions-text">
        <p>
          Еженедельная доставка свежих букетов для дома, офиса или в подарок.
        </p>

        <p>
          Создать уют дома или на рабочем столе совсем не сложно — просто выберите любую подписку, а все остальные заботы мы берём на себя.
        </p>

        <p className="subscriptions-accent">
          А ещё подписка — это отличный подарок!
        </p>
       </div>
      </div>

      <div className="subscriptions-list">
        {subscriptions.map((item) => (
          <div className="subscription-card" key={item.id}>
            <img src={item.image} alt={item.name} className="subscription-image" />

            <div className="subscription-content">
              <h3>{item.name}</h3>
              <p className="subscription-description">
                Регулярная доставка свежих сезонных букетов с заботой и вниманием к деталям.
              </p>
              <p className="subscription-price">{item.price} леев</p>

              <button className="subscription-button">
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