import { Router } from "express";
import { PatientModel } from "../models/Patient";

export const patientsRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PM = PatientModel as any;

// GET all patients
patientsRouter.get("/", async (_req, res) => {
  try {
    const patients = await PM.find({}).lean().exec();
    res.json(patients.map(strip));
  } catch {
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
    await PM.insertMany(patients, { ordered: false }).catch(() => null);
    res.status(201).json({ inserted: patients.length });
  } catch {
    res.status(500).json({ error: "Failed to bulk insert patients" });
  }
});

// POST create single patient
patientsRouter.post("/", async (req, res) => {
  try {
    const patient = await PM.create(req.body);
    res.status(201).json(strip(patient.toObject()));
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return res.status(409).json({ error: "Patient ID already exists" });
    }
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
