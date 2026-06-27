import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { PageHeader, Spinner } from "../../components/admin/AdminWidgets.jsx";

const statLabels = {
  totalWorks: "Total Portfolio Works",
  totalPricing: "Total Pricing Plans",
  totalMessages: "Total Contact Messages",
  pendingTestimonials: "Pending Testimonials",
  approvedTestimonials: "Approved Testimonials",
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/dashboard")
      .then((response) => setData(response.data.data))
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            "Unable to load dashboard. Please make sure the backend server is running."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error || !data) {
    return (
      <section className="admin-page">
        <PageHeader
          eyebrow="Dashboard"
          title="Dashboard unavailable"
          text="The admin panel is loaded, but the dashboard API could not respond."
        />
        <div className="glass-card admin-panel">
          <p className="form-status error">{error || "Dashboard data is missing."}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <PageHeader
        eyebrow="Dashboard"
        title="Studio operations at a glance"
        text="Track site content, enquiries, and review approvals from one dark control room."
      />

      <div className="admin-stat-grid">
        {Object.entries(data.stats).map(([key, value]) => (
          <article className="glass-card admin-stat" key={key}>
            <span>{statLabels[key]}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>

      <div className="admin-two-col">
        <RecentList title="Recent Enquiries" items={data.recentEnquiries} primary="name" secondary="service" />
        <RecentList title="Recent Reviews" items={data.recentReviews} primary="name" secondary="status" />
      </div>
    </section>
  );
};

const RecentList = ({ title, items, primary, secondary }) => (
  <article className="glass-card admin-panel">
    <h2>{title}</h2>
    <div className="admin-list">
      {items.length === 0 && <p className="muted">No records yet.</p>}
      {items.map((item) => (
        <div className="admin-list-row" key={item._id}>
          <strong>{item[primary]}</strong>
          <span>{item[secondary]}</span>
        </div>
      ))}
    </div>
  </article>
);

export default Dashboard;
