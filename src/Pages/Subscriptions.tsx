import { flowers } from "../data/flower";

function Subscriptions() {
  const subscriptions = flowers.filter(
    (item) => item.category === "Подписка"
  );

  return (
    <div className="subscriptions-page">
      <h1 className="subscriptions-title">Цветочная подписка</h1>
      <p className="subscriptions-subtitle">
        Получайте свежие букеты регулярно прямо к вашей двери!
      </p>

      <div className="grid">
        {subscriptions.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} />
            <h3>{item.name}</h3>
            <p>{item.price} леев</p>

            <div className="card-buttons">
              <button>Оформить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;