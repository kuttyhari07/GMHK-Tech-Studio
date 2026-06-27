import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { seedInitialData } from "./utils/seed.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
  .then(seedInitialData)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`GMHK Tech Studio API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });
