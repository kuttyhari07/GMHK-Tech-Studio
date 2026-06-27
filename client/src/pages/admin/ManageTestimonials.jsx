import React, { useEffect, useState } from "react";
import { ConfirmModal, EmptyState, PageHeader, SearchBar, Spinner, Toast } from "../../components/admin/AdminWidgets.jsx";
import { api, imageUrl } from "../../services/api";
import { Input, TextArea } from "./ManagePortfolio.jsx";

const blank = { name: "", email: "", business: "", project: "", rating: 5, message: "", status: "Pending", featured: false };

const ManageTestimonials = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const load = () => {
    setLoading(true);
    api.get(`/api/testimonials?search=${encodeURIComponent(search)}&status=${filter}&limit=50`).then((res) => {
      setItems(res.data.data);
      setLoading(false);
    });
  };
  useEffect(load, [search, filter]);

  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (file) data.append("photo", file);
    await api.put(`/api/testimonials/${editing}`, data);
    setToast("Review updated.");
    reset();
    load();
  };

  const reset = () => { setForm(blank); setEditing(null); setFile(null); setPreview(""); };
  const edit = (item) => { setEditing(item._id); setForm({ name: item.name, email: item.email, business: item.business || "", project: item.project, rating: item.rating, message: item.message, status: item.status, featured: item.featured }); setPreview(imageUrl(item.photo)); };
  const status = async (id, action) => { await api.patch(`/api/testimonials/${id}/${action}`); setToast(`Review ${action}d.`); load(); };
  const remove = async () => { await api.delete(`/api/testimonials/${deleteId}`); setDeleteId(null); setToast("Review deleted."); load(); };

  return (
    <section className="admin-page">
      <PageHeader eyebrow="Testimonials" title="Review moderation" text="Approve, reject, edit, feature, and delete client reviews." />
      <Toast message={toast} />
      <div className="admin-editor-grid">
        <form className="glass-card admin-form" onSubmit={submit}>
          <h2>Edit Review</h2>
          {!editing && <p className="muted">Select a review to edit.</p>}
          <Input label="Client Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
          <Input label="Business Name" value={form.business} onChange={(v) => setForm({ ...form, business: v })} />
          <Input label="Project Name" value={form.project} onChange={(v) => setForm({ ...form, project: v })} required />
          <Input label="Rating" type="number" value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} required />
          <TextArea label="Review" value={form.message} onChange={(v) => setForm({ ...form, message: v })} required />
          <label><span>Status</span><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Pending</option><option>Approved</option><option>Rejected</option></select></label>
          <label className="check-row"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
          <label><span>Client Photo</span><input type="file" accept="image/*" onChange={(e) => { const selected = e.target.files[0]; setFile(selected); setPreview(selected ? URL.createObjectURL(selected) : ""); }} /></label>
          {preview && <img className="image-preview avatar-preview" src={preview} alt="Client preview" />}
          <div className="form-actions"><button className="btn btn-primary" disabled={!editing} type="submit">Update Review</button><button className="btn btn-secondary" type="button" onClick={reset}>Clear</button></div>
        </form>
        <div className="glass-card admin-panel">
          <SearchBar value={search} onChange={setSearch} placeholder="Search reviews..." />
          <label className="admin-filter"><span>Filter</span><select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="">All</option><option>Pending</option><option>Approved</option><option>Rejected</option></select></label>
          {loading ? <Spinner /> : items.length === 0 ? <EmptyState text="No reviews found." /> : (
            <div className="admin-table">{items.map((item) => <div className="admin-table-row" key={item._id}><div><strong>{item.name}</strong><span>{item.project} • {item.status} • {item.rating}/5</span></div><div className="row-actions"><button onClick={() => status(item._id, "approve")}>Approve</button><button onClick={() => status(item._id, "reject")}>Reject</button><button onClick={() => edit(item)}>Edit</button><button onClick={() => setDeleteId(item._id)}>Delete</button></div></div>)}</div>
          )}
        </div>
      </div>
      {deleteId && <ConfirmModal title="Delete review?" text="This review will be removed permanently." onCancel={() => setDeleteId(null)} onConfirm={remove} />}
    </section>
  );
};

export default ManageTestimonials;
