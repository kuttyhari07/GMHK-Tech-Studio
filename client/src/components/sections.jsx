import React, { useEffect, useState } from "react";
import { faqs, navLinks, services } from "../data";
import { api, API_URL, imageUrl } from "../services/api";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="GMHK Tech Studio home">
        <span className="brand-mark">G</span>
        <span><strong>GMHK</strong><small>Tech Studio</small></span>
      </a>
      <button className="nav-toggle" aria-label="Toggle navigation" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
        <span /><span /><span />
      </button>
      <nav className={isOpen ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
        {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>{link.label}</a>)}
      </nav>
    </header>
  );
};

export const Hero = () => (
  <section className="hero section-shell" id="top">
    <div className="hero-orbit" aria-hidden="true" />
    <div className="hero-grid">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">GMHK Tech Studio • Tamil Nadu, India</p>
        <h1>We Build Modern Websites</h1>
        <p className="hero-subtitle">Affordable websites for businesses, students, freelancers and startups.</p>
        <p className="tagline">Transforming Ideas into Digital Reality</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact">Get Started</a>
          <a className="btn btn-secondary" href="#work">View Work</a>
        </div>
      </div>
      <div className="laptop-stage" data-reveal>
        <div className="screen-glow" />
        <div className="laptop">
          <div className="laptop-topbar"><span /><span /><span /></div>
          <div className="code-window">
            <p><span>const</span> studio = "GMHK";</p>
            <p><span>build</span>({`{ websites: "premium" }`});</p>
            <p><span>deploy</span>("gmhktechstudio.in");</p>
            <div className="code-line wide" /><div className="code-line medium" /><div className="code-line short" />
          </div>
        </div>
        <div className="laptop-base" />
      </div>
    </div>
  </section>
);

export const Services = () => (
  <section className="section-shell" id="services">
    <SectionHeading eyebrow="Services" title="Web solutions shaped for your next launch" text="Choose a focused build that fits your idea, budget, and growth stage." />
    <div className="card-grid services-grid">
      {services.map((service, index) => (
        <article className="glass-card service-card" data-reveal key={service} style={{ "--delay": `${index * 60}ms` }}>
          <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
          <h3>{service}</h3>
          <p>Fast, responsive and conversion-aware pages with a polished digital studio finish.</p>
        </article>
      ))}
    </div>
  </section>
);

export const Portfolio = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/api/works?limit=6").then((res) => {
      setItems(res.data.data || []);
    }).catch(() => setItems([]));
  }, []);

  return (
    <section className="section-shell" id="work">
      <SectionHeading eyebrow="Works" title="Selected works from GMHK Tech Studio" text="Uploaded works from the admin panel appear here with project details, result text, and live links." />
      {items.length === 0 ? (
        <div className="glass-card public-empty-state" data-reveal>No works added yet.</div>
      ) : (
        <div className="card-grid portfolio-grid">
          {items.map((project, index) => (
          <article className="glass-card project-card is-visible" key={project._id || project.title} style={{ "--delay": `${index * 80}ms` }}>
            <div className={`project-media ${project.gradient || "project-business"}`}>
              {project.image ? <img src={imageUrl(project.image)} alt={project.title} loading="lazy" /> : <div className="media-frame"><span /><span /><span /></div>}
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              {project.category && <span className="project-category">{project.category}</span>}
              {project.description && <p>{project.description}</p>}
              <p>{project.resultText || project.result}</p>
              {project.liveLink || project.liveUrl ? <a className="text-button" href={project.liveLink || project.liveUrl} target="_blank" rel="noreferrer">View Details</a> : <button className="text-button" type="button">View Details</button>}
            </div>
          </article>
          ))}
        </div>
      )}
    </section>
  );
};

export const Pricing = () => {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    api.get("/api/pricing?public=true&limit=8").then((res) => {
      setPlans(res.data.data || []);
    }).catch(() => setPlans([]));
  }, []);

  return (
    <section className="section-shell" id="pricing">
      <SectionHeading eyebrow="Pricing" title="Affordable packages with premium execution" text="Simple starting prices for small businesses, students, freelancers, and growing teams." />
      {plans.length === 0 ? (
        <div className="glass-card public-empty-state" data-reveal>No pricing plans added yet.</div>
      ) : (
        <div className="card-grid pricing-grid">
          {plans.map((plan, index) => (
          <article className={plan.popular ? "glass-card price-card popular is-visible" : "glass-card price-card is-visible"} key={plan._id || plan.name} style={{ "--delay": `${index * 70}ms` }}>
            {plan.popular && <span className="badge">Popular</span>}
            <h3>{plan.name}</h3>
            <strong>{plan.price}</strong>
            <p>{plan.description || plan.detail}</p>
            {plan.features?.length > 0 && <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}
            <a className="btn btn-card" href="#contact">{plan.buttonText || "Start Project"}</a>
          </article>
          ))}
        </div>
      )}
    </section>
  );
};

export const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/api/testimonials/approved").then((res) => {
      setReviews(res.data.data || []);
    }).catch(() => setReviews([]));
  }, []);

  return (
    <section className="section-shell testimonials-section" id="testimonials">
      <SectionHeading eyebrow="Testimonials" title="Client reviews with proof of trust" text="Approved reviews appear here after admin moderation." />
      {reviews.length === 0 ? (
        <div className="glass-card public-empty-state" data-reveal>No testimonials added yet.</div>
      ) : (
        <div className="testimonial-track" data-reveal>
          {reviews.map((review) => (
          <article className="glass-card testimonial-card is-visible" key={review._id || `${review.name}-${review.project}`}>
            <div className="testimonial-head">
              {review.photo ? <img src={imageUrl(review.photo)} alt={review.name} loading="lazy" /> : <span className="avatar-fallback">{review.name?.charAt(0) || "G"}</span>}
              <div><h3>{review.name}</h3><p>{review.business || "GMHK Client"}</p></div>
              {review.featured && <span className="badge">Featured</span>}
            </div>
            <strong>{review.project}</strong>
            <div className="stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating || 5)}</div>
            <p>{review.message}</p>
            <small>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Recent review"}</small>
          </article>
          ))}
        </div>
      )}
    </section>
  );
};

export const ReviewForm = () => {
  const [form, setForm] = useState({ name: "", email: "", business: "", project: "", rating: 5, message: "" });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (photo) data.append("photo", photo);
      const response = await fetch(`${API_URL}/api/testimonials`, { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setForm({ name: "", email: "", business: "", project: "", rating: 5, message: "" });
      setPhoto(null);
      setPreview("");
      setStatus({ type: "success", message: result.message });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to submit review." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-shell review-section" id="review">
      <div className="contact-layout">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow">Review</p>
          <h2>Share your GMHK experience</h2>
          <p>Your review will be stored as pending and displayed only after admin approval.</p>
        </div>
        <form className="glass-card contact-form" onSubmit={submit} data-reveal>
          <FormField label="Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <FormField label="Email" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <FormField label="Business Name" name="business" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} />
          <FormField label="Project Name" name="project" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} required />
          <label><span>Rating</span><select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} Stars</option>)}</select></label>
          <label><span>Review Message</span><textarea rows="5" minLength="10" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></label>
          <label><span>Optional Photo</span><input type="file" accept="image/*" onChange={(e) => { const selected = e.target.files[0]; setPhoto(selected); setPreview(selected ? URL.createObjectURL(selected) : ""); }} /></label>
          {preview && <img className="image-preview avatar-preview" src={preview} alt="Review preview" />}
          <button className="btn btn-primary form-submit" type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Review"}</button>
          {status.message && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}
        </form>
      </div>
    </section>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="section-shell faq-section" id="faq">
      <SectionHeading eyebrow="FAQ" title="Quick answers before we build" text="A few common details clients ask before starting their website." />
      <div className="faq-list" data-reveal>
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div className="faq-item" key={item.question}>
              <button type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                <span>{item.question}</span><span className="faq-icon">{isOpen ? "-" : "+"}</span>
              </button>
              <div className={isOpen ? "faq-answer open" : "faq-answer"}><p>{item.answer}</p></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "Static Website", message: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });
    try {
      const response = await fetch(`${API_URL}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to send enquiry.");
      setFormData({ name: "", email: "", phone: "", service: "Static Website", message: "" });
      setStatus({ type: "success", message: result.message });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-shell contact-section" id="contact">
      <div className="contact-layout">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow">Contact</p>
          <h2>Ready to launch a sharper digital presence?</h2>
          <p>Tell us what you need and GMHK Tech Studio will help shape it into a polished website.</p>
          <div className="contact-actions">
            <a className="btn btn-primary" href="https://wa.me/916380911912" target="_blank" rel="noreferrer">WhatsApp 6380911912</a>
            <a className="btn btn-secondary" href="mailto:gmhktechstudio0429@gmail.com">Email Studio</a>
          </div>
          <ul className="contact-list">
            <li><span>Website</span><a href="https://gmhktechstudio.in" target="_blank" rel="noreferrer">gmhktechstudio.in</a></li>
            <li><span>Email</span><a href="mailto:gmhktechstudio0429@gmail.com">gmhktechstudio0429@gmail.com</a></li>
            <li><span>Location</span>Tamil Nadu, India</li>
          </ul>
        </div>
        <form className="glass-card contact-form" onSubmit={handleSubmit} data-reveal>
          <FormField label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <FormField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          <label><span>Service</span><select name="service" value={formData.service} onChange={handleChange} required>{services.map((service) => <option key={service} value={service}>{service}</option>)}</select></label>
          <label><span>Message</span><textarea name="message" value={formData.message} onChange={handleChange} rows="5" minLength="10" placeholder="Tell us about your project" required /></label>
          <button className="btn btn-primary form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Enquiry"}</button>
          {status.message && <p className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p>}
        </form>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div>
        <a className="brand" href="#top" aria-label="GMHK Tech Studio home"><span className="brand-mark">G</span><span><strong>GMHK</strong><small>Tech Studio</small></span></a>
        <p>Transforming Ideas into Digital Reality</p>
      </div>
      <div><h3>Quick Links</h3>{navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
      <div><h3>Services</h3>{services.slice(0, 4).map((service) => <a key={service} href="#services">{service}</a>)}</div>
      <div><h3>Contact Info</h3><a href="https://wa.me/916380911912" target="_blank" rel="noreferrer">WhatsApp: 6380911912</a><a href="mailto:gmhktechstudio0429@gmail.com">gmhktechstudio0429@gmail.com</a><span>Tamil Nadu, India</span></div>
    </div>
    <p className="copyright">© {new Date().getFullYear()} GMHK Tech Studio. All rights reserved.</p>
  </footer>
);

const SectionHeading = ({ eyebrow, title, text }) => (
  <div className="section-heading" data-reveal>
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p>{text}</p>
  </div>
);

const FormField = ({ label, name, type = "text", value, onChange, required }) => (
  <label>
    <span>{label}</span>
    <input name={name} type={type} value={value} onChange={onChange} autoComplete={name} required={required} />
  </label>
);
