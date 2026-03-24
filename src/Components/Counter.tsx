interface Props {
  count: number;
}

function Counter({ count }: Props) {
  return (
    <p className="counter">Найдено: {count}</p>
  );
}

export default Counter;