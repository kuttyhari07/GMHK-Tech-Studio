import React, { useEffect, useState } from "react";
import { api, imageUrl } from "../../services/api";
import { ConfirmModal, EmptyState, PageHeader, SearchBar, Spinner, Toast } from "../../components/admin/AdminWidgets.jsx";

const blank = {
  title: "",
  category: "",
  description: "",
  resultText: "",
  liveLink: "",
  githubLink: "",
  status: "active",
  featured: false,
};

const ManagePortfolio = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const load = () => {
    setLoading(true);
    api.get(`/api/works?admin=true&search=${encodeURIComponent(search)}&limit=50`).then((res) => {
      setItems(res.data.data);
      setLoading(false);
    });
  };

  useEffect(load, [search]);

  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (file) data.append("image", file);

    if (editing) {
      await api.put(`/api/works/${editing}`, data);
      setToast("Project updated.");
    } else {
      await api.post("/api/works", data);
      setToast("Project added.");
    }
    reset();
    load();
  };

  const reset = () => {
    setForm(blank);
    setFile(null);
    setPreview("");
    setEditing(null);
  };

  const edit = (item) => {
    setEditing(item._id);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      resultText: item.resultText,
      liveLink: item.liveLink || item.liveUrl || "",
      githubLink: item.githubLink || item.githubUrl || "",
      status: item.status,
      featured: item.featured,
    });
    setPreview(imageUrl(item.image));
  };

  const remove = async () => {
    await api.delete(`/api/works/${deleteId}`);
    setDeleteId(null);
    setToast("Project deleted.");
    load();
  };

  return (
    <section className="admin-page">
      <PageHeader eyebrow="Works" title="Manage works" text="Add, edit, feature, publish, and delete work cards." />
      <Toast message={toast} />
      <div className="admin-editor-grid">
        <form className="glass-card admin-form" onSubmit={submit}>
          <h2>{editing ? "Edit Project" : "Add Project"}</h2>
          <Input label="Project Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} required />
          <Input label="Category" value={form.category} onChange={(value) => setForm({ ...form, category: value })} required />
          <TextArea label="Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} required />
          <TextArea label="Result Text" value={form.resultText} onChange={(value) => setForm({ ...form, resultText: value })} required />
          <Input label="Live Website URL" value={form.liveLink} onChange={(value) => setForm({ ...form, liveLink: value })} />
          <Input label="GitHub URL" value={form.githubLink} onChange={(value) => setForm({ ...form, githubLink: value })} />
          <label><span>Status</span><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="active">Active</option><option value="draft">Draft</option><option value="inactive">Inactive</option></select></label>
          <label className="check-row"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
          <label><span>Project Image</span><input type="file" accept="image/*" onChange={(e) => { const selected = e.target.files[0]; setFile(selected); setPreview(selected ? URL.createObjectURL(selected) : ""); }} /></label>
          {preview && <img className="image-preview" src={preview} alt="Project preview" />}
          <div className="form-actions"><button className="btn btn-primary" type="submit">{editing ? "Update Project" : "Add Project"}</button><button className="btn btn-secondary" type="button" onClick={reset}>Clear</button></div>
        </form>
        <div className="glass-card admin-panel">
          <SearchBar value={search} onChange={setSearch} placeholder="Search works..." />
          {loading ? <Spinner /> : items.length === 0 ? <EmptyState text="No projects found." /> : (
            <div className="admin-table">
              {items.map((item) => (
                <div className="admin-table-row" key={item._id}>
                  <div><strong>{item.title}</strong><span>{item.category} • {item.status}</span></div>
                  <div className="row-actions"><button onClick={() => edit(item)}>Edit</button><button onClick={() => setDeleteId(item._id)}>Delete</button></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {deleteId && <ConfirmModal title="Delete project?" text="This project will be removed permanently." onCancel={() => setDeleteId(null)} onConfirm={remove} />}
    </section>
  );
};

export const Input = ({ label, value, onChange, required, type = "text" }) => <label><span>{label}</span><input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} /></label>;
export const TextArea = ({ label, value, onChange, required }) => <label><span>{label}</span><textarea rows="4" value={value} onChange={(e) => onChange(e.target.value)} required={required} /></label>;

export default ManagePortfolio;

