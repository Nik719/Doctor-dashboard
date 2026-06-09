import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface PatientData {
  // Family Details
  headOfFamily: string;
  patientName: string;
  patientId: string;

  // Complete Address
  country: string;
  state: string;
  district: string;
  block: string;
  village: string;
  location: string;
  panchayat: string;
  wardNo: string;
  pinCode: string;

  // Health Seeking Behaviour
  minorIllnessLocation: string;
  majorIllnessLocation: string;
  systemOfMedicine: string;
  familyMembers: string;
  familyIncome: string;
  familyType: string;
  religion: string;
  caste: string;
  rationCardType: string;
  ayushmanCard: boolean;

  // Patient Disease Summary
  disease: string;
  diseaseSummary: string;
  symptoms: string;
  treatmentCompliance: string;
  currentMedication: string;

  // Patient Personal Info
  mobile: string;
  height: string;
  weight: string;
  bmi: string;
  education: string;
  occupation: string;
  maritalStatus: string;

  // Lifestyle & History
  tobacco: boolean;
  alcohol: boolean;
  drugAddiction: string;
  familyHistory: string;
  otherChronicDiseases: string;
  hospitalHistory: string;

  // Investigation
  systolicBP: string;
  diastolicBP: string;
  bpDate: string;
  bloodSugarRBS: string;
  bloodSugarFBS: string;
  bloodSugarPP: string;

  // Assigned Doctor
  assignedDoctor: string;
  doctorId: string;

  // Family Composition
  familyComposition: FamilyMember[];

  // Metadata
  createdAt: string;
  status: "active" | "follow-up" | "completed";
}

export interface FamilyMember {
  id: string;
  type: string;
  name: string;
  age: string;
  sex: string;
  relation: string;
  maritalStatus: string;
  occupation: string;
  income: string;
  chronicDisease: string;
  treatmentCompliance: string;
}

interface PatientContextType {
  patients: PatientData[];
  loading: boolean;
  error: string | null;
  addPatient: (patient: PatientData) => Promise<void>;
  addPatientsBulk: (patients: PatientData[]) => Promise<void>;
  updatePatient: (patientId: string, patient: PatientData) => Promise<void>;
  deletePatient: (patientId: string) => Promise<void>;
  getPatient: (patientId: string) => PatientData | undefined;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const API_BASE = "/api/patients";

async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<PatientData[]>(API_BASE)
      .then((data) => setPatients(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addPatient = async (patient: PatientData) => {
    const created = await apiFetch<PatientData>(API_BASE, {
      method: "POST",
      body: JSON.stringify(patient),
    });
    setPatients((prev) => [...prev, created]);
  };

  const addPatientsBulk = async (newPatients: PatientData[]) => {
    await apiFetch(`${API_BASE}/bulk`, {
      method: "POST",
      body: JSON.stringify(newPatients),
    });
    // Reload full list after bulk insert
    const data = await apiFetch<PatientData[]>(API_BASE);
    setPatients(data);
  };

  const updatePatient = async (patientId: string, updated: PatientData) => {
    const data = await apiFetch<PatientData>(`${API_BASE}/${patientId}`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
    setPatients((prev) =>
      prev.map((p) => (p.patientId === patientId ? data : p)),
    );
  };

  const deletePatient = async (patientId: string) => {
    await apiFetch(`${API_BASE}/${patientId}`, { method: "DELETE" });
    setPatients((prev) => prev.filter((p) => p.patientId !== patientId));
  };

  const getPatient = (patientId: string) =>
    patients.find((p) => p.patientId === patientId);

  return (
    <PatientContext.Provider
      value={{
        patients,
        loading,
        error,
        addPatient,
        addPatientsBulk,
        updatePatient,
        deletePatient,
        getPatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatients() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error("usePatients must be used within a PatientProvider");
  }
  return context;
}
