import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { handleDemo } from "./routes/demo.js";
import { patientsRouter } from "./routes/patients.js";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  // Health check — useful for debugging Vercel deployments
  app.get("/api/health", (_req, res) => {
    const state = mongoose.connection.readyState;
    const label: Record<number, string> = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };
    res.json({
      status: state === 1 ? "ok" : "degraded",
      db: label[state] ?? "unknown",
      env: process.env.MONGODB_URI ? "MONGODB_URI is set" : "MONGODB_URI is MISSING",
    });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/patients", patientsRouter);

  return app;
}
