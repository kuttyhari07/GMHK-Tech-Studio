import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import workRoutes from "./routes/workRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.resolve(__dirname, "../uploads");
const legacyUploadsPath = path.resolve(process.cwd(), "uploads");

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "100kb" }));
app.use("/uploads", express.static(uploadsPath));
app.use("/uploads", express.static(legacyUploadsPath));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "GMHK Tech Studio API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/works", workRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
