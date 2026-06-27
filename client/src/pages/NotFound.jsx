import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="not-found">
    <div className="glass-card not-found-card">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you opened does not exist.</p>
      <Link className="btn btn-primary" to="/">Back Home</Link>
    </div>
  </main>
);

export default NotFound;
