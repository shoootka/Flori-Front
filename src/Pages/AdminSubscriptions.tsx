import { useEffect, useState } from 'react';

const API = 'https://localhost:7161/api';

type SubscriptionPlanDTO = {
  id: number;
  name: string;
  price: number;
  deliveriesCount: number;
  description: string;
};

export default function AdminSubscriptions() {
  const [items, setItems] = useState<SubscriptionPlanDTO[]>([]);
  const [form, setForm] = useState<Omit<SubscriptionPlanDTO, 'id'>>({
    name: '',
    price: 0,
    deliveriesCount: 0,
    description: '',
  });

  const load = async () => {
    const r = await fetch(`${API}/SubscriptionPlan`, { credentials: 'include' }).then(r => r.json());
    setItems(r.data || []);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    await fetch(`${API}/SubscriptionPlan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });
    load();
  };

  const update = async (id: number) => {
    await fetch(`${API}/SubscriptionPlan/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id, ...form }),
    });
    load();
  };

  const remove = async (id: number) => {
    await fetch(`${API}/SubscriptionPlan/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    load();
  };

  return (
    <div>
      <h2>Подписки</h2>

      <input placeholder="Название" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Цена" type="number" value={form.price}
        onChange={e => setForm({ ...form, price: +e.target.value })} />
      <input placeholder="Количество доставок" type="number" value={form.deliveriesCount}
        onChange={e => setForm({ ...form, deliveriesCount: +e.target.value })} />
      <input placeholder="Описание" value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })} />
      <button onClick={create}>Создать</button>

      {items.map(i => (
        <div key={i.id}>
          {i.name} — {i.price}
          <button onClick={() => update(i.id)}>Обновить</button>
          <button onClick={() => remove(i.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}