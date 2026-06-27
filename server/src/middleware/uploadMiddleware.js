import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDir),
  filename: (_req, file, callback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    callback(null, safeName);
  },
});

const fileFilter = (_req, file, callback) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!allowed.includes(file.mimetype)) {
    callback(new Error("Only JPG, PNG, WebP, and GIF images are allowed."));
    return;
  }

  callback(null, true);
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
