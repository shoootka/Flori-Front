import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
import "./Profile.css";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const ok = await register(
      formData.username,
      formData.email,
      formData.password,
      "user"
    );

    if (!ok) {
      setError("Пользователь уже существует");
      setLoading(false);
      return;
    }

    navigate("/profile");
  };

  return (
    <div className="profile-page">
      <h2>Регистрация</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Имя пользователя"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Подождите..." : "Зарегистрироваться"}
        </button>
      </form>

      <p>
        Уже есть аккаунт?{" "}
        <Link to="/login" className="switch-btn">
          Вход
        </Link>
      </p>
    </div>
  );
}

export default Register;