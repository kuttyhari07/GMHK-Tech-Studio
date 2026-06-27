import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const adminLinks = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Works", to: "/admin/works" },
  { label: "Pricing", to: "/admin/pricing" },
  { label: "Testimonials", to: "/admin/testimonials" },
  { label: "Messages", to: "/admin/messages" },
  { label: "Settings", to: "/admin/settings" },
];

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell">
      <aside className={open ? "admin-sidebar open" : "admin-sidebar"}>
        <div className="admin-brand">
          <span className="brand-mark">G</span>
          <div>
            <strong>GMHK Admin</strong>
            <small>{admin?.email}</small>
          </div>
        </div>
        <nav>
          {adminLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button className="admin-logout" type="button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="nav-toggle" type="button" aria-label="Toggle admin menu" onClick={() => setOpen((value) => !value)}>
            <span />
            <span />
            <span />
          </button>
          <div>
            <strong>GMHK Tech Studio</strong>
            <small>Admin Control Center</small>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
