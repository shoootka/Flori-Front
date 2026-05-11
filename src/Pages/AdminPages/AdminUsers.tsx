import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../data/AuthContext";
import "./AdminPanel.css";

const API = "https://localhost:7161/api";

type UserDTO = {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: string;
};

function AdminUsers() {
  const { user } = useAuth();

  const [users, setUsers] = useState<UserDTO[]>([]);
  const [userForm, setUserForm] = useState<UserDTO>({
    id: 0,
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await fetch(`${API}/User`, {
      credentials: "include",
    });

    const data = await res.json();
    setUsers(data?.data ?? []);
  };

  const saveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = userForm.id ? "PUT" : "POST";
    const url = userForm.id ? `${API}/User/${userForm.id}` : `${API}/User`;

    const body = userForm.id
      ? {
          id: userForm.id,
          username: userForm.username,
          email: userForm.email,
          role: userForm.role,
        }
      : userForm;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.isSuccess) {
      await loadUsers();
      clearForm();
    } else {
      alert(data.message || "Ошибка при сохранении пользователя");
    }
  };

  const editUser = (item: UserDTO) => {
    setUserForm({
      id: item.id,
      username: item.username,
      email: item.email,
      password: "",
      role: item.role,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteUser = async (id: number) => {
    const ok = confirm("Удалить пользователя?");
    if (!ok) return;

    const res = await fetch(`${API}/User/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (data.isSuccess) {
      setUsers(users.filter((u) => u.id !== id));
    } else {
      alert(data.message || "Ошибка при удалении пользователя");
    }
  };

  const clearForm = () => {
    setUserForm({
      id: 0,
      username: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  if (!user) return <Navigate to="/login" />;

  if (user.role.toLowerCase() !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-page">
      <h1>Управление пользователями</h1>

      <section className="admin-section">
        <h2>
          {userForm.id ? "Редактировать пользователя" : "Добавить пользователя"}
        </h2>

        <form className="admin-form" onSubmit={saveUser}>
          <input
            placeholder="Имя пользователя"
            value={userForm.username}
            onChange={(e) =>
              setUserForm({ ...userForm, username: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={userForm.email}
            onChange={(e) =>
              setUserForm({ ...userForm, email: e.target.value })
            }
            required
          />

          {userForm.id === 0 && (
            <input
              type="password"
              placeholder="Пароль"
              value={userForm.password}
              onChange={(e) =>
                setUserForm({ ...userForm, password: e.target.value })
              }
              required
            />
          )}

          <select
            value={userForm.role}
            onChange={(e) =>
              setUserForm({ ...userForm, role: e.target.value })
            }
          >
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
          </select>

          <button type="submit">
            {userForm.id ? "Обновить" : "Добавить"}
          </button>

          {userForm.id !== 0 && (
            <button type="button" onClick={clearForm}>
              Отмена
            </button>
          )}
        </form>
      </section>

      <section className="admin-section">
        <h2>Список пользователей</h2>

        <div className="admin-grid">
          {users.map((item) => (
            <div className="admin-card" key={item.id}>
              <h3>{item.username}</h3>
              <p>{item.email}</p>

              <p>
                <strong>Роль:</strong>{" "}
                {item.role.toLowerCase() === "admin"
                  ? "Администратор"
                  : "Пользователь"}
              </p>

              <div className="admin-buttons">
                <button onClick={() => editUser(item)}>Изменить</button>
                <button onClick={() => deleteUser(item.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminUsers;