import React from "react";

export const PageHeader = ({ eyebrow, title, text, action }) => (
  <div className="admin-page-header">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </div>
    {action}
  </div>
);

export const Spinner = () => <div className="loading-spinner" aria-label="Loading" />;

export const Toast = ({ message, type = "success" }) =>
  message ? (
    <div className={`admin-toast ${type}`} role="status" aria-live="polite">
      {message}
    </div>
  ) : null;

export const ConfirmModal = ({ title, text, onCancel, onConfirm }) => (
  <div className="modal-backdrop" role="dialog" aria-modal="true">
    <div className="glass-card confirm-modal">
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="modal-actions">
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn danger-button" type="button" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <label className="admin-search">
    <span>Search</span>
    <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
  </label>
);

export const EmptyState = ({ text }) => <div className="empty-state">{text}</div>;
