import { useAuth } from "../data/AuthContext";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-page">
        <h2>Вы не авторизованы</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h2>Личный кабинет</h2>

      <div className="profile-info">
        <p>
          <strong>Имя:</strong> {user.username}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Роль:</strong>{" "}
          {user.role.toLowerCase() === "admin"
            ? "Администратор"
            : "Пользователь"}
        </p>
      </div>

    {user.role.toLowerCase() === "admin" && (
      <button
        className="admin-btn"
        onClick={() => navigate("/admin")}
      >
       Админ панель
      </button>
    )}

      <button onClick={logout} className="logout-btn">
        Выйти
      </button>
    </div>
  );
}

export default Profile;