import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
import "./Profile.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    const ok = await login(formData.email, formData.password);

    if (!ok) {
      setError("Неверный email или пароль");
      setLoading(false);
      return;
    }

    navigate("/profile");
  };

  return (
    <div className="profile-page">
      <h2>Вход</h2>

      <form onSubmit={handleSubmit} className="auth-form">
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
          {loading ? "Подождите..." : "Войти"}
        </button>
      </form>

      <p>
        Нет аккаунта?{" "}
        <Link to="/register" className="switch-btn">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;