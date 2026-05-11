import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../data/AuthContext";
import "./AdminPanel.css";

function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role.toLowerCase() !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-page">
      <h1>Админ панель</h1>

      <div className="admin-menu">

        <div
          className="admin-menu-card"
          onClick={() => navigate("/admin/catalog")}
        >
          <h2>Товары и подписки</h2>

          <p>
            Добавление, редактирование и удаление
            товаров и подписок.
          </p>
        </div>

        <div
          className="admin-menu-card"
          onClick={() => navigate("/admin/users")}
        >
          <h2>Пользователи</h2>

          <p>
            Просмотр зарегистрированных
            пользователей и ролей.
          </p>
        </div>

        <div
          className="admin-menu-card"
          onClick={() => navigate("/admin/orders")}
        >
          <h2>Заказы</h2>

          <p>
            Управление заказами букетов
            и подписок.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminPanel;