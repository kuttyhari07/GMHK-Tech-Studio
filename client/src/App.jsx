import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageMessages from "./pages/admin/ManageMessages.jsx";
import ManagePortfolio from "./pages/admin/ManagePortfolio.jsx";
import ManagePricing from "./pages/admin/ManagePricing.jsx";
import ManageSettings from "./pages/admin/ManageSettings.jsx";
import ManageTestimonials from "./pages/admin/ManageTestimonials.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="works" element={<ManagePortfolio />} />
      <Route path="portfolio" element={<Navigate to="/admin/works" replace />} />
      <Route path="pricing" element={<ManagePricing />} />
      <Route path="testimonials" element={<ManageTestimonials />} />
      <Route path="messages" element={<ManageMessages />} />
      <Route path="settings" element={<ManageSettings />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
