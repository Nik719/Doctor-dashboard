import { Router } from "express";
import { PatientModel } from "../models/Patient.js";

export const patientsRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PM = PatientModel as any;

// GET all patients
patientsRouter.get("/", async (_req, res) => {
  try {
    const patients = await PM.find({}).lean().exec();
    res.json(patients.map(strip));
  } catch (err) {
    console.error("Fetch patients failed:", err);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
});

// GET single patient
patientsRouter.get("/:id", async (req, res) => {
  try {
    const patient = await PM.findOne({ patientId: req.params.id }).lean().exec();
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(strip(patient));
  } catch {
    res.status(500).json({ error: "Failed to fetch patient" });
  }
});

// POST bulk insert — registered before /:id to avoid route conflict
patientsRouter.post("/bulk", async (req, res) => {
  try {
    const patients = req.body;
    if (!Array.isArray(patients)) {
      return res.status(400).json({ error: "Body must be an array" });
    }
    const result = await PM.insertMany(patients, { ordered: false })
      .catch((err: { code?: number; insertedDocs?: unknown[] }) => {
        // 11000 = duplicate key — keep what was inserted, ignore dupes
        if (err.code === 11000) return err.insertedDocs ?? [];
        throw err;
      });
    res.status(201).json({ inserted: result.length });
  } catch (err) {
    console.error("Bulk insert failed:", err);
    res.status(500).json({ error: "Failed to bulk insert patients" });
  }
});

// POST create single patient
patientsRouter.post("/", async (req, res) => {
  try {
    const patient = await PM.create(req.body);
    res.status(201).json(strip(patient.toObject()));
  } catch (err: unknown) {
    const e = err as { code?: number; name?: string; message?: string };
    if (e.code === 11000) {
      return res.status(409).json({ error: "Patient ID already exists" });
    }
    if (e.name === "ValidationError") {
      return res.status(400).json({ error: e.message ?? "Invalid patient data" });
    }
    console.error("Create patient failed:", err);
    res.status(500).json({ error: "Failed to create patient" });
  }
});

// PUT update patient
patientsRouter.put("/:id", async (req, res) => {
  try {
    const patient = await PM.findOneAndUpdate(
      { patientId: req.params.id },
      req.body,
      { new: true, runValidators: true },
    ).lean().exec();
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(strip(patient));
  } catch {
    res.status(500).json({ error: "Failed to update patient" });
  }
});

// DELETE patient
patientsRouter.delete("/:id", async (req, res) => {
  try {
    const result = await PM.deleteOne({ patientId: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json({ deleted: req.params.id });
  } catch {
    res.status(500).json({ error: "Failed to delete patient" });
  }
});

function strip(doc: Record<string, unknown>): Record<string, unknown> {
  const { _id, __v, ...rest } = doc;
  void _id; void __v;
  return rest;
}
