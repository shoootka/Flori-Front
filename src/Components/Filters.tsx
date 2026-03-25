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
        onClick={() => setCategory("Сборные букеты")}
        style={{ background: category === "Сборные букеты" ? activeColor : inactiveColor }}
      >
        Сборные букеты
      </button>

      <button
        onClick={() => setCategory("Монобукеты")}
        style={{ background: category === "Монобукеты" ? activeColor : inactiveColor }}
      >
        Монобукеты
      </button>
      
    </div>
  );
}

export default Filters;