import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect_DB } from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();

// Connect MongoDB Database
connect_DB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 👈 Lead Routes Mount Kiya
app.use("/api/leads", leadRoutes);

// Basic Test Route
app.get("/", (req, res) => {
  res.json({ message: "SaaSquatch AI Qualifier API is running!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n ✅ Server running on http://localhost:${PORT}`);
});