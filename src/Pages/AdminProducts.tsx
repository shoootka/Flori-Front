import { useEffect, useState } from 'react';

const API = 'https://localhost:7161/api';

type ProductDTO = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function AdminProducts() {
  const [items, setItems] = useState<ProductDTO[]>([]);
  const [form, setForm] = useState<Omit<ProductDTO, 'id'>>({
    name: '',
    price: 0,
    category: '',
    image: '',
  });

  const load = async () => {
    const r = await fetch(`${API}/Product`, { credentials: 'include' }).then(r => r.json());
    setItems(r.data || []);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    await fetch(`${API}/Product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });
    load();
  };

  const update = async (id: number) => {
    await fetch(`${API}/Product/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id, ...form }),
    });
    load();
  };

  const remove = async (id: number) => {
    await fetch(`${API}/Product/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    load();
  };

  return (
    <div>
      <h2>Букеты</h2>

      <input placeholder="Название" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Цена" type="number" value={form.price}
        onChange={e => setForm({ ...form, price: +e.target.value })} />
      <input placeholder="Категория" value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Ссылка на изображение" value={form.image}
        onChange={e => setForm({ ...form, image: e.target.value })} />
      <button onClick={create}>Create</button>

      {items.map(i => (
      <div key={i.id}>
        {i.name}
          <button onClick={() => update(i.id)}>Обновить</button>
          <button onClick={() => remove(i.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}