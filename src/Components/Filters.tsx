interface Props {
  setCategory: (value: string) => void;
  category: string;
}

function Filters({ setCategory, category }: Props) {
  const activeColor = "#fd5d82";
  const inactiveColor = "#ff7a99";

  return (
    <div className="filters">
      <button
        onClick={() => setCategory("Все")}
        style={{ background: category === "Все" ? activeColor : inactiveColor }}
      >
        Все
      </button>
      <button
        onClick={() => setCategory("Букеты")}
        style={{ background: category === "Букеты" ? activeColor : inactiveColor }}
      >
        Букеты
      </button>
      <button
        onClick={() => setCategory("Подписка")}
        style={{ background: category === "Подписка" ? activeColor : inactiveColor }}
      >
        Подписка
      </button>
    </div>
  );
}

export default Filters;