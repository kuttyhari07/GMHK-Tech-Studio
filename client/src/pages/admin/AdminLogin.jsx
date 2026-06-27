import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const AdminLogin = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to login. Please make sure the backend server is running on https://gmhk-tech-studio-api.onrender.com"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="glass-card admin-login-card">
        <div className="admin-login-intro">
          <span className="brand-mark">G</span>
          <p className="eyebrow">Admin Login</p>
          <h1>GMHK Control Center</h1>
          <p>Manage works, pricing, reviews, messages, and studio settings from one secure dashboard.</p>
          <div className="login-status-grid">
            <span>JWT Protected</span>
            <span>MongoDB Connected</span>
            <span>Admin Only</span>
          </div>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div>
            <h2>Welcome back</h2>
            <p>Sign in with your admin credentials.</p>
          </div>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
          {error && <p className="form-status error">{error}</p>}
        </form>
      </section>
    </main>
  );
};

export default AdminLogin;
