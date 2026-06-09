import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { patientsRouter } from "./routes/patients";
import { connectDB } from "./db";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Connect to MongoDB (non-blocking — server starts first, DB connects async)
  connectDB().catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/patients", patientsRouter);

  return app;
}
