interface Props {
  setCategory: (value: string) => void;
}

function Filters({ setCategory }: Props) {
  return (
    <div className="filters">
      <button onClick={() => setCategory("Все")}>Все</button>
      <button onClick={() => setCategory("Букеты")}>Букеты</button>
      <button onClick={() => setCategory("Подписка")}>Подписка</button>
    </div>
  );
}
export default Filters;