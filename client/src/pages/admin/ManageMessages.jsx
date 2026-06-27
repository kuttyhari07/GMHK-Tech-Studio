import React, { useEffect, useState } from "react";
import { ConfirmModal, EmptyState, PageHeader, SearchBar, Spinner, Toast } from "../../components/admin/AdminWidgets.jsx";
import { api } from "../../services/api";

const ManageMessages = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const load = () => {
    setLoading(true);
    api.get(`/api/contact?search=${encodeURIComponent(search)}&limit=50`).then((res) => {
      setItems(res.data.data);
      setLoading(false);
    });
  };
  useEffect(load, [search]);

  const markRead = async (id) => { await api.patch(`/api/contact/${id}/read`); setToast("Message marked as read."); load(); };
  const remove = async () => { await api.delete(`/api/contact/${deleteId}`); setDeleteId(null); setToast("Message deleted."); load(); };

  return (
    <section className="admin-page">
      <PageHeader eyebrow="Messages" title="Contact enquiries" text="Search, read, and delete contact form submissions." />
      <Toast message={toast} />
      <div className="glass-card admin-panel">
        <SearchBar value={search} onChange={setSearch} placeholder="Search messages..." />
        {loading ? <Spinner /> : items.length === 0 ? <EmptyState text="No messages found." /> : (
          <div className="message-grid">{items.map((item) => (
            <article className={item.read ? "message-card read" : "message-card"} key={item._id}>
              <div><strong>{item.name}</strong><span>{item.service}</span></div>
              <a href={`mailto:${item.email}`}>{item.email}</a>
              <span>{item.phone}</span>
              <p>{item.message}</p>
              <div className="row-actions"><button onClick={() => markRead(item._id)}>Mark Read</button><button onClick={() => setDeleteId(item._id)}>Delete</button></div>
            </article>
          ))}</div>
        )}
      </div>
      {deleteId && <ConfirmModal title="Delete message?" text="This enquiry will be removed permanently." onCancel={() => setDeleteId(null)} onConfirm={remove} />}
    </section>
  );
};

export default ManageMessages;
