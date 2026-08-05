
import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes.js";


const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to FITZONE Backend API 🚀",
  });
});

app.use("/api/auth", authRoutes);

export default app;