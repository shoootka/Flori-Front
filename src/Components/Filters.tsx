interface Props {
  setCategory: (value: string) => void;
  category: string;
}

function Filters({ setCategory, category }: Props) {
  return (
    <div className="filters">
      <button
        onClick={() => setCategory("Все")}
        style={{ background: category === "Все" ? "#ff4d8d" : "#ff80aa" }}
      >
        Все
      </button>
      <button
        onClick={() => setCategory("Букеты")}
        style={{ background: category === "Букеты" ? "#ff4d8d" : "#ff80aa" }}
      >
        Букеты
      </button>
      <button
        onClick={() => setCategory("Подписка")}
        style={{ background: category === "Подписка" ? "#ff4d8d" : "#ff80aa" }}
      >
        Подписка
      </button>
    </div>
  );
}

export default Filters;