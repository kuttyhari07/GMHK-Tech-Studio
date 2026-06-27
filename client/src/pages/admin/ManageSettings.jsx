import React, { useEffect, useState } from "react";
import { PageHeader, Toast } from "../../components/admin/AdminWidgets.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { api, imageUrl } from "../../services/api";
import { Input } from "./ManagePortfolio.jsx";

const ManageSettings = () => {
  const { admin, setAdmin } = useAuth();
  const [settings, setSettings] = useState({ websiteName: "", tagline: "", email: "", whatsapp: "", website: "", location: "", socialLinks: {} });
  const [profile, setProfile] = useState({ name: admin?.name || "", email: admin?.email || "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    api.get("/api/settings").then((res) => {
      setSettings(res.data.data);
      setPreview(imageUrl(res.data.data.logo));
    });
  }, []);

  const saveSettings = async (event) => {
    event.preventDefault();
    const data = new FormData();
    ["websiteName", "tagline", "email", "whatsapp", "website", "location"].forEach((key) => data.append(key, settings[key] || ""));
    data.append("socialLinks", JSON.stringify(settings.socialLinks || {}));
    if (logo) data.append("logo", logo);
    await api.put("/api/settings", data);
    setToast("Settings updated.");
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    const res = await api.put("/api/auth/profile", profile);
    setAdmin(res.data.admin);
    localStorage.setItem("gmhkAdmin", JSON.stringify(res.data.admin));
    setToast("Profile updated.");
  };

  const changePassword = async (event) => {
    event.preventDefault();
    await api.patch("/api/auth/password", passwords);
    setPasswords({ currentPassword: "", newPassword: "" });
    setToast("Password changed.");
  };

  return (
    <section className="admin-page">
      <PageHeader eyebrow="Settings" title="Studio settings" text="Update admin profile, password, brand, contact details, logo, and social links." />
      <Toast message={toast} />
      <div className="admin-settings-grid">
        <form className="glass-card admin-form" onSubmit={saveSettings}>
          <h2>Website Settings</h2>
          <Input label="Website Name" value={settings.websiteName || ""} onChange={(v) => setSettings({ ...settings, websiteName: v })} />
          <Input label="Tagline" value={settings.tagline || ""} onChange={(v) => setSettings({ ...settings, tagline: v })} />
          <Input label="Email" value={settings.email || ""} onChange={(v) => setSettings({ ...settings, email: v })} />
          <Input label="WhatsApp" value={settings.whatsapp || ""} onChange={(v) => setSettings({ ...settings, whatsapp: v })} />
          <Input label="Website" value={settings.website || ""} onChange={(v) => setSettings({ ...settings, website: v })} />
          <Input label="Location" value={settings.location || ""} onChange={(v) => setSettings({ ...settings, location: v })} />
          <Input label="Instagram" value={settings.socialLinks?.instagram || ""} onChange={(v) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, instagram: v } })} />
          <Input label="LinkedIn" value={settings.socialLinks?.linkedin || ""} onChange={(v) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, linkedin: v } })} />
          <Input label="GitHub" value={settings.socialLinks?.github || ""} onChange={(v) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, github: v } })} />
          <label><span>Logo</span><input type="file" accept="image/*" onChange={(e) => { const selected = e.target.files[0]; setLogo(selected); setPreview(selected ? URL.createObjectURL(selected) : preview); }} /></label>
          {preview && <img className="image-preview avatar-preview" src={preview} alt="Logo preview" />}
          <button className="btn btn-primary" type="submit">Save Settings</button>
        </form>
        <div className="admin-stack">
          <form className="glass-card admin-form" onSubmit={saveProfile}>
            <h2>Admin Profile</h2>
            <Input label="Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
            <Input label="Email" type="email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
            <button className="btn btn-primary" type="submit">Update Profile</button>
          </form>
          <form className="glass-card admin-form" onSubmit={changePassword}>
            <h2>Change Password</h2>
            <Input label="Current Password" type="password" value={passwords.currentPassword} onChange={(v) => setPasswords({ ...passwords, currentPassword: v })} />
            <Input label="New Password" type="password" value={passwords.newPassword} onChange={(v) => setPasswords({ ...passwords, newPassword: v })} />
            <button className="btn btn-primary" type="submit">Change Password</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ManageSettings;
