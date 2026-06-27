import React, { useEffect, useState } from "react";
import { ConfirmModal, EmptyState, PageHeader, SearchBar, Spinner, Toast } from "../../components/admin/AdminWidgets.jsx";
import { api } from "../../services/api";
import { Input, TextArea } from "./ManagePortfolio.jsx";

const blank = { name: "", price: "", description: "", features: "", buttonText: "Start Project", popular: false, active: true, sortOrder: 0 };

const ManagePricing = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const load = () => {
    setLoading(true);
    api.get(`/api/pricing?search=${encodeURIComponent(search)}&limit=50`).then((res) => {
      setPlans(res.data.data);
      setLoading(false);
    });
  };
  useEffect(load, [search]);

  const submit = async (event) => {
    event.preventDefault();
    if (editing) {
      await api.put(`/api/pricing/${editing}`, form);
      setToast("Pricing plan updated.");
    } else {
      await api.post("/api/pricing", form);
      setToast("Pricing plan added.");
    }
    reset();
    load();
  };

  const reset = () => { setForm(blank); setEditing(null); };
  const edit = (plan) => {
    setEditing(plan._id);
    setForm({ ...plan, features: (plan.features || []).join("\n") });
  };
  const remove = async () => { await api.delete(`/api/pricing/${deleteId}`); setDeleteId(null); setToast("Pricing plan deleted."); load(); };

  return (
    <section className="admin-page">
      <PageHeader eyebrow="Pricing" title="Manage pricing plans" text="Control homepage pricing dynamically from MongoDB." />
      <Toast message={toast} />
      <div className="admin-editor-grid">
        <form className="glass-card admin-form" onSubmit={submit}>
          <h2>{editing ? "Edit Plan" : "Add Plan"}</h2>
          <Input label="Plan Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Input label="Price" value={form.price} onChange={(v) => setForm({ ...form, price: v })} required />
          <TextArea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />
          <TextArea label="Features (one per line)" value={form.features} onChange={(v) => setForm({ ...form, features: v })} />
          <Input label="Button Text" value={form.buttonText} onChange={(v) => setForm({ ...form, buttonText: v })} />
          <Input label="Sort Order" type="number" value={form.sortOrder} onChange={(v) => setForm({ ...form, sortOrder: v })} />
          <label className="check-row"><input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} /> Popular Badge</label>
          <label className="check-row"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active</label>
          <div className="form-actions"><button className="btn btn-primary" type="submit">{editing ? "Update Plan" : "Add Plan"}</button><button className="btn btn-secondary" type="button" onClick={reset}>Clear</button></div>
        </form>
        <div className="glass-card admin-panel">
          <SearchBar value={search} onChange={setSearch} placeholder="Search pricing..." />
          {loading ? <Spinner /> : plans.length === 0 ? <EmptyState text="No pricing plans found." /> : (
            <div className="admin-table">{plans.map((plan) => <div className="admin-table-row" key={plan._id}><div><strong>{plan.name}</strong><span>{plan.price} • {plan.active ? "Active" : "Inactive"}</span></div><div className="row-actions"><button onClick={() => edit(plan)}>Edit</button><button onClick={() => setDeleteId(plan._id)}>Delete</button></div></div>)}</div>
          )}
        </div>
      </div>
      {deleteId && <ConfirmModal title="Delete pricing plan?" text="This plan will be removed permanently." onCancel={() => setDeleteId(null)} onConfirm={remove} />}
    </section>
  );
};

export default ManagePricing;
