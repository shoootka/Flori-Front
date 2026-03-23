interface Props {
  search: string;
  setSearch: (value: string) => void;
}

function SearchBar({ search, setSearch }: Props) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Поиск..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
export default SearchBar;